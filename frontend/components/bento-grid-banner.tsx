"use client";

import { motion } from "framer-motion";
import { BarChart, Search, Zap, Layers, Share2, ShieldCheck } from "lucide-react";

export function BentoGridBanner() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Everything you need. <br className="hidden md:block" />
            Built for scale.
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Discover the powerful features that make AI Analyst the top choice for modern agile teams.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[240px]">
          
          {/* Card 1: Large Feature */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 lg:col-span-2 row-span-2 bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col justify-between overflow-hidden relative group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl -z-10 group-hover:bg-blue-200/50 transition-colors" />
            <div>
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-6">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Natural Language Search</h3>
              <p className="text-slate-500 font-medium max-w-sm">Just type what you want to know. Our AI translates your questions into complex SQL and Python instantly.</p>
            </div>
            {/* Abstract Graphic */}
            <div className="w-full h-48 bg-white border border-slate-200 rounded-t-2xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] mt-8 p-4 relative translate-y-8 group-hover:translate-y-4 transition-transform duration-500">
              <div className="w-1/2 h-4 bg-slate-100 rounded mb-4" />
              <div className="w-3/4 h-4 bg-slate-100 rounded" />
            </div>
          </motion.div>

          {/* Card 2: Dark Accent */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1 lg:col-span-1 row-span-1 bg-slate-900 rounded-3xl p-8 border border-slate-800 flex flex-col justify-between text-white relative overflow-hidden"
          >
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl" />
            <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">10x Faster</h3>
              <p className="text-slate-400 text-sm">Cut down reporting time from weeks to seconds.</p>
            </div>
          </motion.div>

          {/* Card 3: Light Accent */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1 lg:col-span-1 row-span-2 bg-blue-50 rounded-3xl p-8 border border-blue-100 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 mix-blend-overlay" />
            <div>
              <div className="w-10 h-10 bg-white rounded-xl shadow-sm text-blue-600 flex items-center justify-center mb-4">
                <BarChart className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Auto-Charting</h3>
              <p className="text-slate-600 text-sm mb-6">Beautiful, presentation-ready visualizations generated automatically.</p>
            </div>
            <div className="flex-1 w-full bg-white rounded-2xl border border-blue-200/50 shadow-inner overflow-hidden flex items-end px-4 gap-2">
              <div className="w-1/3 bg-blue-300 rounded-t-md" style={{ height: '40%' }} />
              <div className="w-1/3 bg-blue-400 rounded-t-md" style={{ height: '70%' }} />
              <div className="w-1/3 bg-blue-500 rounded-t-md" style={{ height: '100%' }} />
            </div>
          </motion.div>

          {/* Card 4 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-1 lg:col-span-1 row-span-1 bg-white rounded-3xl p-8 border border-slate-200 flex flex-col justify-between hover:border-slate-300 transition-colors"
          >
            <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Enterprise Security</h3>
              <p className="text-slate-500 text-sm">SOC2 Type II certified.</p>
            </div>
          </motion.div>

          {/* Card 5 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 lg:col-span-2 row-span-1 bg-gradient-to-r from-slate-100 to-slate-50 rounded-3xl p-8 border border-slate-200 flex items-center justify-between"
          >
            <div>
              <div className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-xl flex items-center justify-center mb-4 text-indigo-500">
                <Share2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Seamless Integrations</h3>
              <p className="text-slate-500 text-sm max-w-xs">Connect your Notion, Slack, and Google Drive.</p>
            </div>
            <div className="hidden sm:flex gap-2">
              <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center z-20 border border-slate-100">
                <Layers className="w-5 h-5 text-slate-400" />
              </div>
              <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center -ml-4 z-10 border border-slate-100">
                <BarChart className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
