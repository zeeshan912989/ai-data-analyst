"use client";

import { motion } from "framer-motion";
import { Database, Zap, BrainCircuit } from "lucide-react";
import { useState, useEffect } from "react";

const loadingTextOptions = [
  "Connecting to secure intelligence network...",
  "Initializing LLaMA 3.3 matrix...",
  "Pre-computing data schemas...",
  "Calibrating neural weights...",
  "Waking up the analysts..."
];

export function AdvancedLoader({ fullScreen = false }: { fullScreen?: boolean }) {
  const [loadingText, setLoadingText] = useState(loadingTextOptions[0]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % loadingTextOptions.length;
      setLoadingText(loadingTextOptions[i]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const containerClasses = fullScreen 
    ? "fixed inset-0 z-[99]"
    : "w-full h-full flex items-center justify-center p-20 min-h-[400px] relative";

  return (
    <div className={`${containerClasses} flex flex-col items-center justify-center`}>
      {fullScreen && <div className="absolute inset-0 bg-transparent z-0" />}
      
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Abstract animated ring */}
        <div className="relative w-32 h-32 flex items-center justify-center mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-t-2 border-r-2 border-blue-600 border-dashed opacity-50"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border-b-2 border-l-2 border-indigo-500 opacity-60"
          />
          
          <div className="absolute inset-4 rounded-full bg-slate-900 shadow-2xl shadow-blue-500/30 flex items-center justify-center overflow-hidden">
             
             {/* Center icon sequence */}
             <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
             >
                <BrainCircuit className="w-8 h-8 text-blue-400" />
             </motion.div>
          </div>
        </div>

        {/* Text Area */}
        <div className="text-center">
          <div className="flex items-center gap-2 justify-center mb-2">
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <h3 className="text-xl font-black tracking-tight text-slate-900 uppercase">Processing</h3>
          </div>
          
          <p className="text-sm font-medium text-slate-500 max-w-[250px] mx-auto h-5">
            <motion.span
              key={loadingText}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {loadingText}
            </motion.span>
          </p>
        </div>

        {/* Progress Bar Mock */}
        <div className="w-48 h-1.5 bg-slate-200 rounded-full mt-6 overflow-hidden">
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-full bg-blue-600 rounded-full w-1/2"
          />
        </div>
      </div>
    </div>
  );
}
