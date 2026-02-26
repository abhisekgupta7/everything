import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { currentUser } from "@clerk/nextjs/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { priceId, planName } = await req.json();

    if (!priceId) {
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 },
      );
    }

    const email = user.emailAddresses[0]?.emailAddress;
    const name = user.fullName || user.firstName || "User";

    // Create or retrieve Stripe customer
    let customerId: string | undefined;

    // Search for existing customer by email
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      customerId = existingCustomers.data[0].id;
    } else {
      // Create new customer
      const customer = await stripe.customers.create({
        email: email,
        name: name,
        metadata: {
          clerkId: user.id,
        },
      });
      customerId = customer.id;
    }

    // Get the base URL for redirects
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      req.headers.get("origin") ||
      "http://localhost:3000";

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${baseUrl}/upload?success=true`,
      cancel_url: `${baseUrl}/?canceled=true`,
      customer_update: {
        address: "auto",
      },
      metadata: {
        priceId: priceId,
        planName: planName,
        clerkId: user.id,
        email: email,
      },
      subscription_data: {
        metadata: {
          clerkId: user.id,
          email: email,
        },
      },
    });

    if (!session.url) {
      console.error("Checkout session created but URL is missing");
      return NextResponse.json(
        { error: "Checkout URL not available" },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to create checkout session: ${errorMessage}` },
      { status: 500 },
    );
  }
}
