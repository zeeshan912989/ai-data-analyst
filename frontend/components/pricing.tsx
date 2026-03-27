"use client";

import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for students and personal side-projects.",
    features: [
      "Up to 3 free file uploads/day",
      "Basic CSV support",
      "Automatic Bar Charts",
      "AI Data Insights",
      "7-day history storage",
    ],
    cta: "Get Started Free",
    featured: false,
  },
  {
    name: "Pro",
    price: "19",
    description: "The complete solution for data analysts and businesses.",
    features: [
      "Unlimited file uploads",
      "Excel & CSV support",
      "Pie, Line & Radar charts",
      "Advanced AI Conversations",
      "Export reports as PDF/PNG",
      "Priority API support",
    ],
    cta: "Go Pro Now",
    featured: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-slate-50 relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">Simple Pricing</h2>
          <p className="text-lg text-slate-600 font-medium">Unlocking your data insights shouldn't cost a fortune. Start free and upgrade as you grow.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`p-10 rounded-3xl relative overflow-hidden transition-all ${
                tier.featured 
                  ? "bg-slate-900 text-white shadow-2xl scale-105" 
                  : "bg-white border border-slate-200 text-slate-900"
              }`}
            >
              {tier.featured && (
                <div className="absolute top-0 right-0 py-1.5 px-6 rounded-bl-2xl bg-blue-600 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                  <Zap className="w-3 h-3 fill-white" /> Recommended
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-5xl font-extrabold tracking-tight">${tier.price}</span>
                  <span className={`text-sm ${tier.featured ? "text-slate-400" : "text-slate-500"}`}>/month</span>
                </div>
                <p className={`text-sm leading-relaxed ${tier.featured ? "text-slate-300" : "text-slate-500"}`}>
                  {tier.description}
                </p>
              </div>

              <div className="space-y-4 mb-10">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className={`p-0.5 rounded-full ${tier.featured ? "bg-blue-500/20 text-blue-400" : "bg-blue-50 text-blue-600"}`}>
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-2xl text-sm font-bold transition-all ${
                tier.featured 
                  ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 ring-2 ring-blue-500/10" 
                  : "bg-slate-100 text-slate-900 hover:bg-slate-200 ring-1 ring-slate-200"
              }`}>
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
