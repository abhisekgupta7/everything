import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function DashboardFallbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-20">
      <div className="text-center max-w-2xl space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-700 font-medium text-sm shadow-sm">
          <Sparkles className="w-4 h-4" />
          Premium Feature
        </div>

        {/* Heading */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
            Subscription Required
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-lg mx-auto">
            You need to upgrade to the basic or pro plan to access this feature.
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <Link
            href="/#pricing"
            scroll={true}
            className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            View Pricing Plan
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
