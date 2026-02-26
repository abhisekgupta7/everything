import { currentUser } from "@clerk/nextjs/server";
import { getSummaryCountByClerkId, getUserPlanStatus, getUserPriceId } from "@/lib/user";
import { plans } from "@/lib/constants";
import { redirect } from "next/navigation";
import UploadFormClient from "@/components/UploadFormClient";

export default async function UploadPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const clerkId = user.id;
  const email = user.emailAddresses[0]?.emailAddress || "";
  
  const status = await getUserPlanStatus(email);
if (status !== "active") {
  redirect("/dashboardFallback");
}

  const summaryCount = await getSummaryCountByClerkId(clerkId);
  const priceId = await getUserPriceId(email);
  const plan = plans.find((p) => p.priceId === priceId);
  const isPro = plan?.name === "Pro";
  const uploadLimit = isPro ? 1000 : 5;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
          Upload Your PDF
        </h1>
        <p className="text-xl text-slate-600 mb-12 max-w-lg mx-auto">
          Generate a summary using AI
        </p>
        <UploadFormClient
          uploadLimit={uploadLimit}
          summaryCount={summaryCount}
        />
      </div>
    </div>
  );
}
