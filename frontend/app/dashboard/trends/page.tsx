"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, BarChart2, LineChart, 
  PieChart, Calendar, ChevronRight, 
  Download, Filter, RefreshCw
} from "lucide-react";
import { 
  ResponsiveContainer, AreaChart, Area, 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  BarChart, Bar, Line
} from 'recharts';

const dummyData = [
  { name: 'Jan', revenue: 4000, users: 2400 },
  { name: 'Feb', revenue: 3000, users: 1398 },
  { name: 'Mar', revenue: 2000, users: 9800 },
  { name: 'Apr', revenue: 2780, users: 3908 },
  { name: 'May', revenue: 1890, users: 4800 },
  { name: 'Jun', revenue: 2390, users: 3800 },
  { name: 'Jul', revenue: 3490, users: 4300 },
];

export default function TrendsPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Trends & Reports</h1>
          <p className="text-slate-500 font-medium font-sans">Visual intelligence across your data streams.</p>
        </div>
        <div className="flex items-center gap-3">
           <button 
             onClick={handleRefresh}
             className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2"
           >
             <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-blue-500' : ''}`} />
             Refresh
           </button>
           <button className="px-5 py-2.5 bg-slate-900 border border-slate-900 rounded-xl text-sm font-bold text-white hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-slate-200">
             <Download className="w-4 h-4" />
             Export PDF
           </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Trend Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-blue-500" />
                Revenue Performance
              </h3>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                 <span className="w-2 h-2 rounded-full bg-blue-500" /> Revenue
                 <span className="w-2 h-2 rounded-full bg-indigo-500 ml-2" /> User Growth
              </div>
           </div>
           
           <div className="h-[350px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={dummyData}>
                 <defs>
                   <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                     <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                 <XAxis 
                   dataKey="name" 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 700 }}
                   dy={10}
                 />
                 <YAxis 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 700 }}
                 />
                 <Tooltip 
                   contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontWeight: 700 }}
                 />
                 <Area 
                   type="monotone" 
                   dataKey="revenue" 
                   stroke="#3b82f6" 
                   strokeWidth={4}
                   fillOpacity={1} 
                   fill="url(#colorRev)" 
                 />
                 <Area 
                   type="monotone" 
                   dataKey="users" 
                   stroke="#6366f1" 
                   strokeWidth={4}
                   fillOpacity={0}
                 />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Breakdown Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
           <h3 className="text-xl font-extrabold text-slate-900 mb-8">Category Breakdown</h3>
           <div className="space-y-6">
              {[
                { label: 'Technology', percentage: 72, color: 'bg-blue-500' },
                { label: 'Cloud Services', percentage: 48, color: 'bg-indigo-500' },
                { label: 'Consultancy', percentage: 24, color: 'bg-slate-400' },
                { label: 'Marketing', percentage: 12, color: 'bg-amber-500' },
              ].map((item, idx) => (
                <div key={idx} className="space-y-2">
                   <div className="flex justify-between text-sm font-bold">
                     <span className="text-slate-600">{item.label}</span>
                     <span className="text-slate-900">{item.percentage}%</span>
                   </div>
                   <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percentage}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        className={`h-full rounded-full ${item.color}`}
                      />
                   </div>
                </div>
              ))}
           </div>
           
           <div className="pt-10 mt-10 border-t border-slate-100">
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                 <p className="text-xs font-black uppercase text-blue-600 tracking-widest mb-1">AI Logic Hint</p>
                 <p className="text-sm font-medium text-blue-900 leading-relaxed">
                   "Tech sales are peaking earlier than Q2 last year. Consider inventory restock."
                 </p>
              </div>
           </div>
        </div>
      </div>

      {/* Grid of smaller widgets */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'Customer Retention', value: '94.2%', icon: <TrendingUp className="w-4 h-4" /> },
           { label: 'Avg. Order Value', value: '$124.50', icon: <TrendingUp className="w-4 h-4" /> },
           { label: 'Daily Active Users', value: '1,420', icon: <TrendingUp className="w-4 h-4" /> },
           { label: 'Churn Rate', value: '0.8%', icon: <TrendingUp className="w-4 h-4" /> },
         ].map((widget, i) => (
           <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
             <div className="w-8 h-8 bg-slate-50 rounded-xl flex items-center justify-center mb-4">
                {widget.icon}
             </div>
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{widget.label}</p>
             <p className="text-2xl font-black text-slate-900">{widget.value}</p>
           </div>
         ))}
      </div>
    </div>
  );
}
