"use client";

import { Database, Server, Fingerprint, Activity, Layers, Cloud, Box, Cpu } from "lucide-react";

export function LogoBanner() {
  const logos = [
    { icon: Database, name: "DataStack" },
    { icon: Server, name: "ScaleCore" },
    { icon: Fingerprint, name: "AuthDefend" },
    { icon: Activity, name: "PulseAI" },
    { icon: Layers, name: "StackSync" },
    { icon: Cloud, name: "CloudStream" },
    { icon: Box, name: "CubeTech" },
    { icon: Cpu, name: "NeuralCompute" },
  ];

  return (
    <section className="py-12 bg-white overflow-hidden border-b border-slate-100 relative">
      <div className="container mx-auto px-6 mb-8 text-center">
        <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest relative z-20">
          Trusted by top forward-thinking companies
        </p>
      </div>
      
      <div className="relative flex max-w-full overflow-hidden">
        {/* Blend Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        
        {/* The Marquee Track */}
        <div className="animate-marquee flex hover:[animation-play-state:paused] pointer-events-auto">
          {/* Double up the array to make the infinite loop seamless */}
          {[...logos, ...logos, ...logos].map((logo, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center space-x-3 text-slate-400 hover:text-blue-500 transition-colors duration-300 px-10 cursor-pointer group"
            >
              <logo.icon className="w-8 h-8 group-hover:animate-pulse" />
              <span className="text-xl font-bold tracking-tight">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
