"use client";

import Link from "next/link";
import { MailCheck } from "lucide-react";

export default function VerifyEmailPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-[440px] bg-white p-8 sm:p-10 rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-slate-100 text-center relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-emerald-400/20 blur-[50px] rounded-full -z-10" />

        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-emerald-50 rounded-[1.5rem] flex items-center justify-center border border-emerald-100 relative">
            <MailCheck className="w-10 h-10 text-emerald-500" />
            <span className="absolute -top-2 -right-2 flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-500 border border-white"></span>
            </span>
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-3">Check your email</h1>
        <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">
          We sent a verification link to your email address. Please click the link to activate your account.
        </p>

        <Link 
          href="/dashboard"
          className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl text-white font-bold transition-all duration-300 bg-blue-600 hover:bg-blue-700 shadow-[0_8px_20px_0_rgba(37,99,235,0.3)] hover:-translate-y-0.5"
        >
          I've verified my email
        </Link>
        
        <p className="mt-6 text-sm text-slate-500 font-medium">
          Didn't receive the email? <button className="text-blue-600 hover:underline font-bold">Click to resend</button>
        </p>
      </div>
    </main>
  );
}
