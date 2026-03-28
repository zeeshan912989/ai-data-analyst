"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { Check, Zap, Users, MoveRight, Star, ShieldCheck, ChevronRight } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for testing our AI capabilities.",
    features: ["3 uploads per day", "Basic insights", "Limited AI questions", "Community support"],
    buttonText: "Get Started Free",
    href: "/signup",
    popular: false,
    color: "slate"
  },
  {
    name: "Starter",
    price: "$5",
    description: "Ideal for small business data.",
    features: ["50 uploads/month", "Full AI insights", "Export PDF report", "Priority Support"],
    buttonText: "Upgrade to Starter",
    href: "/signup?plan=starter",
    popular: true,
    color: "blue"
  },
  {
    name: "Pro",
    price: "$10",
    description: "For data power users and agencies.",
    features: ["Unlimited uploads", "Priority AI responses", "Advanced analytics", "Custom Branding", "API Access"],
    buttonText: "Upgrade to Pro",
    href: "/signup?plan=pro",
    popular: false,
    color: "indigo"
  }
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-20 relative overflow-hidden text-center px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-blue-100/30 blur-[120px] rounded-full -z-10" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <span className="px-5 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-black uppercase tracking-widest border border-blue-100 mb-8 inline-block">
            Simple Pricing
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tight leading-none mb-8">
            Choose Your <span className="text-blue-600">Plan</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Switch plans at any time based on your business needs. No hidden fees. Cancel any time.
          </p>
        </motion.div>
      </section>

      {/* Pricing Cards — Same as Dashboard Billing */}
      <section className="pb-32 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              transition={{ delay: i * 0.1 }}
              className={`relative bg-white rounded-3xl p-8 border transition-all flex flex-col ${
                plan.popular 
                  ? "border-blue-500 ring-4 ring-blue-500/20 shadow-2xl" 
                  : "border-slate-200 hover:border-slate-300 hover:shadow-xl"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg flex items-center gap-1.5">
                  <Star className="w-3 h-3 fill-white" />
                  Most Popular
                </div>
              )}

              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-extrabold text-slate-900">{plan.name}</h3>
                {plan.name === "Starter" && <Zap className="w-5 h-5 text-blue-600" />}
                {plan.name === "Pro" && <Users className="w-5 h-5 text-indigo-600" />}
              </div>

              <div className="mb-8">
                <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                <span className="text-slate-500 font-bold">/mo</span>
                <p className="text-slate-400 text-sm mt-3 font-medium leading-relaxed">{plan.description}</p>
              </div>

              <div className="space-y-4 flex-grow mb-10">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <Check className={`w-4 h-4 ${plan.popular ? 'text-blue-500' : 'text-emerald-500'}`} />
                    <span className="text-sm font-semibold text-slate-600">{feature}</span>
                  </div>
                ))}
              </div>

              <Link 
                href={plan.href}
                className={`w-full py-4 px-6 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
                  plan.popular 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700" 
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {plan.buttonText}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Quote Section */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <ShieldCheck className="w-12 h-12 text-slate-300 mx-auto mb-8" />
            <h3 className="text-3xl font-black text-slate-900 mb-6 italic leading-tight">"The intelligence we gained from the Starter plan allowed us to spot a 24% revenue leak in under 10 minutes."</h3>
            <div className="flex items-center justify-center gap-4">
               <div className="w-10 h-10 rounded-full bg-slate-300" />
               <div className="text-left">
                  <p className="text-sm font-black text-slate-900">Sarah Jenkins</p>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Head of Data @ RetailFlow</p>
               </div>
            </div>
         </div>
      </section>

      {/* FAQ Hook */}
      <section className="py-32 bg-white text-center">
         <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">Still have questions?</h2>
            <p className="text-slate-500 font-medium mb-10">Check out our dedicated FAQ page or contact our data strategy team for specialized workspace configurations.</p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/faq" className="px-8 py-4 bg-white border border-slate-200 rounded-3xl text-sm font-black text-slate-600 hover:bg-slate-50 transition-all">View FAQs</Link>
              <Link href="/contact" className="px-8 py-4 bg-white border border-slate-200 rounded-3xl text-sm font-black text-slate-600 hover:bg-slate-50 transition-all">Contact Us</Link>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
