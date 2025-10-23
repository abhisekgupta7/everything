import Link from "next/link";
import { Button } from "./ui/button";
import { File } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full bg-white/80 backdrop-blur-md shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <File size={32} className="text-indigo-700" />
          <Link
            href="/"
            className="text-2xl font-bold text-gray-900 tracking-tight hover:text-indigo-700 transition-colors"
          >
            Everything
          </Link>
        </div>
        {/* Navigation Links */}
        <ul className="flex items-center gap-8 text-lg font-medium">
          <li>
            <Link
              href="#pricing"
              className="text-gray-700 hover:text-indigo-700 transition-colors"
            >
              Pricing
            </Link>
          </li>
          <li>
            <Link
              href="/summary"
              className="text-gray-700 hover:text-indigo-700 transition-colors"
            >
              Summary
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-indigo-700 transition-colors"
            >
              Dashboard
            </Link>
          </li>
        </ul>
        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <Button className="px-6 py-2 rounded-lg font-semibold bg-indigo-700 text-white hover:bg-indigo-800 shadow transition-all">
            Sign up
          </Button>
          <Button className="px-6 py-2 rounded-lg font-semibold bg-white text-indigo-700 border border-indigo-700 hover:bg-indigo-50 transition-all">
            Sign in
          </Button>
        </div>
      </div>
    </nav>
  );
}
