"use client";

import { motion } from "framer-motion";
import { MoveRight, Table2, BarChart3, MessageSquareText, Sparkles } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_50%)]" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 blur-[120px] -z-10 rounded-full" />
      <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-indigo-100/20 blur-[100px] -z-10 rounded-full" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-6 ring-1 ring-blue-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Powered by AI & Groq
            </span>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 [text-wrap:balance]">
              Turn Your Data Into 
              <span className="text-blue-600 block">Smart Decisions</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl mx-auto [text-wrap:balance]">
              Upload CSV or Excel files and get instant AI-powered insights, automated charts, and natural language Q&A. No SQL or spreadsheets needed.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-16">
              {typeof window !== 'undefined' && localStorage.getItem("token") ? (
                <Link href="/dashboard" className="w-full sm:w-auto px-10 py-4 rounded-full bg-blue-600 text-white text-lg font-black hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-2xl shadow-blue-500/30 border border-blue-400">
                  Go to Dashboard <MoveRight className="w-5 h-5" />
                </Link>
              ) : (
                <>
                  <Link href="/signup" className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 text-white text-lg font-black hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-2xl shadow-blue-500/30 border border-blue-400">
                    Start for Free <MoveRight className="w-5 h-5" />
                  </Link>
                  <div className="flex items-center gap-3">
                    <Link href="/login" className="p-4 rounded-full bg-white border border-slate-200 hover:bg-slate-50 transition-all shadow-sm group" title="Login with Google">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                    </Link>
                    <Link href="/login" className="p-4 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-sm" title="Login with GitHub">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                      </svg>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Abstract Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:mt-12 rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden p-4 group"
          >
            <div className="flex items-center gap-2 mb-4 px-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="h-6 w-32 bg-slate-100 rounded-lg animate-pulse" />
            </div>
            
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-3 h-64 bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="space-y-3">
                  <div className="h-4 w-full bg-slate-200 rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-slate-200 rounded animate-pulse" />
                </div>
              </div>
              <div className="col-span-9 h-64 bg-blue-50/30 rounded-xl p-6 border border-blue-100 relative group-hover:bg-blue-50/50 transition-colors">
                <div className="flex items-end justify-between gap-4 h-full pt-10">
                   {[40, 70, 45, 90, 60, 80, 50].map((h, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 1 + i * 0.1, duration: 0.8 }}
                        className="w-full bg-blue-500 rounded-t-lg shadow-lg shadow-blue-500/10" 
                      />
                   ))}
                </div>
                <div className="absolute top-6 left-6 flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-white shadow-sm ring-1 ring-slate-100">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="h-6 w-32 bg-white rounded-lg ring-1 ring-slate-100" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
