"use client";

import { motion } from "framer-motion";

const metrics = [
  { value: "50M+", label: "Rows Analyzed", suffix: " Data" },
  { value: "99.9%", label: "Accuracy Rate", suffix: " Verified" },
  { value: "10x", label: "Faster Insights", suffix: " Speeds" },
  { value: "5k+", label: "Active Users", suffix: " Global" },
];

export function MetricsBanner() {
  return (
    <section className="relative py-20 bg-white border-y border-slate-100 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-blue-50/50 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-slate-200">
          {metrics.map((metric, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center justify-center text-center p-4 group"
            >
              <div className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors duration-300 mb-2">
                {metric.value}
              </div>
              <div className="text-slate-500 font-semibold text-sm uppercase tracking-wider">
                {metric.label}
              </div>
              <div className="text-slate-400 text-xs mt-1">
                {metric.suffix}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
