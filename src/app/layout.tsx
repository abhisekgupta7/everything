import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import PlanBadge from "@/components/PlanBadge";

const dmsans = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "All-in-one",
  description: "Everything you need to develop a complete web app",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      afterSignInUrl="/dashboard"
      afterSignOutUrl="/"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      <html lang="en">
        <body className={` min-h-screen flex flex-col ${dmsans.className}`}>
          <Navbar />
          <PlanBadge />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster position="top-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
