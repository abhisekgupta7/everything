import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { headers } from "next/headers";
import db from "@/lib/db";
import { usersTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!;
  if (!webhookSecret) {
    throw new Error("Webhook secret not configured");
  }
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id") || "";
  const svix_timestamp = headerPayload.get("svix-timestamp") || "";
  const svix_signature = headerPayload.get("svix-signature") || "";

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing Svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);
  const wh = new Webhook(webhookSecret);
  let event: WebhookEvent;
  try {
    event = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    console.error("Error verifying webhook:", error);
    return new Response("Invalid webhook signature", { status: 400 });
  }
  // Handle the event
  const eventType = event.type;

  if (eventType === "user.created") {
    try {
      const {
        email_addresses,
        primary_email_address_id,
        first_name,
        id: userId,
        image_url,
      } = event.data;
      const emailObj = email_addresses?.find(
        (email: any) => email.id === primary_email_address_id,
      );
      const email = emailObj?.email_address || "";
      if (!email) {
        return new Response("No primary email found", { status: 400 });
      }

      // Check if user already exists (from payment webhook)
      const existingUser = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .limit(1);

      if (existingUser.length > 0) {
        // Update existing user with Clerk ID
        await db
          .update(usersTable)
          .set({
            clerkId: userId,
            name: first_name || existingUser[0].name || "No Name",
            image: image_url || existingUser[0].image,
          })
          .where(eq(usersTable.email, email));
        console.log(`Updated existing user with Clerk ID: ${userId}`);
      } else {
        // Create new user
        await db.insert(usersTable).values({
          clerkId: userId,
          name: first_name || "No Name",
          email: email,
          image: image_url,
        });
        console.log(`User created with Clerk ID: ${userId}`);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      return new Response("Error creating user", { status: 500 });
    }
  }
  return new Response("Webhook received", { status: 200 });
}
