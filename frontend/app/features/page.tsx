import { ShieldCheck, ServerCog, Database, Cpu } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-700">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-slate-50 to-white overflow-hidden border-b border-slate-100 relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            Everything you need to <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">analyze data like a pro.</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
            Our comprehensive suite of tools replaces traditional BI dashboards with blazing-fast natural language intelligence.
          </p>
        </div>
      </section>

      {/* Feature List Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {[
              { 
                icon: Cpu,
                title: "Groq-Powered AI Inference", 
                desc: "We leverage LPU inference technology to execute massive data transformations and queries instantly." 
              },
              { 
                icon: Database,
                title: "Universal CSV/Excel Support", 
                desc: "Drop in files up to 1GB. We auto-clean your headers, handle missing values, and prepare the schema in seconds." 
              },
              { 
                icon: ServerCog,
                title: "Auto-SQL Generation", 
                desc: "Ask questions in English. We generate complex SQL queries, run them against your data frame, and output exact metrics." 
              },
              { 
                icon: ShieldCheck,
                title: "Isolated Processing", 
                desc: "Your data never trains our public models. Every active session runs in a highly secure, isolated memory wedge." 
              }
            ].map((f, i) => (
              <div key={i} className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100 shadow-sm text-blue-600">
                  <f.icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{f.title}</h3>
                  <p className="text-slate-600 text-lg leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
