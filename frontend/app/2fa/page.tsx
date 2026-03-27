"use client";

import { Lock } from "lucide-react";

export default function TwoFactorAuthPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-[400px] bg-white p-8 sm:p-10 rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-slate-100 relative">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100 relative shadow-inner">
            <Lock className="w-8 h-8 text-blue-600" />
            <div className="absolute top-0 right-0 w-3 h-3 bg-emerald-400 rounded-full ring-2 ring-white" />
          </div>
        </div>

        <div className="text-center space-y-2 mb-8">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Two-Factor Auth</h1>
          <p className="text-slate-500 text-sm font-medium">
            Enter the 6-digit code from your authenticator app to access your secure workspace.
          </p>
        </div>

        <div className="flex justify-between gap-2 mb-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              className="w-12 h-14 text-center text-xl font-bold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-slate-900 shadow-sm"
              placeholder="-"
            />
          ))}
        </div>

        <button className="w-full relative flex items-center justify-center py-3.5 px-4 rounded-xl text-white font-bold transition-all duration-300 bg-slate-900 hover:bg-slate-800 shadow-[0_4px_14px_0_rgba(15,23,42,0.39)] hover:-translate-y-0.5">
          Verify Device
        </button>

        <p className="mt-8 text-center text-sm text-slate-500 font-medium">
          Having trouble? <button className="text-blue-600 hover:underline font-bold">Use a recovery code</button>
        </p>
      </div>
    </main>
  );
}
