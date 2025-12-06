"use client"
import Link from "next/link";
import { Button } from "./ui/button";
import { File, Menu as MenuIcon, X as CloseIcon } from "lucide-react";
import { useState } from "react";


import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <File size={32} className="text-indigo-700" />
          <Link
            href="/"
            className="text-2xl font-extrabold text-gray-900 tracking-tight hover:text-indigo-700 transition-colors font-[Poppins,Inter,sans-serif]"
            aria-label="Homepage"
          >
            Everything
          </Link>
        </div>
        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 text-lg font-medium">
          <li>
            <Link
              href="#pricing"
              className="px-2 py-1 rounded-lg text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-colors"
            >
              Pricing
            </Link>
          </li>
          <SignedIn>
            <li>
              <Link
                href="/upload"
                className="px-2 py-1 rounded-lg text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-colors"
              >
                Upload
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="px-2 py-1 rounded-lg text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-colors"
              >
                Dashboard
              </Link>
            </li>
          </SignedIn>
        </ul>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-2 sm:gap-4">
          <SignedIn>
            <div className="ml-2">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
          <SignedOut>
              <SignInButton />
              <SignUpButton />
          </SignedOut>
        </div>
        {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <CloseIcon size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>
      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/40"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute top-0 right-0 w-64 h-full bg-white shadow-lg flex flex-col gap-8 py-8 px-6 animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-6">
              <File size={28} className="text-indigo-700" />
              <Link
                href="/"
                className="text-xl font-extrabold text-gray-900 tracking-tight hover:text-indigo-700 transition-colors font-[Poppins,Inter,sans-serif]"
                aria-label="Homepage"
                onClick={() => setMobileOpen(false)}
              >
                Everything
              </Link>
            </div>
            <nav className="flex flex-col gap-4 text-lg font-medium">
              <Link
                href="#pricing"
                className="px-2 py-1 rounded-lg text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Pricing
              </Link>
              <SignedIn>
                <Link
                  href="/summary"
                  className="px-2 py-1 rounded-lg text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Summary
                </Link>
                <Link
                  href="/dashboard"
                  className="px-2 py-1 rounded-lg text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </Link>
              </SignedIn>
            </nav>
            <div className="flex flex-col gap-3 mt-auto">
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <Button className="px-5 py-2 rounded-lg font-semibold bg-indigo-700 text-white hover:bg-indigo-800 shadow transition-all">
                  <SignInButton />
                </Button>
                <Button className="px-5 py-2 rounded-lg font-semibold bg-white text-indigo-700 border border-indigo-700 hover:bg-indigo-50 transition-all">
                  <SignUpButton />
                </Button>
              </SignedOut>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
