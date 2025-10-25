import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const dmsans = DM_Sans({
subsets:["latin"]
});



export const metadata: Metadata = {
  title: "All-in-one",
  description: "Everything you need to develop a complete web app",
   icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`${dmsans.className}`}>
        <Navbar />
        <main>

        {children}
        </main>
          <Footer />
          <Toaster position="top-right" />
      </body>
      </html>
      </ClerkProvider>
  );
}
