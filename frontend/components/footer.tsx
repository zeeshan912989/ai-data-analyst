"use client";

import Link from "next/link";
import { Twitter, Github, Linkedin, Database } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 pt-24 pb-12 overflow-hidden border-t border-slate-800">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-blue-500 mb-6 block">
              AI<span className="text-white">Analyst</span>
            </Link>
            <p className="text-slate-400 text-lg leading-relaxed max-w-sm mb-8">
              Empowering data-driven decisions with AI. Simply upload, analyze, and get insights in seconds.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-3 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 hover:scale-110 transition-all">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-3 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 hover:scale-110 transition-all">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-3 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 hover:scale-110 transition-all">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 italic uppercase tracking-widest text-xs">Product</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link href="#features" className="hover:text-blue-500 hover:pl-2 transition-all block">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-blue-500 hover:pl-2 transition-all block">Pricing</Link></li>
              <li><Link href="/dashboard" className="hover:text-blue-500 hover:pl-2 transition-all block">Dashboard</Link></li>
              <li><Link href="#" className="hover:text-blue-500 hover:pl-2 transition-all block">Changelog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 italic uppercase tracking-widest text-xs">Legal</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link href="#" className="hover:text-blue-500 hover:pl-2 transition-all block">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-blue-500 hover:pl-2 transition-all block">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-blue-500 hover:pl-2 transition-all block">GDPR Compliance</Link></li>
              <li><Link href="#" className="hover:text-blue-500 hover:pl-2 transition-all block">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-500 text-sm font-medium">
            © 2026 AI Analyst. Built with ❤️ for Data Nerds.
          </p>
          <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            Vercel Powered Systems
          </div>
        </div>
      </div>
    </footer>
  );
}
