"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, FileText, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function UploadDataPage() {
  const router = useRouter();
  const [isDragActive, setIsDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (f: File) => {
    setError(null);
    const validTypes = ["text/csv", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
    if (!validTypes.includes(f.type) && !f.name.endsWith('.csv') && !f.name.endsWith('.xlsx')) {
      setError("Please upload a valid CSV or Excel file.");
      return;
    }
    if (f.size > 2 * 1024 * 1024) {
      setError("File exceeds 2MB max size limits.");
      return;
    }
    setFile(f);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleProcessFile = async () => {
    if (!file) return;
    
    setIsUploading(true);
    setError(null);
    
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/upload`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Upload failed");
      }

      const data = await res.json();
      localStorage.setItem("ai_data_result", JSON.stringify(data));
      router.push("/dashboard/analysis");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during upload.");
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Upload Dataset</h1>
        <p className="text-slate-500 font-medium mt-2 max-w-2xl">
          Securely submit your CSV or Excel files (up to 2MB) for immediate AI-powered processing and analysis.
        </p>
      </div>
      
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8 pb-12">
        <div 
          onClick={handleUploadClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-3xl flex flex-col items-center justify-center p-12 transition-all cursor-pointer min-h-[350px] relative overflow-hidden group
            ${isDragActive ? "border-blue-500 bg-blue-50 scale-[1.01]" : "border-slate-300 hover:border-slate-400 hover:bg-slate-50"}
            ${file && !isDragActive ? "border-emerald-500 bg-emerald-50/30 hover:border-emerald-600 hover:bg-emerald-50" : ""}
          `}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleChange} 
            accept=".csv, .xlsx, .xls" 
            className="hidden" 
          />
          
          <AnimatePresence mode="wait">
            {!file ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-inner">
                  <Upload className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Drag & drop your file here</h3>
                <p className="text-slate-500 font-medium mb-6">or click to browse from your computer</p>
                <div className="flex items-center justify-center gap-4 text-xs font-bold text-slate-400">
                  <span className="px-3 py-1 bg-slate-100 rounded-full">CSV</span>
                  <span className="px-3 py-1 bg-slate-100 rounded-full">XLSX</span>
                  <span className="px-3 py-1 bg-slate-100 rounded-full">Max 2MB</span>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="file"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center w-full max-w-md relative z-10"
              >
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner relative">
                  <FileText className="w-10 h-10" />
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1 truncate px-4">{file.name}</h3>
                <p className="text-slate-500 font-medium mb-8">{(file.size / 1024).toFixed(1)} KB • Ready to process</p>
                
                <div className="flex gap-4 justify-center">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                    className="px-6 py-3 rounded-xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-red-500 transition-colors shadow-sm"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleProcessFile(); }}
                    disabled={isUploading}
                    className="px-8 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Analyzing via AI...
                      </>
                    ) : (
                      <>Generate Insights</>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3 font-medium"
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
