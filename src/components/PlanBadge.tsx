import { plans } from "@/lib/constants";
import { getUserPriceId } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { Badge } from "./ui/badge";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function planBadge() {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const email = user?.emailAddresses?.[0]?.emailAddress;
  let priceId: string | null = null;
  if (email) {
    priceId = await getUserPriceId(email);
  }
  let planname = "Buy a Plan";
  const plan = plans.find((p) => p.priceId === priceId);
  if (plan) {
    planname = plan.name;
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 cursor-pointer",
        priceId
          ? "bg-linear-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl hover:scale-105 border border-purple-400/50"
          : "bg-slate-100 text-slate-600 shadow-sm hover:shadow-md hover:bg-slate-200 border border-slate-200"
      )}
    >
      <Crown
        className={cn(
          "h-4 w-4",
          priceId ? "fill-yellow-300 text-yellow-300" : "text-slate-400"
        )}
      />
      <span
        className={cn(
          "text-sm",
          priceId ? "font-semibold tracking-wide" : "font-medium"
        )}
      >
        {planname}
      </span>
    </div>
  );
}
