"use client";

import { useState, useRef } from "react";
import axios from "axios";
import { 
  BarChart3, 
  Upload, 
  Table2, 
  BrainCircuit, 
  MessageSquare, 
  X, 
  ChevronRight, 
  LayoutDashboard, 
  TrendingUp, 
  Zap,
  Download,
  Database,
  Search
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";

const API_BASE = "http://localhost:8000";

const COLORS = ["#3b82f6", "#6366f1", "#10b981", "#f59e0b", "#f43f5e", "#8b5cf6"];

export default function Dashboard() {
  const [file, setFile] = useState<any>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<string | null>(null);
  const [chat, setChat] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("preview");
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${API_BASE}/upload`, formData);
      setFile(res.data);
      setFileId(res.data.file_id);
      setActiveTab("preview");
      // Prompt for initial insights automatically
      handleAnalyze(res.data.file_id);
    } catch (err: any) {
      alert(err.response?.data?.detail || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async (id: string) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/analyze`, { file_id: id });
      setInsights(res.data.insights);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query || !fileId) return;

    setLoading(true);
    const newChat = [...chat, { role: "user", text: query }];
    setChat(newChat);
    setQuery("");

    try {
      const res = await axios.post(`${API_BASE}/ask`, { file_id: fileId, query });
      setChat([...newChat, { role: "ai", text: res.data.answer }]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  };

  const onDrop = (e: any) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 bg-slate-900 border-r border-slate-800 flex flex-col items-center lg:items-stretch py-6 px-4 shrink-0 transition-all">
        <div className="mb-10 lg:px-2 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <Database className="w-6 h-6" />
          </div>
          <span className="hidden lg:block text-xl font-bold tracking-tighter text-white">AI Analyst</span>
        </div>

        <nav className="flex-1 space-y-2">
          <NavItem active icon={<LayoutDashboard />} label="Analyze" />
          <NavItem icon={<TrendingUp />} label="Trends" />
          <NavItem icon={<Table2 />} label="History" />
          <NavItem icon={<Zap />} label="Marketplace" />
        </nav>

        <div className="mt-auto space-y-4 pt-4 border-t border-slate-800">
          <NavItem icon={<Search />} label="Search" />
          <div className="hidden lg:block p-4 rounded-xl bg-slate-800/50 border border-slate-700">
            <p className="text-xs font-bold text-slate-400 mb-2">PRO PLAN</p>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">Upgrade for unlimited data analysis & PDF exports.</p>
            <button className="w-full py-2 bg-blue-600 rounded-lg text-white text-xs font-bold hover:bg-blue-700 transition-all">Upgrade Now</button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
             <h2 className="text-lg font-bold text-slate-800 truncate max-w-xs">{file ? file.filename : "Select Dataset"}</h2>
             {file && <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold border border-emerald-100 flex items-center gap-1"><Zap className="w-2 h-2 fill-emerald-600" /> Active</span>}
          </div>
          <div className="flex items-center gap-4">
             <button className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"><Search className="w-5 h-5" /></button>
             <div className="h-8 w-[1px] bg-slate-200" />
             <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border-2 border-white shadow-sm ring-1 ring-slate-100">AZ</div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-10 space-y-8">
          {!file ? (
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               onDragEnter={onDrag}
               onDragLeave={onDrag}
               onDragOver={onDrag}
               onDrop={onDrop}
               className={`max-w-4xl mx-auto py-24 border-2 border-dashed rounded-[40px] flex flex-col items-center justify-center text-center transition-all cursor-pointer ${dragActive ? 'border-blue-500 bg-blue-50/50 scale-[1.02]' : 'border-slate-300 bg-white'}`}
               onClick={() => fileInputRef.current?.click()}
            >
              <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} accept=".csv,.xlsx,.xls" />
              <div className="p-6 rounded-3xl bg-blue-50 text-blue-600 mb-8 animate-bounce transition-all">
                <Upload className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Upload your dataset</h3>
              <p className="text-slate-500 mb-8 max-w-sm">Drag and drop your CSV or Excel file here. <br />Max 2MB per file.</p>
              <button className="px-10 py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center gap-2">
                Browse Files <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            <>
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label="Total Rows" value={file.total_rows.toLocaleString()} icon={<Table2 />} color="blue" />
                <StatCard label="Columns" value={file.columns.length} icon={<BarChart3 />} color="indigo" />
                <StatCard label="Numeric Fields" value={file.numeric_cols.length} icon={<TrendingUp />} color="emerald" />
                <StatCard label="AI Readiness" value="High" icon={<Zap />} color="amber" />
              </div>

              {/* Main Visualization & AI Area */}
              <div className="grid grid-cols-12 gap-8">
                {/* Visualizations (Left Col) */}
                <div className="col-span-12 xl:col-span-8 space-y-8">
                  <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
                    <div className="flex border-b border-slate-100">
                      <TabButton active={activeTab === "preview"} onClick={() => setActiveTab("preview")} label="Data Preview" />
                      <TabButton active={activeTab === "charts"} onClick={() => setActiveTab("charts")} label="Auto Charts" />
                    </div>
                    
                    <div className="p-6">
                      {activeTab === "preview" && (
                        <div className="overflow-x-auto rounded-xl border border-slate-100">
                          <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 border-b border-slate-100">
                              <tr>
                                {file.columns.map((c: string) => (
                                  <th key={c} className="px-5 py-4 font-bold text-slate-600 whitespace-nowrap">{c}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {file.sample.map((row: any, i: number) => (
                                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                  {file.columns.map((c: string) => (
                                    <td key={`${i}-${c}`} className="px-5 py-4 text-slate-600 truncate max-w-[200px]">{row[c]}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {activeTab === "charts" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[500px]">
                           {file.numeric_cols.length >= 1 ? (
                              <>
                                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                  <h4 className="text-sm font-bold text-slate-600 mb-6 uppercase tracking-wider">Metric Distribution</h4>
                                  <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                      <BarChart data={file.sample}>
                                        <XAxis dataKey={file.columns[0]} hide />
                                        <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                                        <Bar dataKey={file.numeric_cols[0]} fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                      </BarChart>
                                    </ResponsiveContainer>
                                  </div>
                                </div>
                                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                  <h4 className="text-sm font-bold text-slate-600 mb-6 uppercase tracking-wider">Trend Analysis</h4>
                                  <div className="h-[300px] w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                      <LineChart data={file.sample}>
                                        <XAxis dataKey={file.columns[0]} hide />
                                        <Tooltip contentStyle={{borderRadius: '12px'}} />
                                        <Line type="monotone" dataKey={file.numeric_cols[0]} stroke="#6366f1" strokeWidth={3} dot={false}/>
                                      </LineChart>
                                    </ResponsiveContainer>
                                  </div>
                                </div>
                              </>
                           ) : (
                             <div className="col-span-2 flex flex-col items-center justify-center text-slate-400 py-24">
                                <BarChart3 className="w-12 h-12 mb-4 opacity-20" />
                                <p>Not enough numeric data for auto-charts.</p>
                             </div>
                           )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* AI INSIGHTS BOX */}
                  <div className="bg-slate-900 rounded-[32px] p-8 text-white relative shadow-2xl overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                      <BrainCircuit className="w-32 h-32" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
                          <Zap className="w-6 h-6 fill-blue-500" />
                        </div>
                        <h3 className="text-xl font-bold">AI Data Insights</h3>
                      </div>
                      
                      {loading && !insights && (
                        <div className="space-y-4 pt-4">
                          <div className="h-4 w-3/4 bg-slate-800 rounded animate-pulse" />
                          <div className="h-4 w-1/2 bg-slate-800 rounded animate-pulse" />
                          <div className="h-4 w-2/3 bg-slate-800 rounded animate-pulse" />
                        </div>
                      )}

                      {insights && (
                        <article className="prose prose-invert max-w-none text-slate-300 leading-loose">
                           <div dangerouslySetInnerHTML={{ __html: insights.replace(/\n/g, '<br/>') }} />
                        </article>
                      )}
                      
                      {!insights && !loading && (
                        <button onClick={() => handleAnalyze(fileId!)} className="mt-4 px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all flex items-center gap-2">
                          Analyze Dataset
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* AI Chat Widget (Right Col) */}
                <div className="col-span-12 xl:col-span-4 h-full">
                   <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm flex flex-col h-[700px] xl:sticky xl:top-[112px]">
                      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                               <MessageSquare className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-slate-800">Ask Your Data</h3>
                         </div>
                         <button className="text-slate-400 hover:text-red-500 transition-colors" onClick={() => setChat([])}><X className="w-4 h-4" /></button>
                      </div>

                      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
                         {chat.length === 0 && (
                            <div className="text-center py-12 px-4 opacity-50">
                               <MessageSquare className="w-10 h-10 mx-auto mb-4 text-slate-400" />
                               <p className="text-sm font-medium italic">Example: "What are the top 3 trends in this data?"</p>
                            </div>
                         )}
                         {chat.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                               <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'}`}>
                                  {msg.text}
                               </div>
                            </div>
                         ))}
                         {loading && (
                            <div className="flex justify-start">
                               <div className="bg-white border border-slate-100 p-4 rounded-2xl flex gap-1">
                                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                                  <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                               </div>
                            </div>
                         )}
                      </div>

                      <div className="p-6 bg-white border-t border-slate-100">
                         <form onSubmit={handleAsk} className="relative">
                            <input 
                               value={query}
                               onChange={(e) => setQuery(e.target.value)}
                               placeholder="Ask anything about the file..." 
                               className="w-full pl-5 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                            />
                            <button className="absolute right-2 top-2 p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center shadow-lg shadow-blue-600/20">
                               <ChevronRight className="w-5 h-5 font-bold" />
                            </button>
                         </form>
                      </div>
                   </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

// Helper Components
function NavItem({ icon, label, active = false }: any) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all group ${active ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
      <span className="shrink-0">{icon}</span>
      <span className="hidden lg:block text-sm font-semibold">{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white hidden lg:block" />}
    </div>
  );
}

function StatCard({ label, value, icon, color }: any) {
  const colors: any = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
  };

  return (
    <div className="bg-white p-6 rounded-[28px] border border-slate-200 shadow-sm hover:translate-y-[-2px] transition-all">
      <div className={`p-3 rounded-xl w-fit mb-4 border ${colors[color]}`}>
        {icon}
      </div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <h4 className="text-2xl font-black text-slate-900 tracking-tight">{value}</h4>
    </div>
  );
}

function TabButton({ active, label, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`px-8 py-4 text-sm font-bold border-b-2 transition-all ${active ? 'border-blue-600 text-blue-600 bg-blue-50/10' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>
      {label}
    </button>
  );
}
