"use client";

import Link from "next/link";
import { Wrench } from "lucide-react";

export default function MaintenancePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-lg bg-white p-8 sm:p-10 rounded-[2rem] shadow-sm border border-slate-200 text-center relative overflow-hidden">
        
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center border border-amber-100">
            <Wrench className="w-10 h-10 text-amber-500 animate-[spin_3s_linear_infinite]" />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">We're upgrading our systems.</h1>
        <p className="text-slate-500 text-lg font-medium leading-relaxed mb-8 max-w-sm mx-auto">
          AI Analyst is currently undergoing scheduled maintenance to improve our Groq inference speed and query capabilities. We'll be back online shortly.
        </p>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
          <p className="text-sm font-bold text-slate-700">Estimated downtime: <span className="text-amber-600">~15 minutes</span></p>
        </div>
        
        <p className="mt-8 text-sm text-slate-500 font-medium">
          Need immediate support? <Link href="/contact" className="text-blue-600 hover:underline font-bold">Contact us</Link>
        </p>
      </div>
    </main>
  );
}
