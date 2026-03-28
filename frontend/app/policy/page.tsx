"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { ShieldCheck, Eye, Database, Lock, Globe, Mail, Server, UserCheck, Cookie, FileWarning } from "lucide-react";

const sections = [
  {
    icon: <Eye className="w-5 h-5" />,
    title: "1. Information We Collect",
    content: `We collect the following types of information:\n\n• Account Information: When you register, we collect your name, email address, and encrypted password hash.\n• Profile Information: Optional data you choose to provide, such as company name, phone number, and profile picture.\n• Usage Data: We automatically collect information about your interactions with the Service, including pages visited, features used, upload frequency, and session duration.\n• Uploaded Data: Files you upload (CSV, Excel) are processed for analysis. We do NOT permanently store your raw uploaded data — it is processed in ephemeral memory and automatically purged within 24 hours.\n• Payment Information: Payment data is collected and processed exclusively by Paddle.com, our Merchant of Record. We never receive, see, or store your credit card numbers or bank details.`
  },
  {
    icon: <Database className="w-5 h-5" />,
    title: "2. How We Use Your Information",
    content: `We use the collected information for:\n\n• Providing the Service: Processing your data uploads, generating AI insights, and delivering analysis reports.\n• Account Management: Managing your subscription, billing, and account preferences.\n• Service Improvement: Analyzing aggregate usage patterns to improve features, performance, and user experience. This data is always anonymized.\n• Communication: Sending essential service notifications (billing, security alerts). Marketing emails are only sent with your explicit consent and include an unsubscribe option.\n• Security: Detecting and preventing fraud, abuse, and unauthorized access to accounts.`
  },
  {
    icon: <Lock className="w-5 h-5" />,
    title: "3. Data Security",
    content: `We employ industry-standard security measures:\n\n• Encryption in Transit: All data transmitted between your browser and our servers is encrypted using TLS 1.3.\n• Encryption at Rest: Account credentials are hashed using bcrypt with salt rounds.\n• Access Controls: Internal access to user data is strictly limited to authorized personnel on a need-to-know basis.\n• Infrastructure: Our servers are hosted on enterprise-grade cloud infrastructure with SOC 2 Type II compliance.\n• Incident Response: In the event of a data breach, affected users will be notified within 72 hours as required by GDPR.`
  },
  {
    icon: <Server className="w-5 h-5" />,
    title: "4. Data Retention",
    content: `• Uploaded Files: Processed in ephemeral memory and automatically deleted within 24 hours of analysis completion.\n• Analysis Results: Stored in your workspace for as long as your account is active. Deleted upon account termination.\n• Account Data: Retained for the duration of your account. Upon account deletion request, all personal data is permanently erased within 30 days.\n• Backups: Encrypted backups may retain anonymized data for up to 90 days for disaster recovery purposes.\n• Logs: Server access logs are retained for 90 days for security and debugging purposes, then automatically purged.`
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "5. Third-Party Services",
    content: `We use the following third-party services:\n\n• Paddle.com: Payment processing, billing, invoicing, and tax compliance (Merchant of Record). Paddle's privacy policy applies to payment data: paddle.com/legal/privacy.\n• Groq Inc.: AI inference provider for data analysis. Only anonymized data summaries (not raw files) are sent to the AI model.\n• Vercel: Frontend hosting and edge network delivery.\n• Railway / Supabase: Backend hosting and database management.\n\nWe do NOT share your personal information with advertisers. We do NOT sell your data to any third party under any circumstances.`
  },
  {
    icon: <Cookie className="w-5 h-5" />,
    title: "6. Cookies & Tracking",
    content: `We use the following cookies:\n\n• Essential Cookies: Required for authentication, session management, and security. Cannot be disabled.\n• Analytics Cookies: Used to understand aggregate usage patterns (page views, feature usage). Only activated with your explicit consent via the cookie banner.\n• Preference Cookies: Store your UI preferences (theme, language, sidebar state).\n\nYou can manage cookie preferences at any time through your browser settings or our cookie consent manager. Disabling essential cookies may prevent you from using the Service.`
  },
  {
    icon: <UserCheck className="w-5 h-5" />,
    title: "7. Your Rights (GDPR / CCPA)",
    content: `Depending on your jurisdiction, you have the following rights:\n\n• Right to Access: Request a copy of all personal data we hold about you.\n• Right to Rectification: Request correction of inaccurate or incomplete data.\n• Right to Erasure: Request permanent deletion of your personal data ("Right to be Forgotten").\n• Right to Data Portability: Receive your data in a machine-readable format (JSON/CSV).\n• Right to Object: Object to processing of your data for specific purposes.\n• Right to Restrict Processing: Request limitation of how we process your data.\n• CCPA Rights: California residents have the right to know what data is collected, request deletion, and opt-out of data sales (we do not sell data).\n\nTo exercise any of these rights, contact: privacy@datamind.ai. We respond to all requests within 30 days.`
  },
  {
    icon: <FileWarning className="w-5 h-5" />,
    title: "8. Children's Privacy",
    content: `The Service is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected data from a minor, we will delete it immediately. If you are a parent or guardian and believe your child has provided us with personal data, please contact privacy@datamind.ai.`
  },
  {
    icon: <Mail className="w-5 h-5" />,
    title: "9. Changes & Contact",
    content: `We may update this Privacy Policy from time to time. Material changes will be communicated via email to registered users and through a prominent notice on the Service.\n\nFor questions or concerns about this Privacy Policy:\n\n• Email: privacy@datamind.ai\n• Support: support@datamind.ai\n• Address: DataMind AI Inc., 123 Innovation Drive, Silicon Valley, CA 94025, United States\n\nThis Privacy Policy was last updated on March 28, 2026.`
  }
];

export default function PolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-44 pb-20 text-center relative overflow-hidden px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-emerald-100/30 blur-[120px] rounded-full -z-10" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-50 text-emerald-600 text-xs font-black uppercase tracking-widest border border-emerald-100 mb-8">
            <Lock className="w-4 h-4" />
            Your Data, Your Rules
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tight leading-none mb-8">
            Privacy <span className="text-emerald-600">Policy</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            We are committed to protecting your privacy and being transparent about how we handle your data. Last updated: <strong className="text-slate-900">March 28, 2026</strong>.
          </p>
        </motion.div>
      </section>

      {/* Policy Content */}
      <section className="pb-32 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="bg-white rounded-[2rem] p-10 border border-slate-200 hover:shadow-xl hover:border-slate-300 transition-all"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 flex items-center justify-center rounded-xl border border-emerald-100">
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

      {/* Trust & Compliance Badges */}
      <section className="pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-slate-50 rounded-[3rem] border border-slate-200 p-14">
            <ShieldCheck className="w-16 h-16 text-emerald-500 mx-auto mb-8" />
            <h3 className="text-3xl font-black text-slate-900 mb-4">Enterprise-Grade Compliance</h3>
            <p className="text-slate-500 font-medium max-w-xl mx-auto mb-10">We adhere to the strictest global privacy and security frameworks.</p>
            <div className="flex flex-wrap justify-center gap-4">
              {["GDPR Compliant", "CCPA Compliant", "SOC 2 Type II", "PCI DSS via Paddle", "TLS 1.3 Encryption", "ISO 27001 Aligned"].map((badge, i) => (
                <span key={i} className="px-5 py-3 bg-white rounded-2xl border border-slate-200 text-xs font-black text-slate-600 uppercase tracking-widest shadow-sm hover:shadow-md transition-all">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
