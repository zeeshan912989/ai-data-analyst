"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

export function TestimonialBanner() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-slate-100 relative"
        >
          <div className="absolute -top-6 -left-6 bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Quote className="w-5 h-5 text-white" />
          </div>

          <div className="flex items-center gap-1 mb-6 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>

          <h3 className="text-2xl md:text-3xl font-medium text-slate-800 leading-relaxed mb-10 font-primary">
            "Before AI Analyst, we spent weeks doing manual pivot tables and basic clustering. Now I literally drop my CSV files in, ask 'what are the main anomalies here?' and get presentation-ready charts in 10 seconds. It feels like magic."
          </h3>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold text-xl ring-4 ring-slate-50">
              JS
            </div>
            <div>
              <div className="font-bold text-slate-900 text-lg">Julia Sterling</div>
              <div className="text-slate-500 text-sm font-medium">Head of Data Strategy, FinTech Global</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
