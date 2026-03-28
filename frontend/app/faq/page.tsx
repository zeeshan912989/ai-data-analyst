"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { ChevronDown, HelpCircle, Zap, CreditCard, ShieldCheck, BarChart3, Upload, MessageSquareText } from "lucide-react";
import { useState } from "react";

const faqCategories = [
  {
    category: "Getting Started",
    icon: <Zap className="w-5 h-5" />,
    questions: [
      {
        q: "What is DataMind AI?",
        a: "DataMind AI is an AI-powered data analysis SaaS platform. You can upload CSV or Excel files and instantly receive intelligent insights, automated charts, trend detection, and actionable strategy recommendations — all powered by advanced Large Language Models (LLMs)."
      },
      {
        q: "Do I need technical knowledge to use it?",
        a: "Absolutely not. DataMind AI is designed for non-technical business users. Just upload your spreadsheet and the AI handles everything — no SQL, no coding, no formulas required."
      },
      {
        q: "What file formats are supported?",
        a: "We currently support CSV (.csv), Excel (.xlsx, .xls) file formats. Support for Google Sheets integration and JSON is coming soon."
      },
      {
        q: "Is there a free plan available?",
        a: "Yes! Our Free Starter plan gives you 5 analyses per month with basic AI insights. It's perfect for testing the platform before committing to a paid plan."
      }
    ]
  },
  {
    category: "Billing & Payments",
    icon: <CreditCard className="w-5 h-5" />,
    questions: [
      {
        q: "How do payments work?",
        a: "All payments are processed securely through Paddle.com, our Merchant of Record. Paddle handles billing, invoicing, sales tax, and VAT compliance. We never see or store your credit card details."
      },
      {
        q: "Can I cancel my subscription anytime?",
        a: "Yes, you can cancel at any time from your Dashboard → Billing page. You'll retain access to your plan until the end of your current billing cycle. No locks, no penalties."
      },
      {
        q: "Do you offer refunds?",
        a: "We provide a 14-day money-back guarantee from the date of initial purchase. If you're not satisfied, contact support@datamind.ai within 14 days for a full refund. After 14 days, refunds are evaluated case-by-case."
      },
      {
        q: "What currencies do you accept?",
        a: "All prices are in USD. However, Paddle supports payments in most major currencies and converts automatically based on your location. Local taxes are calculated and applied during checkout."
      }
    ]
  },
  {
    category: "Data & Privacy",
    icon: <ShieldCheck className="w-5 h-5" />,
    questions: [
      {
        q: "Is my uploaded data secure?",
        a: "Yes. Your data is encrypted in transit (TLS 1.3) and processed in ephemeral memory. We do NOT store your raw data long-term. Uploaded files are automatically deleted within 24 hours of processing."
      },
      {
        q: "Do you sell or share my data?",
        a: "Never. We do not sell, share, or distribute your data to any third parties. Your data is yours and is used solely to generate your analysis results."
      },
      {
        q: "Are you GDPR compliant?",
        a: "Yes. We are fully GDPR compliant. EU users can request access to, rectification of, or deletion of their personal data at any time. Contact privacy@datamind.ai for data requests."
      }
    ]
  },
  {
    category: "Features & AI",
    icon: <BarChart3 className="w-5 h-5" />,
    questions: [
      {
        q: "Which AI model powers the analysis?",
        a: "We use Groq-hosted Llama 3.3 70B, one of the most advanced open-source LLMs available. This ensures fast, accurate, and nuanced analysis of your business data."
      },
      {
        q: "Can I ask questions about my data in plain English?",
        a: "Yes! The AI Chat (Q&A) feature lets you type natural language questions like 'What was my best month?' or 'Find outliers in sales data' and get instant, data-backed answers."
      },
      {
        q: "Can I export reports as PDF?",
        a: "Yes. Professional PDF reports can be generated with one click from the Export page. Reports include charts, insights, and recommendations — ready for board meetings or client presentations."
      },
      {
        q: "What does the Multi-Business feature do?",
        a: "Enterprise users can create multiple Business Workspaces within a single account. This allows you to separate datasets by business unit (e.g., Retail Division vs. SaaS Division) for cleaner analysis and access control."
      }
    ]
  }
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-7 px-2 text-left group"
      >
        <span className={`font-bold text-lg transition-colors ${isOpen ? 'text-blue-600' : 'text-slate-900 group-hover:text-blue-600'}`}>{q}</span>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ml-4 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 pb-8' : 'max-h-0'}`}>
        <p className="text-slate-600 font-medium leading-relaxed px-2 text-[15px]">{a}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-44 pb-20 text-center relative overflow-hidden px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-blue-100/20 blur-[120px] rounded-full -z-10" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <span className="px-5 py-2 rounded-full bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest border border-blue-100 mb-8 inline-block">
            Support Centre
          </span>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tight leading-none mb-8">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about DataMind AI. If you can't find the answer here, our team is just a message away.
          </p>
        </motion.div>
      </section>

      {/* FAQ Categories */}
      <section className="pb-32 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {faqCategories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden hover:shadow-xl transition-all"
            >
              {/* Category Header */}
              <div className="px-10 pt-10 pb-6 flex items-center gap-4 border-b border-slate-100">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100">
                  {cat.icon}
                </div>
                <h2 className="text-2xl font-black text-slate-900">{cat.category}</h2>
              </div>

              {/* Questions */}
              <div className="px-10">
                {cat.questions.map((faq, j) => (
                  <FAQItem key={j} q={faq.q} a={faq.a} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="pb-32 px-6">
        <div className="max-w-4xl mx-auto bg-slate-900 rounded-[3rem] p-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
          <div className="relative z-10">
            <HelpCircle className="w-16 h-16 text-blue-400 mx-auto mb-8" />
            <h3 className="text-3xl font-black mb-4">Cannot find the answer?</h3>
            <p className="text-slate-400 font-medium mb-10 max-w-lg mx-auto">Our data strategy team is available 24/7 to help with Enterprise onboarding, API integration, and custom analysis pipelines.</p>
            <a href="/contact" className="inline-block px-10 py-5 bg-white text-slate-900 rounded-2xl font-black hover:bg-slate-100 shadow-2xl transition-all active:scale-95">Contact Support</a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
