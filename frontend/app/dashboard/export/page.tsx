"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Download, FileText, ChevronRight, CheckCircle2, 
  ExternalLink, FileSpreadsheet, FileJson, FileCode,
  ShieldCheck, Clock, Layers, Zap
} from "lucide-react";

const reportTypes = [
  { id: 'summary', name: 'Executive Summary', icon: <FileText className="w-5 h-5 text-blue-500" />, desc: 'High-level business summary for stakeholders.' },
  { id: 'audit', name: 'Compliance Audit', icon: <ShieldCheck className="w-5 h-5 text-indigo-500" />, desc: 'Detailed data validation and audit trails.' },
  { id: 'trends', name: 'Monthly Trend Report', icon: <Clock className="w-5 h-5 text-emerald-500" />, desc: 'Comparative year-on-year growth analysis.' },
  { id: 'deep', name: 'AI Deep Insights', icon: <Zap className="w-5 h-5 text-amber-500" />, desc: 'Neural cluster discoveries and anomaly logs.' }
];

const formats = [
  { id: 'pdf', name: 'PDF Document', icon: <FileText className="w-4 h-4" /> },
  { id: 'excel', name: 'Excel Sheet', icon: <FileSpreadsheet className="w-4 h-4" /> },
  { id: 'json', name: 'JSON API Raw', icon: <FileJson className="w-4 h-4" /> },
  { id: 'csv', name: 'CSV Standard', icon: <FileCode className="w-4 h-4" /> }
];

export default function ExportPage() {
  const [selectedReport, setSelectedReport] = useState('summary');
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [isExporting, setIsExporting] = useState(false);

  const startExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`${selectedReport.toUpperCase()} report generated successfully in ${selectedFormat.toUpperCase()} format!`);
    }, 2500);
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-20 px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Export & Intelligence Reports</h1>
          <p className="text-slate-500 font-medium font-sans">Craft professional exports from your processed data sessions.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200">
          <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white">
             <Download className="w-5 h-5" />
          </div>
          <div className="pr-4">
             <p className="text-xs font-black uppercase text-slate-400 leading-none mb-1">Total Exports</p>
             <p className="text-lg font-black text-slate-900 leading-none">42 Reports</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <div className="space-y-8">
           <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-4">1. Select Intelligence Type</h3>
              <div className="grid gap-4">
                {reportTypes.map((report) => (
                  <button 
                    key={report.id}
                    onClick={() => setSelectedReport(report.id)}
                    className={`flex items-center gap-4 p-5 rounded-2xl border transition-all text-left group ${
                      selectedReport === report.id 
                        ? 'border-blue-500 bg-blue-50 ring-4 ring-blue-50' 
                        : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${selectedReport === report.id ? 'bg-white shadow-sm' : 'bg-slate-100'}`}>
                        {report.icon}
                     </div>
                     <div className="flex-1">
                        <p className={`font-bold transition-colors ${selectedReport === report.id ? 'text-blue-900' : 'text-slate-800'}`}>
                          {report.name}
                        </p>
                        <p className="text-xs text-slate-500 font-medium mt-1">{report.desc}</p>
                     </div>
                     <CheckCircle2 className={`w-5 h-5 transition-opacity ${selectedReport === report.id ? 'text-blue-500 opacity-100' : 'opacity-0'}`} />
                  </button>
                ))}
              </div>
           </div>

           <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
              <h3 className="text-xl font-extrabold text-slate-900 border-b border-slate-100 pb-4">2. Format & Resolution</h3>
              <div className="grid grid-cols-2 gap-4">
                 {formats.map((format) => (
                   <button 
                     key={format.id}
                     onClick={() => setSelectedFormat(format.id)}
                     className={`flex items-center gap-3 p-4 rounded-xl border font-bold text-sm transition-all ${
                       selectedFormat === format.id 
                         ? 'border-slate-900 bg-slate-900 text-white' 
                         : 'border-slate-100 text-slate-500 hover:bg-slate-50'
                     }`}
                   >
                      {format.icon}
                      {format.name}
                   </button>
                 ))}
              </div>
           </div>
        </div>

        {/* Right Preview Card */}
        <div className="space-y-6">
           <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden h-full flex flex-col justify-between shadow-2xl shadow-slate-300 min-h-[500px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px]" />
              
              <div className="relative z-10 space-y-4">
                 <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20">
                    <Layers className="w-8 h-8 text-blue-400" />
                 </div>
                 <h2 className="text-4xl font-black leading-tight tracking-tight">Intelligence Ready for Deployment.</h2>
                 <p className="text-slate-400 font-medium text-lg leading-relaxed">
                   Your {selectedReport} report is being prepared with high-fidelity visualizations. Every chart is optimized for high-resolution print and screen viewing.
                 </p>
              </div>

              <div className="relative z-10 pt-10 mt-10 border-t border-white/10 space-y-6">
                 <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm font-bold">
                       <span className="text-slate-400">Processing Status</span>
                       <span className="text-blue-400">98% Compiled</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: '98%' }}
                         className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                       />
                    </div>
                 </div>

                 <button 
                   onClick={startExport}
                   disabled={isExporting}
                   className="w-full py-5 bg-white text-slate-900 rounded-3xl font-black text-lg hover:bg-slate-100 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
                 >
                    {isExporting ? (
                      <>
                        <RefreshCw className="w-6 h-6 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Download className="w-6 h-6" />
                        Download {selectedFormat.toUpperCase()}
                      </>
                    )}
                 </button>
              </div>
           </div>

           <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex items-center justify-between group cursor-pointer hover:border-blue-500 transition-all">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                    <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                 </div>
                 <div>
                    <p className="text-sm font-bold text-slate-900">Automation Settings</p>
                    <p className="text-xs text-slate-500 font-medium font-sans">Send monthly reports to email automatically.</p>
                 </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900 transition-colors" />
           </div>
        </div>
      </div>
    </div>
  );
}

function RefreshCw(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  )
}
