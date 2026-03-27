"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function PolicyPage() {
  return (
    <main className="min-h-screen pt-20 flex flex-col bg-slate-50">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-6 py-20 max-w-4xl">
        <div className="bg-white p-10 md:p-16 rounded-[40px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-100/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 -z-10" />
          
          <div className="mb-12 border-b border-slate-100 pb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">Privacy Policy</h1>
            <p className="text-slate-500 font-medium">Last updated: <span className="text-slate-900">March 27, 2026</span></p>
          </div>

          <article className="max-w-none text-slate-600 space-y-8 text-lg">
            <section>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h3>
              <p className="leading-relaxed">Welcome to AI Analyst. We respect your privacy and are committed to protecting your personal data and the proprietary datasets you upload to our platform. This statement explains how we collect, use, and process your information.</p>
            </section>
            <section>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">2. Data Uploads and Security</h3>
              <p className="leading-relaxed">When you upload CSV or Excel files, they are securely processed in isolated memory environments. We <strong className="font-bold text-slate-900">do not</strong> use your data to train our global Large Language Models. Datasets are automatically purged from our servers once your active session closes or within 24 hours of inactivity.</p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">3. Information We Collect</h3>
              <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                <li><strong className="font-bold text-slate-900">Account Data:</strong> Name, email address, password hash, and billing details via Stripe.</li>
                <li><strong className="font-bold text-slate-900">Usage Data:</strong> Anonymized interaction logs with the chat interface to improve software functionality.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">4. Third-Party Services</h3>
              <p className="leading-relaxed">We leverage industry-leading services including Vercel for hosting, Supabase for authentication, and Groq for blazing-fast inference. Our third-party partners are strictly bound by data processing agreements (DPA) to ensure the confidentiality of your queries.</p>
            </section>

            <section>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">5. Contact Us</h3>
              <p className="leading-relaxed">If you have questions regarding this Privacy Policy or your data rights (GDPR/CCPA), please contact us at <strong className="font-bold text-slate-900">privacy@aianalyst.com</strong>.</p>
            </section>
          </article>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
