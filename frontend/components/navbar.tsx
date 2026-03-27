"use client";

import Link from "next/link";
import { MoveRight } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-white/70 backdrop-blur-lg">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-blue-600 flex items-center gap-2">
          AI<span className="text-slate-900">Analyst</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="#features" className="hover:text-blue-600 transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-blue-600 transition-colors">How it works</Link>
          <Link href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="px-5 py-2.5 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20">
            Get Started <MoveRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
