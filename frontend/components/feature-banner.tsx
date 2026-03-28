"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, BarChart2, TrendingUp, Cpu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const banners = [
  {
    title: "Revolutionize Your Retail Sales",
    description: "Identify sales spikes and growth opportunities in real-time with AI-driven dashboard analytics.",
    image: "/banners/sales.png",
    accent: "bg-blue-600",
    icon: <BarChart2 className="w-5 h-5" />,
    stats: "42% Growth Found"
  },
  {
    title: "Predictive Marketing Trends",
    description: "Cluster consumer behavior patterns and predict the next big market shifts before they happen.",
    image: "/banners/marketing.png",
    accent: "bg-indigo-600",
    icon: <Cpu className="w-5 h-5" />,
    stats: "98.4% Accuracy"
  },
  {
    title: "Autonomous Financial Forecasting",
    description: "High-fidelity revenue predictions crafted by our neural engine based on your historical raw data.",
    image: "/banners/finance.png",
    accent: "bg-slate-900",
    icon: <TrendingUp className="w-5 h-5" />,
    stats: "Next Gen Analysis"
  }
];

export function FeatureBanner() {
  return (
    <section className="py-24 px-6 md:px-12 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest border border-blue-100"
          >
            Capabilities
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Go beyond simple spreadsheets.
          </h2>
          <p className="text-slate-500 font-medium text-lg">
            Experience the power of advanced AI data storytelling through three specialized analysis engines.
          </p>
        </div>

        <div className="grid gap-12">
          {banners.map((banner, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`group relative grid lg:grid-cols-2 gap-8 items-center rounded-[40px] overflow-hidden bg-white border border-slate-200 p-8 md:p-12 shadow-sm hover:shadow-2xl transition-all duration-500 ${index % 2 !== 0 ? 'lg:direction-rtl' : ''}`}
            >
              <div className={`space-y-6 ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div className={`w-12 h-12 rounded-2xl ${banner.accent} flex items-center justify-center text-white shadow-lg`}>
                  {banner.icon}
                </div>
                <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                  {banner.title}
                </h3>
                <p className="text-slate-500 text-lg font-medium leading-relaxed">
                  {banner.description}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="px-4 py-2 bg-slate-100 rounded-xl text-slate-700 text-sm font-bold border border-slate-200 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {banner.stats}
                  </div>
                </div>
                <div className="pt-4">
                  {(() => {
                    const [hasMounted, setHasMounted] = React.useState(false);
                    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

                    React.useEffect(() => {
                      setHasMounted(true);
                      setIsLoggedIn(!!localStorage.getItem("token"));
                    }, []);

                    if (!hasMounted) {
                      return (
                        <Link 
                          href="/signup" 
                          className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 group-hover:px-10"
                        >
                          Get Started Now
                          <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      );
                    }

                    return isLoggedIn ? (
                      <Link 
                        href="/dashboard" 
                        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 group-hover:px-10"
                      >
                        View AI Dashboard
                        <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ) : (
                      <Link 
                        href="/signup" 
                        className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 group-hover:px-10"
                      >
                        Get Started Now
                        <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    );
                  })()}
                </div>
              </div>

              <div className={`relative aspect-video lg:aspect-square overflow-hidden rounded-[32px] shadow-2xl ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                 <img 
                    src={banner.image} 
                    alt={banner.title}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                 <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
                    <div className="flex justify-between items-center text-white">
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Engine Type</p>
                          <p className="font-bold">Neural Core v3.1</p>
                       </div>
                       <BarChart2 className="w-5 h-5" />
                    </div>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
