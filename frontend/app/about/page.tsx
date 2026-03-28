"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Star, BarChart3, Database, Sparkles, MessageSquareText, ShieldCheck, MapPin, Mail, Phone, Users, LayoutDashboard, Share2, Rocket, Zap } from "lucide-react";
import Link from "next/link";

const milestones = [
  { year: "2024", title: "The Foundation", desc: "Started as a simple CSV parser in a bedroom, aiming to disrupt spreadsheet analysis." },
  { year: "2025", title: "Fast Growing", desc: "Reached 10,000 users and integrated Groq Llama AI core for real-time intelligence." },
  { year: "2026", title: "Enterprise Ready", desc: "Launched Multi-Business workspaces and global PDF reporting telemetry." }
];

export default function About() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-48 pb-32 text-center relative overflow-hidden px-6">
        <div className="absolute top-0 right-0 w-[800px] h-[500px] bg-blue-100/30 blur-[130px] rounded-full -z-10" />
        
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="max-w-4xl mx-auto"
        >
          <span className="px-5 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-black uppercase tracking-widest border border-blue-100 mb-8 inline-block animate-pulse">
            Founded 2024
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tight leading-none mb-10">
            Our Mission: Make Data <span className="text-blue-600">Accessible</span>.
          </h1>
          <p className="text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            We empower businesses to stop guessing and start knowing. No SQL. No sheets. Just intelligent answers to your toughest questions.
          </p>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6">
         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div className="bg-slate-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px]" />
               <div className="relative z-10 space-y-8">
                  <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center shadow-xl shadow-blue-500/20 group-hover:rotate-6 transition-transform">
                     <Star className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-4xl font-black tracking-tight leading-tight">The Neural Edge Approach</h2>
                  <p className="text-slate-400 font-bold leading-relaxed text-lg italic">"We didn't build just another charting tool. We built a data companion that understands context, identifies outliers, and provides strategy—not just numbers."</p>
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-white/10 rounded-xl flex items-center gap-2">
                         <span className="w-3 h-3 rounded-full bg-blue-500" />
                         <p className="text-xs font-black uppercase tracking-widest">Efficiency 100%</p>
                     </div>
                     <div className="p-3 bg-white/10 rounded-xl flex items-center gap-2">
                         <span className="w-3 h-3 rounded-full bg-emerald-500" />
                         <p className="text-xs font-black uppercase tracking-widest">Accuracy 99.8%</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="space-y-12">
               <div>
                  <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-4">Core Values</h3>
                  <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-6">Transparency and Scalability above all.</h2>
                  <p className="text-slate-500 font-medium text-lg leading-relaxed">We believe data should not be siloed in enterprise departments. Our tool is built for the individual entrepreneur as much as the Fortune 500 team lead.</p>
               </div>

               <div className="grid md:grid-cols-2 gap-8">
                  {[
                    { title: "Privacy First", body: "We never store your raw data long-term. Everything is analyzed in ephemeral AI memory.", icon: <ShieldCheck className="w-5 h-5" /> },
                    { title: "Velocity", body: "From CSV upload to PDF strategy reports in under 30 seconds. No lag.", icon: <Zap className="w-5 h-5" /> }
                  ].map((value, i) => (
                    <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-xl hover:border-slate-200 transition-all">
                       <div className="w-10 h-10 rounded-xl bg-white text-blue-600 flex items-center justify-center mb-4 shadow-sm border border-slate-100">
                          {value.icon}
                       </div>
                       <h4 className="font-black text-slate-900 mb-2">{value.title}</h4>
                       <p className="text-slate-500 text-sm font-medium leading-relaxed">{value.body}</p>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 bg-[#F8FAFC]">
         <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-black text-slate-900 mb-20 tracking-tight">Our Growth Story</h2>
            <div className="relative space-y-16">
               <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-slate-200 hidden md:block" />
               {milestones.map((m, i) => (
                 <div key={i} className={`flex flex-col md:flex-row items-center gap-10 relative z-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="flex-1 text-center md:text-right">
                       {i % 2 === 0 && (
                         <>
                            <h4 className="text-blue-600 font-black text-2xl mb-2">{m.year}</h4>
                            <h3 className="text-xl font-black text-slate-900 mb-4">{m.title}</h3>
                            <p className="text-slate-500 font-medium text-sm leading-relaxed">{m.desc}</p>
                         </>
                       )}
                    </div>
                    <div className="w-12 h-12 bg-white ring-8 ring-slate-100 rounded-full border-4 border-blue-600 shrink-0 shadow-lg relative z-20" />
                    <div className="flex-1 text-center md:text-left">
                       {i % 2 !== 0 && (
                         <>
                            <h4 className="text-blue-600 font-black text-2xl mb-2">{m.year}</h4>
                            <h3 className="text-xl font-black text-slate-900 mb-4">{m.title}</h3>
                            <p className="text-slate-500 font-medium text-sm leading-relaxed">{m.desc}</p>
                         </>
                       )}
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* CTA section */}
      <section className="py-40 text-center px-6">
         <div className="max-w-4xl mx-auto bg-blue-600 rounded-[3rem] p-16 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-700 to-transparent opacity-50" />
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform" />
            
            <div className="relative z-10 flex flex-col items-center">
               <Rocket className="w-16 h-16 text-white mb-8 animate-bounce" />
               <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight">Ready to join the Intelligence Revolution?</h2>
               <Link href="/signup" className="px-12 py-5 bg-white text-blue-600 rounded-2xl text-lg font-black hover:bg-slate-50 shadow-2xl hover:scale-[1.05] active:scale-95 transition-all">Start Your Journey Now</Link>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
