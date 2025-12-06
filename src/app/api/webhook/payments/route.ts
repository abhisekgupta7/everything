import { handleCheckoutSessionCompleted, handleSubscriptionDeleted } from "@/lib/payments";

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (req: NextRequest) => { 
    const payload=await req.text();
    const signature = req.headers.get("stripe-signature");
    let event: Stripe.Event;

    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    try {
        event = stripe.webhooks.constructEvent(payload, signature!, endpointSecret);
        // Handle the event
        switch (event.type) {
            case 'checkout.session.completed':
                const sessionId=event.data.object.id;
                const session = await stripe.checkout.sessions.retrieve(sessionId, {
                    expand: ['line_items'],
                });
                // Then define and call a function to handle the event checkout.session.completed
                console.log(`Payment for session ${session.id} was successful!`);
                await handleCheckoutSessionCompleted({session,stripe});

                break;
            // ... handle other event types
            case 'customer.subscription.deleted':
                const subscription = event.data.object as Stripe.Subscription;
                console.log(`Subscription ${subscription.id} was deleted.`);
                const subscriptionId = event.data.object.id
                await handleSubscriptionDeleted({subscriptionId,stripe});
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    } catch (error) {
        return NextResponse.json(
            { error: "Webhook Error", message: (error as Error).message },
            { status: 400 });
    }

    return NextResponse.json({
        status: "success",
    
    })
}