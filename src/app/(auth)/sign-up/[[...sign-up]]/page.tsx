import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-white">Get Started</h1>
          <p className="text-slate-300">Create your account to begin</p>
        </div>
        <SignUp
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-white shadow-2xl rounded-2xl",
              headerTitle: "text-2xl font-bold text-slate-900",
              headerSubtitle: "text-slate-600",
              socialButtonsBlockButton:
                "bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50",
              formButtonPrimary:
                "bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg",
              footerActionLink:
                "text-indigo-600 hover:text-indigo-700 font-semibold",
              formFieldInput:
                "rounded-lg border-slate-300 focus:border-indigo-500 focus:ring-indigo-500",
              formFieldLabel: "text-slate-700 font-medium",
              identityPreviewText: "text-slate-700",
              identityPreviewEditButton:
                "text-indigo-600 hover:text-indigo-700",
            },
          }}
        />
      </div>
    </div>
  );
}
