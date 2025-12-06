"use client";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { plans } from "@/lib/constants";

export default function PlanBadge() {
  const { user } = useUser();
  const [planName, setPlanName] = useState("Buy a Plan");
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    if (user?.emailAddresses?.[0]?.emailAddress) {
      const email = user.emailAddresses[0].emailAddress;
      // Fetch plan data from API
      fetch(`/api/user/plan?email=${encodeURIComponent(email)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.planName) {
            setPlanName(data.planName);
            setIsPro(data.isPro);
          }
        })
        .catch(() => {
          setPlanName("Buy a Plan");
          setIsPro(false);
        });
    }
  }, [user]);

  if (!user) {
    return null;
  }
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all duration-300 cursor-pointer w-fit",
        isPro
          ? "bglinear--gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-md hover:shadow-lg border border-purple-400/50"
          : "bg-slate-100 text-slate-600 shadow-sm hover:shadow-md hover:bg-slate-200 border border-slate-200"
      )}
    >
      <Crown
        className={cn(
          "h-3.5 w-3.5 shrink-0",
          isPro ? "fill-yellow-300 text-yellow-300" : "text-slate-400"
        )}
      />
      <span
        className={cn(
          "text-xs whitespace-nowrap",
          isPro ? "font-semibold" : "font-medium"
        )}
      >
        {planName}
      </span>
    </div>
  );
}
