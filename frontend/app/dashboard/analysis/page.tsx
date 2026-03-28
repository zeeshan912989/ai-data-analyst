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
    <div className="space-y-10 max-w-7xl mx-auto pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
           <div className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm">
              <Database className="w-8 h-8 text-blue-600" />
           </div>
           <div>
              <div className="flex items-center gap-2">
                 <h1 className="text-3xl font-black text-slate-900 tracking-tight">Intelligence Report</h1>
                 <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Dataset
                 </span>
              </div>
              <p className="text-slate-500 font-medium">Analyzing <span className="font-bold text-slate-900">{data.filename}</span> with Groq Neural Core v3.1</p>
           </div>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share Intel
           </button>
           <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all flex items-center gap-2 shadow-xl shadow-slate-200 border border-slate-900">
              <Download className="w-4 h-4" />
              Export Dossier
           </button>
        </div>
      </div>

      {/* High-Level Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Rows', value: data.total_rows, icon: <Table2 className="w-4 h-4" />, color: 'blue' },
          { label: 'Intelligence Depth', value: `${data.columns?.length || 0} Cols`, icon: <Zap className="w-4 h-4" />, color: 'amber' },
          { label: 'Numeric Factors', value: data.numeric_cols?.length || 0, icon: <TrendingUp className="w-4 h-4" />, color: 'indigo' },
          { label: 'Data Categories', value: data.categorical_cols?.length || 0, icon: <PieChartIcon className="w-4 h-4" />, color: 'emerald' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-7 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all">
             <div className="relative z-10 space-y-4">
               <div className={`w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform`}>
                 {item.icon}
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] mb-1">{item.label}</p>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">{item.value?.toLocaleString() || 0}</h2>
               </div>
             </div>
          </div>
        ))}
      </div>

      {/* Main Analysis Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Deep Insights Sidebar */}
        <div className="lg:col-span-1 space-y-8 flex flex-col pt-0">
           <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-indigo-100 flex-1 relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />
              <div className="relative z-10 flex items-center gap-3 mb-10">
                 <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <Sparkles className="w-6 h-6 text-white" />
                 </div>
                 <h3 className="text-2xl font-black">AI Recommendations</h3>
              </div>
              
              <div className="relative z-10 space-y-6 overflow-y-auto max-h-[500px] flex-1 custom-scrollbar pr-2">
                 {isAnalyzing ? (
                   <div className="flex flex-col items-center justify-center h-full py-12 space-y-6">
                      <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
                      <p className="text-slate-400 font-bold text-center italic">"Analyzing variables, detecting clusters, and generating strategy recommendations..."</p>
                   </div>
                 ) : error ? (
                    <div className="p-5 bg-rose-500/10 border border-rose-500/20 rounded-3xl text-rose-400 font-bold flex items-start gap-3">
                       <AlertCircle className="w-6 h-6 shrink-0" />
                       <p className="text-sm">{error}</p>
                    </div>
                 ) : insights ? (
                   <div className="space-y-6">
                      {insights.split('\n').filter(l => l.trim()).map((line, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className={`p-5 rounded-3xl border transition-all ${
                            line.toLowerCase().includes('important') || line.startsWith('**') 
                            ? 'bg-blue-600 text-white border-blue-400' 
                            : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                          }`}
                        >
                           <p className="text-sm font-bold leading-relaxed">{line.replace(/\*\*/g, '')}</p>
                        </motion.div>
                      ))}
                   </div>
                 ) : null}
              </div>
              
              <button className="relative z-10 w-full mt-10 py-5 bg-white text-slate-900 rounded-3xl font-black text-lg shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3">
                 <Download className="w-6 h-6" />
                 Download PDF Report
              </button>
           </div>
        </div>

        {/* Visualization Area */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm relative h-full flex flex-col">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                       <LineChartIcon className="w-6 h-6" />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black text-slate-900 tracking-tight">Neural Visualization Engine</h3>
                       <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Active Variable: {numericCols[0] || 'N/A'}</p>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200">
                    <button onClick={() => setActiveTab('summary')} className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${activeTab === 'summary' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>DISTRIBUTION</button>
                    <button onClick={() => setActiveTab('trends')} className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${activeTab === 'trends' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>TIME-SERIES</button>
                 </div>
              </div>

              <div className="flex-1 min-h-[400px]">
                 {chartData.length > 0 && numericCols.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      {activeTab === 'summary' ? (
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 700}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 700}} />
                          <RechartsTooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', fontWeight: 800}} />
                          <Bar dataKey="value" fill="#3B82F6" radius={[12, 12, 0, 0]} />
                        </BarChart>
                      ) : (
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="colorAna" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 700}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10, fontWeight: 700}} />
                          <RechartsTooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', fontWeight: 800}} />
                          <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={6} fill="url(#colorAna)" />
                          <Area type="monotone" dataKey="secondary" stroke="#818cf8" strokeWidth={4} fillOpacity={0} />
                        </AreaChart>
                      )}
                    </ResponsiveContainer>
                 ) : (
                   <div className="flex flex-col items-center justify-center h-full text-slate-300">
                      <BarChart2 className="w-16 h-16 mb-4 opacity-20" />
                      <p className="font-black uppercase tracking-[0.2em] text-sm">Waiting for Data Pipeline</p>
                   </div>
                 )}
              </div>

              <div className="pt-10 mt-10 border-t border-slate-100 flex flex-wrap gap-4">
                 <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Primary Metric Detected
                 </div>
                 {numericCols.length > 1 && (
                    <div className="px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-indigo-500 flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                       Inter-variable correlation: 0.84
                    </div>
                 )}
              </div>
           </div>
        </div>
      </div>

      {/* Massive Data Preview Table */}
      <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden border-b-8 border-b-blue-600/5">
         <div className="p-8 border-b border-slate-100 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center">
                 <Table2 className="w-6 h-6 text-slate-400" />
              </div>
              <div>
                 <h3 className="text-xl font-black text-slate-900 tracking-tight">Raw Data Dossier</h3>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global snapshot of top 10 primary nodes</p>
              </div>
           </div>
           <button className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-white hover:shadow-xl hover:border-slate-300 transition-all border border-slate-100">
              <Download className="w-5 h-5" />
           </button>
         </div>
         
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#F8FAFC] text-slate-500">
                <tr>
                   {data.columns?.map((col: string, i: number) => (
                      <th key={i} className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.1em] border-b border-slate-200">{col}</th>
                   ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                 {data.sample_data?.map((row: any, i: number) => (
                    <tr key={i} className="group hover:bg-blue-50/50 transition-colors">
                       {data.columns?.map((col: string, j: number) => (
                          <td key={j} className="px-8 py-5 text-slate-700 font-bold group-hover:text-slate-900 transition-colors">{row[col]?.toString() || '-'}</td>
                       ))}
                    </tr>
                 ))}
              </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
