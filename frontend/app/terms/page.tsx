"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-20 flex flex-col bg-slate-50">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-6 py-20 max-w-4xl">
        <div className="bg-white p-10 md:p-16 rounded-[40px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-100/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 -z-10" />
          
          <div className="mb-12 border-b border-slate-100 pb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Terms of Service</h1>
            <p className="text-slate-500 font-medium">Last updated: <span className="text-slate-900">March 27, 2026</span></p>
          </div>

          <article className="max-w-none text-slate-600 space-y-8 text-lg">
            <section>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">1. Agreement to Terms</h3>
              <p className="leading-relaxed">By accessing or using AI Analyst ("the Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the Service.</p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">2. Acceptable Use</h3>
              <p className="leading-relaxed mb-4">You agree not to use the Service to:</p>
              <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                <li>Upload malicious code, viruses, or destructive data algorithms.</li>
                <li>Attempt to reverse-engineer the AI inference protocols.</li>
                <li>Analyze data that legally belongs to a third party without explicitly granted authorization.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">3. Intellectual Property</h3>
              <p className="leading-relaxed">The Service and its original content, features, analytical models, and UI design are and will remain the exclusive property of AI Analyst and its licensors. <strong className="font-bold text-slate-900">However, any insights, charts, and reports generated from your own uploaded data are completely owned by you.</strong></p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">4. Subscription and Billing</h3>
              <p className="leading-relaxed">Premium features require a paid subscription. You authorize us to charge your payment method for chosen subscription plans. Cancellations take effect at the end of the current billing cycle. Refunds are provided solely at our discretion within 7 days of initial purchase.</p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">5. Limitation of Liability</h3>
              <p className="leading-relaxed">While our AI is highly accurate, you understand that LLM-generated insights can occasionally hallucinate or misinterpret complex statistical bounds. Always double-check mission-critical financial or legal data manually. We are not liable for business losses incurred due to automated data misinterpretations.</p>
            </section>
          </article>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
