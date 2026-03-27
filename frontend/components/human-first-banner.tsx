"use client";

import { motion } from "framer-motion";
import { Video, MessageSquare, Headphones, FileText } from "lucide-react";

export function HumanFirstBanner() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50/30 overflow-hidden border-y border-slate-100">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Mockups */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Base Mockup - The Dashboard */}
            <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl shadow-blue-900/10 border border-slate-800 relative z-10 w-full max-w-lg aspect-[4/3] flex flex-col">
              {/* Fake UI Header */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-800">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="ml-4 h-4 w-24 bg-slate-800 rounded-md" />
              </div>
              {/* Fake UI Content */}
              <div className="flex-1 flex gap-4">
                <div className="w-1/4 h-full bg-slate-800/50 rounded-xl" />
                <div className="flex-1 flex flex-col gap-4">
                  <div className="h-12 w-full bg-slate-800 rounded-xl" />
                  <div className="flex-1 w-full bg-slate-800/30 rounded-xl border border-slate-800" />
                </div>
              </div>
            </div>

            {/* Floating Video/Support Mockup #1 */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -right-8 -top-8 w-64 bg-white rounded-3xl p-4 shadow-2xl shadow-slate-200/50 border border-slate-100 z-20"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Video className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="font-semibold text-sm text-slate-800">Expert Guidance</span>
              </div>
              <div className="w-full h-32 bg-slate-100 rounded-2xl overflow-hidden relative">
                {/* Fake Avatar/Video feed */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-300 to-indigo-300 opacity-80" />
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/40 backdrop-blur-md rounded border border-white/10 text-white text-xs font-medium">Data Analyst</div>
              </div>
            </motion.div>

            {/* Floating Support Mockup #2 */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -left-12 -bottom-10 w-72 bg-white rounded-3xl p-5 shadow-2xl shadow-slate-200/50 border border-slate-100 z-30"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <Headphones className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Real-time Support</h4>
                  <div className="h-2 w-full bg-slate-100 rounded-full mb-2" />
                  <div className="h-2 w-3/4 bg-slate-100 rounded-full" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Copy */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:pl-8"
          >
            <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-8 tracking-tight">
              Human-first <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">platform.</span>
            </h2>
            <p className="text-xl text-slate-500 mb-10 leading-relaxed font-medium">
              Need a walkthrough demo, expert guidance from a data analyst, or real-time support? We've got you covered.
            </p>
            <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-xl shadow-slate-900/20 hover:shadow-slate-900/40 text-sm tracking-widest uppercase">
              Get a Demo
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
