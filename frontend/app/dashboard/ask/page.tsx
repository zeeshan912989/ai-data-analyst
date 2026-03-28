"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare, Send, ArrowUp, Bot, User as UserIcon, Loader2, Sparkles, Database } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "ai";
  content: string;
}

export default function AskAIPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("ai_data_result");
    if (!stored) {
      router.push("/dashboard/upload");
      return;
    }
    setData(JSON.parse(stored));
    
    // Initial welcome message
    setMessages([{
      role: "ai",
      content: "Hello! I've analyzed your dataset. What would you like to know about it? You can ask me questions like 'What is the highest value in sales?' or 'Are there any anomalies?'"
    }]);
  }, [router]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAsk = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim() || !data?.file_id || isLoading) return;

    const userMessage = query.trim();
    setQuery("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ file_id: data.file_id, query: userMessage })
      });

      if (!res.ok) throw new Error("API error");
      
      const json = await res.json();
      setMessages(prev => [...prev, { role: "ai", content: json.answer }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "ai", content: "Sorry, I encountered an error trying to analyze that for you. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  if (!data) return null;

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
      <div className="shrink-0 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            Ask AI <Sparkles className="w-6 h-6 text-blue-500" />
          </h1>
          <p className="text-slate-500 font-medium mt-1">Chat directly with <span className="text-blue-600 font-bold">{data.filename}</span></p>
        </div>
        
        <div className="hidden md:flex bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm items-center gap-3">
          <Database className="w-5 h-5 text-slate-400" />
          <div className="text-sm">
            <span className="text-slate-500 font-medium">Dataset ready • </span>
            <span className="font-bold text-slate-900">{data.total_rows?.toLocaleString() || 0} rows</span>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-white border border-slate-200 rounded-[2rem] shadow-sm flex flex-col overflow-hidden">
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 bg-slate-50/50">
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 max-w-3xl ${m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                <div className={`w-10 h-10 shrink-0 rounded-2xl flex items-center justify-center shadow-sm ${
                  m.role === "user" ? "bg-slate-900 text-white" : "bg-gradient-to-tr from-blue-600 to-indigo-600 text-white"
                }`}>
                  {m.role === "user" ? <UserIcon className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                
                <div className={`p-5 rounded-3xl text-[15px] leading-relaxed shadow-sm ${
                  m.role === "user" 
                    ? "bg-slate-900 text-white rounded-tr-sm" 
                    : "bg-white border border-slate-100 text-slate-800 rounded-tl-sm"
                }`}>
                  {m.content.split('\n').map((line, j) => (
                    <span key={j} className="block min-h-[1rem]">
                      {line}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 max-w-3xl mr-auto"
              >
                <div className="w-10 h-10 shrink-0 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="p-5 rounded-3xl bg-white border border-slate-100 rounded-tl-sm flex items-center gap-2 shadow-sm">
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Box */}
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="max-w-4xl mx-auto relative group">
            <textarea
              disabled={isLoading}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message AI Data Analyst... (Shift+Enter for new line)"
              className="w-full bg-slate-50 border border-slate-200 rounded-[1.5rem] pl-6 pr-16 py-4 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 resize-none h-[64px] min-h-[64px] max-h-[200px] transition-all text-[15px]"
              rows={1}
            />
            <button 
              onClick={handleAsk}
              disabled={!query.trim() || isLoading}
              className={`absolute right-2 top-2 p-3 rounded-xl flex items-center justify-center transition-all ${
                query.trim() && !isLoading
                  ? "bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:scale-105" 
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
            >
              <ArrowUp className="w-5 h-5" strokeWidth={3} />
            </button>
          </div>
          <div className="text-center mt-3 text-xs font-medium text-slate-400">
            AI can make mistakes. Consider verifying important data.
          </div>
        </div>
      </div>
    </div>
  );
}
