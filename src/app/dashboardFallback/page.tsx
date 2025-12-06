import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function DashboardFallbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="text-center max-w-lg space-y-8 p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-400/30 blur-xl rounded-full"></div>
            <Sparkles className="relative h-16 w-16 text-yellow-400 drop-shadow-2xl" />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-amber-400 font-bold uppercase tracking-wider text-sm">
            Premium Feature
          </p>
          <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
            Subscription Required
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            You need to upgrade to the basic or pro plan to access this feature.
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 bg-linear-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            View Pricing Plan
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
