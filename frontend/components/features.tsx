"use client";

import { motion } from "framer-motion";
import { 
  BarChart3, 
  BrainCircuit, 
  MessageSquare, 
  Download, 
  ShieldCheck, 
  Zap 
} from "lucide-react";

const features = [
  {
    title: "Auto Charts",
    description: "Upload your CSV/Excel and let our AI determine the best way to visualize your data automatically.",
    icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
    color: "blue",
  },
  {
    title: "AI Insights",
    description: "Get deep analysis on trends, patterns, and outliers without writing a single line of code.",
    icon: <BrainCircuit className="w-8 h-8 text-indigo-600" />,
    color: "indigo",
  },
  {
    title: "Ask Your Data",
    description: "Chat with your dataset using natural language. Ask things like 'What was our best-selling month?'.",
    icon: <MessageSquare className="w-8 h-8 text-emerald-600" />,
    color: "emerald",
  },
  {
    title: "Export Reports",
    description: "Turn your analysis into a professional PDF or PNG report ready for your next presentation.",
    icon: <Download className="w-8 h-8 text-amber-600" />,
    color: "amber",
  },
  {
    title: "Secure & Private",
    description: "Your data is processed securely and never used to train models. GDPR compliant.",
    icon: <ShieldCheck className="w-8 h-8 text-rose-600" />,
    color: "rose",
  },
  {
    title: "Lightning Fast",
    description: "Powered by Groq LPUs, get insights and answers in milliseconds, not minutes.",
    icon: <Zap className="w-8 h-8 text-yellow-500" />,
    color: "yellow",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 font-primary">
            Everything You Need To <br />
            <span className="text-blue-600">Understand Your Data</span>
          </h2>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            Stop wrestling with complex BI tools. AI Analyst gives you the answers you need in seconds with the power of LLMs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl border border-slate-100 bg-white hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-600/5 transition-all group"
            >
              <div className={`p-4 rounded-2xl bg-slate-50 mb-6 w-fit group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
