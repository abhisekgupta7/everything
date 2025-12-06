import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function DashboardFallbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bglinear--gradient-to-br from-slate-900 to-slate-800 px-4">
      <div className="text-center max-w-md space-y-6">
        <div className="flex justify-center">
          <Sparkles className="h-12 w-12 text-yellow-400 drop-shadow-lg" />
        </div>
        <p className="text-amber-400 font-semibold uppercase tracking-wide">
          Premium Feature
        </p>

        <div>
          <h1 className="text-4xl font-bold text-white mb-3">
            Subscription Required
          </h1>
          <p className="text-slate-300">
            You need to upgrade to the basic or pro plan to access this feature.
          </p>
        </div>

        <div>
          <Link
            href="/#pricing"
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
          >
            View Pricing Plan
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
