"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How does the AI analyze my data?",
    answer: "Our system uses advanced Large Language Models (LLMs) combined with optimized data processing scripts (like Pandas in Python) to understand the semantic meaning of your columns, compute statistics, generate charts, and answer natural language questions about the trends within your specific CSV/Excel files."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We do not use your proprietary uploaded data to train our foundational models. Files are processed securely in isolated containers, and raw data is deleted according to our rigorous data retention policies shortly after your session terminates."
  },
  {
    question: "What file formats do you support?",
    answer: "Currently, we support standard CSV files and Microsoft Excel (.xlsx, .xls) files up to 50MB on our Pro plans. We are working on direct database integrations (PostgreSQL, MySQL, Snowflake) for future releases."
  },
  {
    question: "Do I need to know SQL or Python?",
    answer: "No! That's the magic. You just type questions like 'What was our most profitable region last quarter?' into the chat bar, and our AI does all the heavy lifting, automatically writing the code, executing it, and charting the results."
  },
  {
    question: "Can I export the generated charts and reports?",
    answer: "Yes, all charts can be downloaded as PNG, SVG, or embedded directly into your presentations. You can also export the structured text insights as PDF reports."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="min-h-screen pt-20 flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-6 py-24 max-w-4xl relative">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full h-[300px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Questions</span>
          </h1>
          <p className="text-xl text-slate-500">
            Everything you need to know about AI Analyst and billing.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={index}
              className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="text-lg font-bold text-slate-800">{faq.question}</span>
                <div className={`p-2 rounded-full transition-colors ${openIndex === index ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                  {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100/50 mt-2">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
