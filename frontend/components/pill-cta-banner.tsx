"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function PillCtaBanner() {
  return (
    <section className="py-24 bg-white flex justify-center w-full overflow-hidden">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full rounded-full bg-gradient-to-r from-fuchsia-100 via-purple-100 to-indigo-100 p-2 sm:p-4 flex flex-col md:flex-row shadow-[0_20px_60px_-15px_rgba(168,85,247,0.2)]"
        >
          {/* Inner Content Wrapper */}
          <div className="w-full rounded-full border border-white/40 bg-white/20 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between py-6 md:py-8 px-8 md:px-16 gap-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight text-center md:text-left">
              Try AI Analyst today
            </h2>
            
            <Link 
              href="/dashboard"
              className="group relative flex-shrink-0 bg-slate-300/40 hover:bg-white/60 backdrop-blur-md rounded-full px-8 py-4 transition-all duration-300 border border-white/50 shadow-inner"
            >
              <span className="font-bold text-slate-700 tracking-widest uppercase text-sm group-hover:text-blue-600 transition-colors">
                Start for free
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
