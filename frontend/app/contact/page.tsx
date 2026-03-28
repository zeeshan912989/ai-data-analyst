"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare, Send, Zap, ChevronRight, Globe, ExternalLink, MessageCircle, Users } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => setFormStatus('sent'), 1500);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-48 pb-24 relative overflow-hidden px-6">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-100/20 blur-[130px] rounded-full -z-10" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-stretch">
           {/* Left Info Column */}
           <div className="space-y-12">
              <motion.div
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
              >
                 <span className="px-5 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest border border-blue-100 mb-8 inline-block">
                    Neural Customer Care
                 </span>
                 <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-none mb-8">
                    Let's Solve Data <span className="text-blue-600">Together</span>.
                 </h1>
                 <p className="text-xl text-slate-500 font-medium max-w-xl leading-relaxed">
                    Have a custom data requirement or need help scaling your enterprise workspace? Our senior analysts are ready to help.
                 </p>
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { icon: <Mail className="w-5 h-5" />, label: "Intel Email", value: "hello@datamind.ai" },
                  { icon: <Phone className="w-5 h-5" />, label: "Direct Support", value: "+1 (888) DATA-AI" },
                  { icon: <MapPin className="w-5 h-5" />, label: "HQ Locale", value: "Silicon Valley, CA" },
                  { icon: <Globe className="w-5 h-5" />, label: "Global Presence", value: "Available 24/7 Online" }
                ].map((item, i) => (
                  <div key={i} className="group p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-xl hover:border-slate-200 transition-all cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-white text-blue-600 flex items-center justify-center mb-4 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="font-black text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-slate-100">
                 <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Connect with Neural Network</p>
                 <div className="flex items-center gap-6">
                    {[ExternalLink, MessageCircle, Users].map((Icon, i) => (
                      <a key={i} href="#" className="p-3 bg-slate-900 text-white rounded-xl hover:bg-blue-600 hover:scale-110 transition-all shadow-lg active:scale-95">
                        <Icon className="w-5 h-5" />
                      </a>
                    ))}
                 </div>
              </div>
           </div>

           {/* Right Form Column */}
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             className="bg-white rounded-[3.5rem] p-10 md:p-14 border border-slate-200 shadow-2xl shadow-blue-500/5 relative overflow-hidden"
           >
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl" />
              <div className="relative z-10 flex flex-col h-full">
                 <div className="mb-10 text-center lg:text-left">
                    <h3 className="text-3xl font-black text-slate-900 mb-2">Initialize Contact Probe</h3>
                    <p className="text-slate-500 font-medium">Responses typically sent via neural uplink in &lt; 2 hours.</p>
                 </div>

                 {formStatus === 'sent' ? (
                   <div className="flex-1 flex flex-col items-center justify-center text-center py-20 animate-in fade-in zoom-in duration-500">
                      <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-sm border border-emerald-100">
                         <Send className="w-10 h-10" />
                      </div>
                      <h4 className="text-2xl font-black text-slate-900 mb-4">Transmission Successful!</h4>
                      <p className="text-slate-500 font-medium mb-10 max-w-sm">Your intelligence request has been received. Our team will contact you shortly.</p>
                      <button onClick={() => setFormStatus('idle')} className="text-blue-600 font-black flex items-center gap-2 hover:gap-3 transition-all">Send another probe <ChevronRight className="w-4 h-4" /></button>
                   </div>
                 ) : (
                   <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3">Full Identity</label>
                            <input required type="text" placeholder="John Wick" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3">Neural Email</label>
                            <input required type="email" placeholder="john@example.ai" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all" />
                         </div>
                      </div>

                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3">Subject Matrix</label>
                         <select className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all">
                            <option>Enterprise Onboarding</option>
                            <option>Technical Intel Inquiry</option>
                            <option>Billing & Plan Scaling</option>
                            <option>General Support Probe</option>
                         </select>
                      </div>

                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3">The Intelligence Message</label>
                         <textarea rows={5} placeholder="Describe your data challenge..." className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all resize-none"></textarea>
                      </div>

                      <button type="submit" disabled={formStatus === 'sending'} className="w-full py-5 bg-blue-600 text-white rounded-3xl font-black text-lg hover:bg-blue-700 shadow-2xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50">
                         {formStatus === 'sending' ? (
                           <>Initializing Uplink... <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /></>
                         ) : (
                           <>Transmit Message <Send className="w-5 h-5" /></>
                         )}
                      </button>
                   </form>
                 )}
              </div>
           </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
