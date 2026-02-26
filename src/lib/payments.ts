import Stripe from "stripe";
import db from "@/lib/db";
import {
  usersTable,
  type User,
  type NewUser,
  paymentsTable,
  type NewPayment,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function handleCheckoutSessionCompleted({
  session,
  stripe,
}: {
  session: Stripe.Checkout.Session;
  stripe: Stripe;
}): Promise<void> {
  try {
    console.log(`Handling completed checkout session: ${session.id}`);

    const customerId = String(session.customer ?? "");
    if (!customerId) {
      console.warn("No customer id on session — skipping.");
      return;
    }

    // Use the provided stripe instance to fetch customer details (safe guarded)
    let customer: Stripe.Customer | Stripe.DeletedCustomer | null = null;
    try {
      customer = (await stripe.customers.retrieve(
        customerId,
      )) as Stripe.Customer;
    } catch (err) {
      console.warn("Failed to retrieve Stripe customer:", err);
    }

    // Resolve email and name from customer or session fallback
    const email = customer && "email" in customer ? customer.email : undefined;

    const fullName = customer && "name" in customer ? customer.name : undefined;

    const priceId =
      session.line_items?.data?.[0]?.price?.id ??
      (session.metadata?.priceId as string | undefined);

    if (!email) {
      console.warn(
        "No customer email available — cannot link payment to user.",
      );
      return;
    }

    // Update existing user record (user must be created via Clerk first)
    await updateUserWithPaymentInfo({
      email,
      customerId,
      priceId,
      status: "active",
    });

    // create payment record
    await createPaymentRecord({
      session,
      priceId,
      userEmail: email,
    });
  } catch (err) {
    console.error("Error handling checkout.session.completed:", err);
    throw err;
  }
}

async function updateUserWithPaymentInfo({
  email,
  customerId,
  priceId,
  status,
}: {
  email: string;
  customerId: string;
  priceId?: string | null;
  status: string;
}): Promise<User | null> {
  try {
    if (!email) {
      console.error("updateUserWithPaymentInfo: email is required");
      return null;
    }

    // Find existing user (must have been created by Clerk)
    const rows = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (!rows || rows.length === 0) {
      console.error(
        `❌ User not found for email: ${email}. User must sign up with Clerk before making payment.`,
      );
      return null;
    }

    const existing = rows[0] as User;

    // Verify user has Clerk ID (was created properly)
    if (!existing.clerkId) {
      console.error(
        `❌ User exists but has no Clerk ID: ${email}. This should not happen.`,
      );
      return null;
    }

    // Update existing user with payment info
    await db
      .update(usersTable)
      .set({
        customerID: customerId,
        priceId: priceId ?? existing.priceId ?? null,
        status,
      })
      .where(eq(usersTable.id, existing.id));

    console.log("✅ Updated user with payment info:", existing.id);
    return existing;
  } catch (err) {
    console.error("updateUserWithPaymentInfo error:", err);
    return null;
  }
}

async function createPaymentRecord({
  session,
  priceId,
  userEmail,
}: {
  session: Stripe.Checkout.Session;
  priceId?: string | null;
  userEmail: string;
}): Promise<void> {
  try {
    if (!userEmail) {
      console.warn("createPaymentRecord: missing userEmail");
      return;
    }

    const rows = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, userEmail))
      .limit(1);

    if (!rows || rows.length === 0) {
      console.warn(
        "No matching user for email, skipping payment record:",
        userEmail,
      );
      return;
    }

    const user = rows[0] as User;

    const amount = Number(session.amount_total ?? 0);
    const currency = (session.currency ?? "usd").toLowerCase();

    const newPayment: NewPayment = {
      userId: user.id,
      amount,
      currency,
      status: (session.payment_status ?? "unknown") as string,
      paymentIntentId: String(session.payment_intent ?? ""),
      priceId: priceId ?? null,
    } as unknown as NewPayment;

    await db.insert(paymentsTable).values(newPayment);
    console.log("Payment record created for user:", user.id);
  } catch (err) {
    console.error("createPaymentRecord error:", err);
  }
}

export async function handleSubscriptionDeleted({
  subscriptionId,
  stripe,
}: {
  subscriptionId: string;
  stripe: Stripe;
}): Promise<void> {
  console.log(`Handling deleted subscription: ${subscriptionId}`);
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    await db
      .update(usersTable)
      .set({
        priceId: null,
        status: "cancelled",
      })
      .where(eq(usersTable.customerID, subscription.customer as string));
    console.log(
      `User with customer ID ${subscription.customer} downgraded to free plan.`,
    );
  } catch (error) {
    console.error("Error handling subscription.deleted:", error);
    throw error;
  }
}
