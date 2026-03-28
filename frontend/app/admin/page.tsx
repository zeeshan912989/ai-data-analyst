"use client";

import { motion } from "framer-motion";
import { 
  Users, CreditCard, BarChart, HardDrive, 
  ArrowUpRight, ArrowDownRight, Activity, 
  ShieldCheck, Globe, Zap, Database
} from "lucide-react";
import { 
  ResponsiveContainer, AreaChart, Area, 
  XAxis, YAxis, CartesianGrid, Tooltip 
} from 'recharts';

const dummyStats = [
  { name: 'Mon', signups: 10, revenue: 50 },
  { name: 'Tue', signups: 15, revenue: 80 },
  { name: 'Wed', signups: 25, revenue: 150 },
  { name: 'Thu', signups: 35, revenue: 200 },
  { name: 'Fri', signups: 30, revenue: 180 },
  { name: 'Sat', signups: 45, revenue: 300 },
  { name: 'Sun', signups: 40, revenue: 250 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20 px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-200">
             <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Admin System Central</h1>
            <p className="text-slate-500 font-medium">Monitoring AI Data Analyst global operations.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             Systems Normal
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Users", value: "1,248", change: "+12%", trend: "up", icon: <Users className="w-5 h-5 text-blue-500" /> },
          { label: "Active Subs", value: "482", change: "+5%", trend: "up", icon: <CreditCard className="w-5 h-5 text-indigo-500" /> },
          { label: "API Calls", value: "842k", change: "+24%", trend: "up", icon: <Zap className="w-5 h-5 text-amber-500" /> },
          { label: "Storage Used", value: "4.2 TB", change: "-2%", trend: "down", icon: <Database className="w-5 h-5 text-rose-500" /> },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-7 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all">
            <div className="flex justify-between items-center mb-6">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center">
                  {stat.icon}
                </div>
                <div className={`flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-lg ${stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  {stat.change}
                </div>
            </div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</h2>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-indigo-100 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />
           <div className="flex items-center justify-between mb-12">
              <h3 className="text-2xl font-black flex items-center gap-3">
                <Activity className="w-6 h-6 text-indigo-400" />
                Global Performance
              </h3>
              <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                 <span className="px-3 py-1 border border-white/10 rounded-lg bg-white/5">Weekly View</span>
              </div>
           </div>
           
           <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={dummyStats}>
                 <defs>
                   <linearGradient id="colorAdmin" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                 <XAxis 
                   dataKey="name" 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }}
                   dy={10}
                 />
                 <YAxis 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }}
                 />
                 <Tooltip 
                   contentStyle={{ background: '#0f172a', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontWeight: 700 }}
                 />
                 <Area 
                   type="monotone" 
                   dataKey="revenue" 
                   stroke="#818cf8" 
                   strokeWidth={4} 
                   fillOpacity={1} 
                   fill="url(#colorAdmin)" 
                 />
                 <Area 
                   type="monotone" 
                   dataKey="signups" 
                   stroke="#22d3ee" 
                   strokeWidth={4} 
                   fillOpacity={0}
                 />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
           <h3 className="text-xl font-black text-slate-900 mb-8 border-b border-slate-100 pb-4">Recent Server Logs</h3>
           <div className="space-y-6">
             {[
               { time: '2m ago', msg: 'New Pro Plan signup: John Doe', type: 'SUCCESS' },
               { time: '14m ago', msg: 'AI Training Job #482 Completed', type: 'INFO' },
               { time: '21m ago', msg: 'System Backup Successful (GCP Asia)', type: 'INFO' },
               { time: '42m ago', msg: 'Database connection delay - Latency spike', type: 'WARN' },
               { time: '1h ago', msg: 'New User Registered: Sarah Ahmed', type: 'SUCCESS' },
             ].map((log, i) => (
               <div key={i} className="flex gap-4">
                  <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${log.type === 'SUCCESS' ? 'bg-emerald-500' : log.type === 'WARN' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                  <div>
                    <p className="text-sm font-bold text-slate-800 leading-tight">{log.msg}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{log.time}</p>
                  </div>
               </div>
             ))}
           </div>
           
           <button className="w-full mt-10 py-4 bg-slate-50 text-slate-500 text-sm font-bold rounded-2xl hover:bg-slate-100 transition-all border border-slate-100">
              View All Global Logs
           </button>
        </div>
      </div>
    </div>
  );
}
