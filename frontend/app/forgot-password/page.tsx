"use client";

import Link from "next/link";
import { ArrowLeft, KeyRound, Loader2 } from "lucide-react";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-[440px] bg-white p-8 sm:p-10 rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-slate-100 relative">
        <Link 
          href="/login" 
          className="absolute -top-16 left-0 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors bg-white hover:bg-slate-50 px-4 py-2 rounded-full border border-slate-200 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to login
        </Link>
        
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100 shadow-inner">
            <KeyRound className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="text-center space-y-2 mb-8">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Forgot password?</h1>
          <p className="text-slate-500 text-sm font-medium">
            {isSent ? "We sent a password reset link to your email." : "No worries, we'll send you reset instructions."}
          </p>
        </div>

        {!isSent ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 group">
              <label className="text-sm font-bold text-slate-700 group-focus-within:text-blue-600 transition-colors">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all placeholder-slate-400 text-slate-900"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !email}
              className="w-full relative flex items-center justify-center py-3 px-4 rounded-xl text-white font-bold transition-all duration-300 bg-slate-900 hover:bg-slate-800 shadow-[0_4px_14px_0_rgba(15,23,42,0.39)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Reset password"}
            </button>
          </form>
        ) : (
          <button
            onClick={() => window.location.href = "/login"}
            className="w-full py-3 px-4 rounded-xl text-slate-900 font-bold bg-slate-100 hover:bg-slate-200 transition-all border border-slate-200"
          >
            Return to log in
          </button>
        )}
      </div>
    </main>
  );
}
