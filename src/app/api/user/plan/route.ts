import { plans } from "@/lib/constants";
import { getUserPriceId } from "@/lib/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ planName: "Buy a Plan", isPro: false });
  }

  try {
    const priceId = await getUserPriceId(email);
    let planName = "Buy a Plan";
    const plan = plans.find((p) => p.priceId === priceId);

    if (plan) {
      planName = plan.name;
    }

    const isPro = plan?.name === "Pro";

    return NextResponse.json({ planName, isPro });
  } catch (error) {
    console.error("Error fetching plan:", error);
    return NextResponse.json({ planName: "Buy a Plan", isPro: false });
  }
}
