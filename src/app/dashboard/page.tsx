export const dynamic = "force-dynamic";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { getSummary } from "@/actions/dataFetch";
import type { Summary } from "@/lib/db/schema";
import { getSummaryCount, getUserPlanStatus, getUserPriceId } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { plans } from "@/lib/constants";
import { redirect } from "next/navigation";
import SummaryCard from "@/components/SummaryCard";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const email = user.emailAddresses[0]?.emailAddress || "";

  const isactive = await getUserPlanStatus(email);
  if (isactive !== "active") {
    redirect("/dashboardFallback");
  }

  const priceId = await getUserPriceId(email);
  const plan = plans.find((p) => p.priceId === priceId);
  const isPro = plan && plan.name === "Pro";
  const uploadlimit = isPro ? 1000 : 5;

  // Fetch summaries on the server
  let summaries: Summary[] = [];
  let sumaryCount = 0;
  try {
    summaries = await getSummary();
    sumaryCount = summaries.length;
  } catch (err) {
    console.error("Failed to load summaries:", err);
  }

  return (
    <div className="container mx-auto p-4">
      <div>
        <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>
        <p className="text-center text-slate-600">
          Welcome to your dashboard. Here you can view your summaries.
        </p>
      </div>

      <div className="my-6 flex items-center justify-between">
        <p>
          You have reached your limit of {uploadlimit} uploads on the basic
          plan.{" "}
          <Link
            href="/#pricing"
            scroll={true}
            className="inline-flex items-center gap-1 text-blue-600"
          >
            Click here to upgrade to Pro <ArrowRight />
          </Link>
        </p>

        {sumaryCount < uploadlimit ? (
          <Button asChild>
            <Link href="/upload" className="inline-flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              New Summary
            </Link>
          </Button>
        ) : null}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {summaries.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-slate-500 mb-4">
              No summaries yet. Upload your first PDF to get started with
              AI-powered summaries.
            </p>
            <Button asChild>
              <Link href="/upload" className="inline-flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Your First Summary
              </Link>
            </Button>
          </div>
        ) : (
          summaries.map((summary) => (
            <SummaryCard
              key={summary.id}
              id={summary.id}
              title={summary.title}
              fileName={summary.fileName}
              createdAt={summary.createdAt}
            />
          ))
        )}
      </div>
    </div>
  );
}
