"use client";

import { motion } from "framer-motion";
import { MoveRight, Table2, BarChart3, MessageSquareText } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent_50%)]" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/30 blur-[100px] -z-10 rounded-full" />
      
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

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href="/dashboard" className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900 text-white text-lg font-bold hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-900/20">
                Analyze My Data <MoveRight className="w-5 h-5" />
              </Link>
              <Link href="#how-it-works" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-700 text-lg font-bold border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                Learn More
              </Link>
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
