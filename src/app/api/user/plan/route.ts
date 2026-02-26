import { plans } from "@/lib/constants";
import { getUserPriceId } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get("email");
  const user = await currentUser();
if (!user || user.emailAddresses[0]?.emailAddress !== email) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

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
