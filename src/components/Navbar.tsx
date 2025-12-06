"use client";
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
import PlanBadge from "./PlanBadge";

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
            <PlanBadge />
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
      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Slide-in Menu */}
        <div
          className={`absolute top-0 right-0 w-72 h-full bg-white shadow-2xl flex flex-col py-6 px-6 transform transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            className="self-end p-2 rounded-lg hover:bg-slate-100 transition-colors mb-4"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <CloseIcon size={24} className="text-gray-700" />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-8 px-2">
            <File size={28} className="text-indigo-700" />
            <Link
              href="/"
              className="text-xl font-extrabold text-gray-900 tracking-tight"
              onClick={() => setMobileOpen(false)}
            >
              Everything
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2 flex-1">
            <Link
              href="#pricing"
              className="px-4 py-3 rounded-lg text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 transition-colors font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Pricing
            </Link>
            <SignedIn>
              <Link
                href="/upload"
                className="px-4 py-3 rounded-lg text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 transition-colors font-medium"
                onClick={() => setMobileOpen(false)}
              >
                Upload
              </Link>
              <Link
                href="/dashboard"
                className="px-4 py-3 rounded-lg text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 transition-colors font-medium"
                onClick={() => setMobileOpen(false)}
              >
                Dashboard
              </Link>
            </SignedIn>
          </nav>

          {/* Auth Section */}
          <div className="border-t pt-4 mt-4">
            <SignedIn>
              <div className="px-4 py-2">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
            <SignedOut>
              <div className="flex flex-col gap-3">
                <Button
                  className="w-full py-3 rounded-lg font-semibold bg-indigo-700 text-white hover:bg-indigo-800 shadow-md transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  <SignInButton mode="modal" />
                </Button>
                <Button
                  className="w-full py-3 rounded-lg font-semibold bg-white text-indigo-700 border-2 border-indigo-700 hover:bg-indigo-50 transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  <SignUpButton mode="modal" />
                </Button>
              </div>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
}
