"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function CtaBanner() {
  return (
    <section className="relative py-24 overflow-hidden bg-slate-900 border-y border-slate-800">
      {/* Abstract Animated Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[url('/grid.svg')] opacity-[0.03] animate-[spin_120s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold mb-6 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
            <Sparkles className="w-4 h-4" />
            <span>Ready to transform your workflow?</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Stop digging through <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">endless spreadsheets.</span>
          </h2>
          
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto font-medium">
            Join thousands of data-driven teams making faster, smarter decisions with our AI-powered analytics engine. Zero coding required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/dashboard"
              className="group relative inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-transparent hover:text-white transition-all duration-300 w-full sm:w-auto overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              Start Analyzing for Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-slate-500 text-sm sm:hidden mt-2">No credit card required</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
