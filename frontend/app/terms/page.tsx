"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { ShieldCheck, FileText, CreditCard, AlertTriangle, Scale, Globe, Clock, Mail } from "lucide-react";

const sections = [
  {
    icon: <FileText className="w-5 h-5" />,
    title: "1. Acceptance of Terms",
    content: `By accessing or using DataMind AI ("the Service"), operated by DataMind AI Inc. ("Company", "we", "us"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you must not use the Service. These Terms apply to all visitors, users, and others who access or use the Service. By using the Service, you represent that you are at least 18 years of age and have the legal capacity to enter into a binding agreement.`
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "2. Description of Service",
    content: `DataMind AI is a cloud-based AI-powered data analysis platform that enables users to upload CSV and Excel files, receive AI-generated insights, visualizations, and reports. The Service includes but is not limited to: automated data analysis, chart generation, natural language Q&A, data cleaning suggestions, PDF export, and multi-business workspace management. We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time without prior notice.`
  },
  {
    icon: <CreditCard className="w-5 h-5" />,
    title: "3. Payments, Billing & Subscriptions",
    content: `All payments for paid plans are processed securely through Paddle.com ("Payment Provider"), our authorized Merchant of Record. Paddle handles all billing, invoicing, sales tax, and VAT compliance on our behalf.\n\n• Subscription Fees: Paid plans are billed on a recurring monthly or annual basis as selected at the time of purchase.\n• Free Trial: If applicable, free trials automatically convert to paid subscriptions unless cancelled before the trial period ends.\n• Refund Policy: We offer a 14-day money-back guarantee from the date of initial purchase. Refund requests after 14 days will be evaluated on a case-by-case basis. To request a refund, contact support@datamind.ai.\n• Cancellation: You may cancel your subscription at any time through your account dashboard. Upon cancellation, you will retain access until the end of your current billing period.\n• Price Changes: We reserve the right to change pricing with 30 days advance notice. Existing subscribers will be grandfathered at their current rate for the remainder of their billing cycle.\n• Currency & Tax: All prices are displayed in USD. Applicable taxes are calculated and collected by Paddle based on your location.`
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "4. User Data & Privacy",
    content: `Your privacy is critically important to us. We process uploaded data files solely for the purpose of providing analysis results. We do NOT sell, share, or distribute your uploaded data to any third parties.\n\n• Data Retention: Uploaded files are processed in ephemeral memory and are automatically deleted within 24 hours of processing unless you explicitly save results to your workspace.\n• Account Data: We store your account information (name, email, hashed password) securely using industry-standard encryption.\n• Cookies: We use essential cookies for authentication and session management. Analytics cookies are used only with your consent.\n• GDPR Compliance: EU users have the right to access, rectify, or delete their personal data at any time by contacting privacy@datamind.ai.\n\nFor full details, please review our Privacy Policy at /policy.`
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: "5. Acceptable Use Policy",
    content: `You agree not to use the Service to:\n\n• Upload malicious files, viruses, or harmful code.\n• Attempt to reverse-engineer, decompile, or exploit the platform's AI models.\n• Use the Service for illegal activities, harassment, or to process data you do not have rights to.\n• Exceed reasonable usage limits in a manner that degrades the Service for other users.\n• Resell, sublicense, or redistribute any outputs of the Service without authorization.\n• Impersonate another person or misrepresent your affiliation with any entity.\n\nViolation of this policy may result in immediate account suspension or termination without refund.`
  },
  {
    icon: <Scale className="w-5 h-5" />,
    title: "6. Intellectual Property",
    content: `All content, features, and functionality of DataMind AI — including but not limited to text, graphics, logos, icons, software, AI models, and the overall look and feel — are the exclusive property of DataMind AI Inc. and are protected by international copyright, trademark, and intellectual property laws.\n\n• Your Data: You retain full ownership of all data you upload to the Service. By uploading, you grant us a limited, non-exclusive license to process your data solely for the purpose of delivering the Service.\n• AI Outputs: Insights, reports, and analysis generated by our AI are provided for your use. You may use them commercially, but we make no guarantees about the accuracy or completeness of AI-generated content.`
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: "7. Limitation of Liability",
    content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, DATAMIND AI INC. SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY.\n\nThe Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind. We do not guarantee that AI-generated insights are 100% accurate. Users should verify critical business decisions with qualified professionals. Our total liability shall not exceed the amount you paid us in the 12 months preceding the claim.`
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: "8. Termination",
    content: `We reserve the right to terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including but not limited to breach of these Terms. Upon termination, your right to use the Service will cease immediately. All provisions of the Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.`
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "9. Governing Law & Dispute Resolution",
    content: `These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions. Any disputes arising from these Terms or the Service shall first be attempted to be resolved through good-faith negotiation. If negotiation fails, disputes shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association (AAA).`
  },
  {
    icon: <Mail className="w-5 h-5" />,
    title: "10. Contact Information",
    content: `If you have questions about these Terms of Service, please contact us:\n\n• Email: legal@datamind.ai\n• Support: support@datamind.ai\n• Mailing Address: DataMind AI Inc., 123 Innovation Drive, Silicon Valley, CA 94025, United States\n\nThese Terms of Service were last updated on March 28, 2026.`
  }
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-44 pb-20 text-center relative overflow-hidden px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-slate-100/50 blur-[120px] rounded-full -z-10" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900 text-white text-xs font-black uppercase tracking-widest mb-8">
            <ShieldCheck className="w-4 h-4" />
            Legal Agreement
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tight leading-none mb-8">
            Terms of <span className="text-blue-600">Service</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Please read these terms carefully before using the DataMind AI platform. Last updated: <strong className="text-slate-900">March 28, 2026</strong>.
          </p>
        </motion.div>
      </section>

      {/* Terms Content */}
      <section className="pb-32 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-[2rem] p-10 border border-slate-200 hover:shadow-xl hover:border-slate-300 transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 flex items-center justify-center rounded-xl border border-blue-100">
                  {section.icon}
                </div>
                <h2 className="text-xl font-black text-slate-900">{section.title}</h2>
              </div>
              <div className="text-slate-600 font-medium leading-[1.9] text-[15px] whitespace-pre-line">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Paddle Badge */}
      <section className="pb-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-slate-50 rounded-[3rem] border border-slate-200 p-12 flex flex-col items-center gap-6">
            <CreditCard className="w-12 h-12 text-slate-300" />
            <h3 className="text-2xl font-black text-slate-900">Secure Payments via Paddle</h3>
            <p className="text-slate-500 font-medium max-w-xl">All payment processing, billing, invoicing, and tax compliance is handled by <strong className="text-slate-900">Paddle.com</strong>, our Merchant of Record. We never see or store your credit card information.</p>
            <div className="flex items-center gap-6 mt-4 flex-wrap justify-center">
              <span className="px-4 py-2 bg-white rounded-xl border border-slate-200 text-xs font-black text-slate-500 uppercase tracking-widest">PCI DSS Compliant</span>
              <span className="px-4 py-2 bg-white rounded-xl border border-slate-200 text-xs font-black text-slate-500 uppercase tracking-widest">256-Bit SSL</span>
              <span className="px-4 py-2 bg-white rounded-xl border border-slate-200 text-xs font-black text-slate-500 uppercase tracking-widest">GDPR Ready</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
