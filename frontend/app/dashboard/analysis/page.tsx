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
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  LineChart, Line
} from "recharts";

export default function AnalysisPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [insights, setInsights] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("ai_data_result");
    if (!stored) {
      router.push("/dashboard/upload");
      return;
    }
    const parsed = JSON.parse(stored);
    setData(parsed);
    
    // Automatically trigger analysis
    if (parsed.file_id) {
      fetchInsights(parsed.file_id);
    }
  }, [router]);

  const fetchInsights = async (file_id: string) => {
    setIsAnalyzing(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ file_id })
      });
      
      if (!res.ok) {
        throw new Error("Failed to load insights");
      }
      
      const json = await res.json();
      setInsights(json.insights);
    } catch (err: any) {
      setError(err.message || "Failed to generate AI insights.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!data) return null;

  // Derive charts from the basic stats
  // Let's create a generic chart data structure if numeric columns exist
  const firstNumeric = data.numeric_cols?.[0];
  const chartData = data.sample?.map((row: any, i: number) => ({
    name: `Row ${i+1}`,
    value: firstNumeric ? parseFloat(row[firstNumeric]) || 0 : 0
  })) || [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">AI Data Analysis</h1>
        <p className="text-slate-500 font-medium mt-2 max-w-2xl">
          Review parsed data tables, distributions, and high-level AI-generated summaries for <strong className="text-blue-600">{data.filename}</strong>.
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Total Rows</p>
          <h2 className="text-3xl font-black text-slate-900">{data.total_rows?.toLocaleString() || 0}</h2>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Columns</p>
          <h2 className="text-3xl font-black text-slate-900">{data.columns?.length || 0}</h2>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Numeric Cols</p>
          <h2 className="text-3xl font-black text-blue-600">{data.numeric_cols?.length || 0}</h2>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Categorical</p>
          <h2 className="text-3xl font-black text-emerald-600">{data.categorical_cols?.length || 0}</h2>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Charts Section */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <BarChart2 className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Distribution: {firstNumeric || "N/A"}</h3>
          </div>
          
          <div className="h-[300px] w-full">
            {chartData.length > 0 && firstNumeric ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                  <RechartsTooltip 
                    cursor={{fill: '#F1F5F9'}}
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px -5px rgba(0,0,0,0.1)'}}
                  />
                  <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 font-medium">No numeric data to display</div>
            )}
          </div>
        </div>

        {/* AI Insights Section */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-bl-full opacity-50 pointer-events-none" />
          <div className="flex items-center gap-3 mb-6 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Executive AI Summary</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto relative z-10 pr-2">
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4 py-12">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                <p className="font-medium animate-pulse">Groq AI is analyzing your dataset...</p>
              </div>
            ) : error ? (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl flex gap-3">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            ) : insights ? (
              <div className="prose prose-slate prose-sm max-w-none">
                {insights.split('\n').map((line, i) => (
                  <p key={i} className={line.startsWith('-') || line.startsWith('*') ? 'pl-4 border-l-2 border-emerald-200 text-slate-700' : 'text-slate-800'}>
                    {line}
                  </p>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 font-medium py-12">Click 'Analyze' to generate insights.</div>
            )}
          </div>
        </div>
      </div>

      {/* Data Table Preview */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
            <Table2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Data Sample</h3>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">Showing top 10 rows</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-bold">
              <tr>
                {data.columns?.map((col: string, i: number) => (
                  <th key={i} className="px-6 py-4 border-b border-slate-200 whitespace-nowrap">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {data.sample?.map((row: any, i: number) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  {data.columns?.map((col: string, j: number) => (
                    <td key={j} className="px-6 py-4 whitespace-nowrap">{row[col]?.toString() || '-'}</td>
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
