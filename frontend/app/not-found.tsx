"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] p-6 text-center">
      <div className="w-full max-w-lg">
        {/* Stylized 404 Graphic */}
        <div className="relative mb-12 flex justify-center items-center">
          <div className="absolute w-64 h-64 bg-blue-400/20 blur-[80px] rounded-full -z-10" />
          <h1 className="text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-200 to-slate-300 select-none leading-none tracking-tighter mix-blend-multiply">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-white shadow-xl rotate-[-5deg]">
              <span className="font-bold text-slate-900 tracking-widest uppercase text-sm">Target Not Found</span>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Looks like you're lost.</h2>
        <p className="text-slate-500 text-lg mb-8 font-medium">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Link 
          href="/" 
          className="inline-flex items-center justify-center py-4 px-8 rounded-full text-white font-bold transition-all duration-300 bg-slate-900 hover:bg-slate-800 shadow-[0_4px_14px_0_rgba(15,23,42,0.39)] hover:-translate-y-0.5"
        >
          Return to Dashboard
        </Link>
      </div>
    </main>
  );
}
