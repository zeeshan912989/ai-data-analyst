"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Code, BookOpen, Shield, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20 flex flex-col bg-white overflow-hidden">
      <Navbar />
      
      {/* Hero */}
      <div className="relative pt-32 pb-20 px-6 text-center border-b border-slate-100">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[url('/grid.svg')] opacity-5 animate-[spin_100s_linear_infinite] -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-600/20 to-indigo-600/20 blur-[100px] rounded-full -z-10" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-block px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-bold text-sm tracking-widest uppercase mb-8 border border-blue-100 shadow-sm">
            Our Mission
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">
            Democratizing Data <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Intelligence.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-3xl mx-auto">
            We believe that powerful data analytics shouldn't be locked behind complex Python scripts, SQL queries, or expensive data engineering teams.
          </p>
        </motion.div>
      </div>

      {/* Values */}
      <div className="py-24 container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">Core Values</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Code, title: "No Code", desc: "Complex computations hidden behind simple UI." },
            { icon: Shield, title: "Privacy First", desc: "Data is ephemeral and never used to train global models." },
            { icon: Globe, title: "Accessibility", desc: "Language agnostic natural language queries." },
            { icon: BookOpen, title: "Transparency", desc: "Clear explanations of statistical methods used." }
          ].map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:shadow-blue-500/10 transition-shadow group"
            >
              <div className="w-14 h-14 bg-white shadow-sm border border-slate-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <v.icon className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{v.title}</h3>
              <p className="text-slate-500 font-medium">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
