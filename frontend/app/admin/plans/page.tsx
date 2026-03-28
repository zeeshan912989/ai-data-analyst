"use client";

import { motion } from "framer-motion";
import { 
  Plus, CreditCard, ChevronRight, CheckCircle2, 
  Settings, Zap, Users, TrendingUp, Layers, 
  Trash2, Edit, Save, MoreHorizontal, Clock
} from "lucide-react";

const currentPlans = [
  { id: 1, name: "Free", price: "$0", subscribers: 842, status: "Active", features: 4, icon: <Layers className="w-5 h-5 text-slate-400" /> },
  { id: 2, name: "Starter", price: "$5", subscribers: 350, status: "Active", features: 8, icon: <Zap className="w-5 h-5 text-blue-500" /> },
  { id: 3, name: "Pro", price: "$10", subscribers: 132, status: "Internal", features: 12, icon: <Users className="w-5 h-5 text-indigo-500" /> }
];

export default function PricingManagement() {
  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20 px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Pricing Plans</h1>
          <p className="text-slate-500 font-medium">Control plans, quotas, features, and active subscriptions.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center gap-2 active:scale-95">
             <Plus className="w-4 h-4" />
             Create New Tier
           </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {currentPlans.map((plan) => (
          <div key={plan.id} className="relative group bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:border-blue-500/20 transition-all duration-500 overflow-hidden">
             
             {/* Hover Decorative Element */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-700" />
             
             <div className="mb-10 flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                   {plan.icon}
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                   {plan.status}
                </div>
             </div>

             <div className="space-y-2 mb-10">
                <h3 className="text-2xl font-black text-slate-900">{plan.name} Plan</h3>
                <div className="flex items-baseline gap-1">
                   <h2 className="text-4xl font-black text-slate-900">{plan.price}</h2>
                   <span className="text-slate-400 font-bold text-sm">/month</span>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Users</p>
                   <p className="text-xl font-black text-slate-900">{plan.subscribers}</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Revenue</p>
                   <p className="text-xl font-black text-slate-900">${(parseInt(plan.price.slice(1)) * plan.subscribers).toLocaleString()}</p>
                </div>
             </div>

             <div className="space-y-3 mb-10">
                <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                   <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                   <span>{plan.features} core system features</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                   <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                   <span>Global High Priority Support</span>
                </div>
             </div>

             <div className="pt-8 border-t border-slate-100 flex items-center gap-3">
                <button className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all text-sm active:scale-95 shadow-lg shadow-slate-200">
                   <Edit className="w-4 h-4" />
                   Edit Plan
                </button>
                <button className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-slate-400 hover:text-rose-600 active:scale-95">
                   <Trash2 className="w-4 h-4" />
                </button>
             </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
         <div className="absolute inset-y-0 right-0 w-80 bg-[url('/grid.svg')] opacity-5 mask-fade-left" />
         <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="w-24 h-24 bg-blue-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-200 shrink-0">
               <TrendingUp className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1 space-y-2 text-center md:text-left">
               <h3 className="text-2xl font-black text-slate-900 tracking-tight">Revenue Intelligence Integration</h3>
               <p className="text-slate-500 font-medium font-sans leading-relaxed">
                  Your pricing is currently locked to local demo mode. To process real payments across the globe, connect your Lemon Squeezy or Stripe account. 
               </p>
            </div>
            <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200 whitespace-nowrap">
               Connect Gateway
            </button>
         </div>
      </div>
    </div>
  );
}
