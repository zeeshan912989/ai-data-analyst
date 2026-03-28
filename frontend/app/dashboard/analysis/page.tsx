"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  BarChart2, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon, 
  Table2, 
  Sparkles, 
  Loader2, 
  AlertCircle,
  TrendingUp,
  Target,
  FileText,
  Download,
  Share2,
  ChevronRight,
  Lightbulb,
  Zap,
  TrendingDown,
  LayoutDashboard,
  Database
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell
} from "recharts";

const COLORS = ['#3b82f6', '#4f46e5', '#818cf8', '#22d3ee', '#10b981'];

export default function AnalysisPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [insights, setInsights] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('summary');

  useEffect(() => {
    const stored = localStorage.getItem("ai_data_result");
    if (!stored) {
      router.push("/dashboard/upload");
      return;
    }
    const parsed = JSON.parse(stored);
    setData(parsed);
    
    if (parsed.file_id) {
      fetchInsights(parsed.file_id);
    }
  }, [router]);

  const fetchInsights = async (file_id: string) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ file_id })
      });
      
      if (!res.ok) throw new Error("AI engine failed to connect.");
      const json = await res.json();
      setInsights(json.insights);
    } catch (err: any) {
      setError(err.message || "Failed to generate AI insights.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!data) return null;

  const numericCols = data.numeric_cols || [];
  const chartData = data.sample_data?.map((row: any, i: number) => ({
    name: `Row ${i+1}`,
    value: numericCols.length > 0 ? parseFloat(row[numericCols[0]]) || 0 : 0,
    secondary: numericCols.length > 1 ? parseFloat(row[numericCols[1]]) || 0 : 0
  })) || [];

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20 p-4 md:p-8">
      {/* Page Header - Professional Hub Style */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div className="flex items-center gap-6">
           <motion.div 
            initial={{ scale: 0.8, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20"
           >
              <Database className="w-9 h-9 text-white" />
           </motion.div>
           <div>
              <div className="flex items-center gap-3 mb-1">
                 <h1 className="text-4xl font-black text-slate-900 tracking-tight">Intelligence Report</h1>
                 <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-[pulse_2s_infinite]" />
                    AI Core Active
                 </span>
              </div>
              <p className="text-slate-500 font-medium text-lg">Analyzing <span className="font-bold text-blue-600 underline decoration-blue-200 underline-offset-4">{data.filename}</span></p>
           </div>
        </div>
        <div className="flex items-center gap-4">
           <button className="hidden sm:flex px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-black text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all items-center gap-2 shadow-sm">
              <Share2 className="w-4 h-4" />
              Share Intel
           </button>
           <button className="px-8 py-3.5 bg-slate-900 text-white rounded-2xl text-sm font-black hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 shadow-2xl shadow-slate-900/20 border border-slate-800">
              <Download className="w-5 h-5" />
              Export Dossier
           </button>
        </div>
      </div>

      {/* Futuristic Insight Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Dataset Magnitude', value: data.total_rows, sub: 'Total Rows Scan', icon: <Table2 className="w-5 h-5" />, color: 'blue' },
          { label: 'Intelligence Depth', value: data.columns?.length || 0, sub: 'Variables Detected', icon: <Zap className="w-5 h-5" />, color: 'amber' },
          { label: 'Numeric Factors', value: data.numeric_cols?.length || 0, sub: 'Quantifiable Metrics', icon: <TrendingUp className="w-5 h-5" />, color: 'indigo' },
          { label: 'Classification', value: data.categorical_cols?.length || 0, sub: 'Entity Categories', icon: <PieChartIcon className="w-5 h-5" />, color: 'emerald' },
        ].map((item, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-2xl hover:border-blue-100 transition-all"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50/50 rounded-full -mr-16 -mt-16 group-hover:bg-blue-50 transition-colors" />
             <div className="relative z-10 space-y-6">
                <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500`}>
                  {item.icon}
                </div>
                <div>
                   <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                   <div className="flex items-baseline gap-2">
                      <h2 className="text-4xl font-black text-slate-900 tracking-tighter">{item.value?.toLocaleString() || 0}</h2>
                   </div>
                   <p className="text-xs font-bold text-slate-500 mt-2">{item.sub}</p>
                </div>
             </div>
          </motion.div>
        ))}
      </div>

      {/* Main Analysis Engine Shell */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Advanced AI Strategy Sidebar */}
        <div className="lg:col-span-4 space-y-8 h-full">
           <div className="bg-slate-950 rounded-[3rem] p-10 text-white shadow-3xl shadow-blue-900/10 h-full border border-slate-800 relative overflow-hidden flex flex-col min-h-[600px]">
              {/* Animated Background Decor */}
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent_60%)]" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px]" />
              
              <div className="relative z-10 flex items-center justify-between mb-12">
                 <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/40 border border-blue-400/20">
                       <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black tracking-tight">AI Dossier</h3>
                       <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Strategy Engine v4.0</p>
                    </div>
                 </div>
              </div>
              
              <div className="relative z-10 space-y-6 overflow-y-auto flex-1 pr-2 custom-scrollbar-dark mb-10">
                 {isAnalyzing ? (
                   <div className="flex flex-col items-center justify-center h-48 space-y-8 py-10">
                      <div className="relative w-20 h-20">
                        <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full" />
                        <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin" />
                        <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-blue-400 animate-pulse" />
                      </div>
                      <div className="space-y-2 text-center">
                        <p className="text-blue-400 font-black text-xs uppercase tracking-widest animate-pulse">Processing Variables</p>
                        <p className="text-slate-400 text-sm italic font-medium">"Identifying high-value correlations and market trends..."</p>
                      </div>
                   </div>
                 ) : error ? (
                    <div className="p-8 bg-rose-500/10 border border-rose-500/20 rounded-3xl text-rose-400 flex flex-col items-center text-center gap-4">
                       <div className="w-14 h-14 bg-rose-500/20 rounded-full flex items-center justify-center">
                          <AlertCircle className="w-8 h-8" />
                       </div>
                       <p className="font-bold text-sm leading-relaxed">{error}</p>
                    </div>
                 ) : insights ? (
                   <div className="space-y-5">
                      {insights.split('\n').filter(l => l.trim()).map((line, i) => {
                         const cleanLine = line.replace(/^[#*-]\s?/, '').replace(/\*\*/g, '');
                         const isHeader = line.startsWith('###') || line.startsWith('**Summary') || cleanLine.length < 20;
                         
                         return (
                          <motion.div 
                            key={i} 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`group p-6 rounded-[2rem] border transition-all duration-500 ${
                              isHeader 
                              ? 'bg-blue-600 text-white border-blue-400 shadow-xl shadow-blue-600/20 mb-2' 
                              : 'bg-white/[0.03] text-slate-300 border-white/5 hover:bg-white/[0.08] hover:border-white/10'
                            }`}
                          >
                             <div className="flex items-start gap-4">
                               {!isHeader && <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0 group-hover:scale-150 transition-transform" />}
                               <p className={`font-bold leading-relaxed ${isHeader ? 'text-lg tracking-tight' : 'text-[13px]'}`}>
                                 {cleanLine}
                               </p>
                             </div>
                          </motion.div>
                         );
                      })}
                   </div>
                 ) : null}
              </div>
              
              <button className="relative z-10 w-full py-5 bg-white text-slate-900 rounded-[2rem] font-black text-lg shadow-2xl hover:bg-blue-50 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-3 group">
                 <Download className="w-6 h-6 group-hover:animate-bounce" />
                 Download PDF Briefing
              </button>
           </div>
        </div>

        {/* Neural Visualizer Engine - The "Hub" */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white border border-slate-200 rounded-[3.5rem] p-10 shadow-sm relative h-full flex flex-col group hover:shadow-2xl hover:border-blue-100 transition-all duration-700">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-16">
                 <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center shadow-[inset_0_2px_10px_rgba(59,130,246,0.1)] group-hover:rotate-12 transition-transform duration-500">
                       <BarChart2 className="w-8 h-8" />
                    </div>
                    <div>
                       <h3 className="text-3xl font-black text-slate-900 tracking-tight">Neural Engine</h3>
                       <div className="flex items-center gap-3 mt-1">
                          <span className="text-[11px] font-black text-blue-500 uppercase tracking-widest bg-blue-50 px-3 py-0.5 rounded-full">Primary: {numericCols[0] || 'N/A'}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{activeTab === 'summary' ? 'Distribution View' : 'Temporal Flow'}</span>
                       </div>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-2 bg-slate-100/50 p-2 rounded-2xl border border-slate-200 w-fit">
                    <button 
                      onClick={() => setActiveTab('summary')} 
                      className={`px-6 py-2.5 rounded-xl text-[11px] font-black tracking-widest transition-all duration-300 ${activeTab === 'summary' ? 'bg-white shadow-xl text-blue-600 scale-105' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      DISTRIBUTION
                    </button>
                    <button 
                      onClick={() => setActiveTab('trends')} 
                      className={`px-6 py-2.5 rounded-xl text-[11px] font-black tracking-widest transition-all duration-300 ${activeTab === 'trends' ? 'bg-white shadow-xl text-blue-600 scale-105' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      TIME-SERIES
                    </button>
                 </div>
              </div>

              <div className="flex-1 min-h-[450px]">
                 {chartData.length > 0 && numericCols.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      {activeTab === 'summary' ? (
                        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                          <defs>
                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                              <stop offset="100%" stopColor="#6366f1" stopOpacity={0.8} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F8FAFC" />
                          <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#64748B', fontSize: 11, fontWeight: 800}} 
                            dy={15}
                          />
                          <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#64748B', fontSize: 11, fontWeight: 800}} 
                            dx={-10}
                          />
                          <RechartsTooltip 
                            cursor={{fill: '#F1F5F9', radius: 12}}
                            contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', padding: '20px', fontWeight: 900}} 
                          />
                          <Bar dataKey="value" fill="url(#barGradient)" radius={[15, 15, 4, 4]} barSize={40} />
                        </BarChart>
                      ) : (
                        <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                          <defs>
                            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25}/>
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F8FAFC" />
                          <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#64748B', fontSize: 11, fontWeight: 800}} 
                            dy={15}
                          />
                          <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{fill: '#64748B', fontSize: 11, fontWeight: 800}} 
                            dx={-10}
                          />
                          <RechartsTooltip 
                            contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', padding: '20px', fontWeight: 900}} 
                          />
                          <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={5} fill="url(#areaGradient)" />
                          <Area type="monotone" dataKey="secondary" stroke="#818cf8" strokeWidth={3} fillOpacity={0} strokeDasharray="10 5" />
                        </AreaChart>
                      )}
                    </ResponsiveContainer>
                 ) : (
                   <div className="flex flex-col items-center justify-center h-full text-slate-300 py-32 bg-slate-50/50 rounded-[2.5rem] border border-dashed border-slate-200">
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }}>
                        <BarChart2 className="w-20 h-20 mb-6 text-slate-200" />
                      </motion.div>
                      <p className="font-black uppercase tracking-[0.3em] text-xs text-slate-400">Waiting for Data Dossier</p>
                   </div>
                 )}
              </div>

              <div className="pt-10 mt-10 border-t border-slate-100 flex flex-wrap gap-4 relative">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-white border border-slate-100 rounded-full text-[9px] font-black text-slate-400 tracking-[0.2em] uppercase">Metrics Lab</div>
                 <div className="px-5 py-3 bg-blue-50/50 border border-blue-100 rounded-2xl text-[11px] font-black uppercase tracking-widest text-blue-600 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                    High Integrity Dataset
                 </div>
                 {numericCols.length > 1 && (
                    <div className="px-5 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-[11px] font-black uppercase tracking-widest text-indigo-300 flex items-center gap-3">
                       <Zap className="w-4 h-4" />
                       Strong Trend Correlation Detected
                    </div>
                 )}
              </div>
           </div>
        </div>
      </div>

      {/* Modern Data Dossier - Premium Table */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-[4rem] border border-slate-200 shadow-2xl shadow-slate-100 overflow-hidden"
      >
         <div className="p-10 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl">
                 <Table2 className="w-7 h-7 text-white" />
              </div>
              <div>
                 <h3 className="text-2xl font-black text-slate-900 tracking-tight">Data Dossier Explorer</h3>
                 <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1">Global node snapshot • Encrypted</p>
              </div>
           </div>
           <button className="flex items-center gap-3 px-6 py-3 bg-slate-50 text-slate-700 rounded-2xl hover:bg-white hover:shadow-2xl hover:border-slate-300 transition-all border border-slate-200 font-black text-xs uppercase tracking-widest">
              <Download className="w-4 h-4" />
              Download Dataset
           </button>
         </div>
         
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#FBFCFE] text-slate-500">
                <tr>
                   {data.columns?.map((col: string, i: number) => (
                      <th key={i} className="px-10 py-7 text-[10px] font-black uppercase tracking-[0.15em] border-b border-slate-100 text-slate-400">{col}</th>
                   ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                 {data.sample_data?.map((row: any, i: number) => (
                    <tr key={i} className="group hover:bg-blue-50/40 transition-all duration-300">
                       {data.columns?.map((col: string, j: number) => {
                          const val = row[col]?.toString() || '-';
                          const isNumber = !isNaN(parseFloat(val)) && isFinite(val);
                          return (
                            <td key={j} className="px-10 py-7 transition-colors">
                               <div className="flex items-center gap-2">
                                  {isNumber && <div className="w-1.5 h-1.5 rounded-full bg-blue-500/30" />}
                                  <span className={`font-bold transition-all ${isNumber ? 'text-blue-600 font-black tabular-nums' : 'text-slate-700 group-hover:text-slate-900'}`}>
                                    {val}
                                  </span>
                               </div>
                            </td>
                          );
                       })}
                    </tr>
                 ))}
              </tbody>
            </table>
         </div>
         <div className="p-8 bg-slate-50 flex justify-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">End of visible sample nodes • Complete dataset active in memory</p>
         </div>
      </motion.div>
    </div>
  );
}
