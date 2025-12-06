export const dynamic = "force-dynamic";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { getSummary } from "@/actions/dataFetch";
import type { Summary } from "@/lib/db/schema";
import { getSummaryCount, getUserPlanStatus, getUserPriceId } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { plans } from "@/lib/constants";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const userid = user.id as unknown as number;
  const email = user.emailAddresses[0]?.emailAddress || "";

  const sumaryCount = await getSummaryCount(userid);
  const priceId = await getUserPriceId(email);
  const plan = plans.find((p) => p.priceId === priceId);
  const isPro = plan && plan.name === "Pro";
  const uploadlimit = isPro ? 1000 : 5;

  const isactive = await getUserPlanStatus(email);
  if (isactive !== "active") { 
 redirect('/dashboardFallback');
  }


  // Fetch summaries on the server
  let summaries: Summary[] = [];
  try {
    summaries = await getSummary();
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
            className="inline-flex items-center gap-1 text-blue-600"
          >
            Click here to upgrade to Pro <ArrowRight />
          </Link>
        </p>

        
        {
          sumaryCount > uploadlimit ? ( <Button asChild>
          <Link href="/upload" className="inline-flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            New Summary
          </Link>
        </Button>) : null
       }

      </div>
     

     
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaries.length === 0 ? (<>
          <p className="text-center text-slate-500 col-span-1 md:col-span-2 lg:col-span-3">
            No summaries yet.
          </p>
          <div>
            <p>Upload your first pdf to get started with AI-powered summaries.</p>
            <Button asChild className="mt-4">
          <Link href="/upload" className="inline-flex items-center">
                Create Your First Summary
                <Plus className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </>
        ) : (
          summaries.map((summary) => (
            <Card key={summary.id} className="p-4 h-full">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">
                    {summary.title || "Untitled"}
                  </h2>
                  <p className="text-sm text-slate-600">
                    {summary.fileName} -{" "}
                    {new Date(summary.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Link
                    href={`/summary/${summary.id}`}
                    className="text-blue-600 text-sm"
                    rel="noreferrer"
                  >
                    View Summary
                  </Link>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>


    </div>
  );
}
