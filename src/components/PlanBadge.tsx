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
        "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all duration-300 cursor-pointer w-fit",
        priceId
          ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-md hover:shadow-lg border border-purple-400/50"
          : "bg-slate-100 text-slate-600 shadow-sm hover:shadow-md hover:bg-slate-200 border border-slate-200"
      )}
    >
      <Crown
        className={cn(
          "h-3.5 w-3.5 flex-shrink-0",
          priceId ? "fill-yellow-300 text-yellow-300" : "text-slate-400"
        )}
      />
      <span
        className={cn(
          "text-xs whitespace-nowrap",
          priceId ? "font-semibold" : "font-medium"
        )}
      >
        {planname}
      </span>
    </div>
  );
}
