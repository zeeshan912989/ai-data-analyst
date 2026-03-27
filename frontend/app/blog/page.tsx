import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar />
      
      <section className="pt-32 pb-20 border-b border-slate-100 relative bg-slate-50">
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Insights & <span className="text-blue-600">Company News</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl">
            Tutorials, use-cases, and massive updates to our core intelligence engine.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "How to use AI clustering to find hidden customer segments",
                category: "Tutorial",
                date: "March 20, 2026",
                image: "bg-blue-100"
              },
              {
                title: "Announcing our new Groq LPU Integration: 10x query speeds",
                category: "Product Update",
                date: "March 15, 2026",
                image: "bg-indigo-100"
              },
              {
                title: "Why Traditional Dashboards are Dead.",
                category: "Opinion",
                date: "March 02, 2026",
                image: "bg-fuchsia-100"
              }
            ].map((post, i) => (
              <article key={i} className="group cursor-pointer">
                <div className={`w-full aspect-video rounded-2xl ${post.image} mb-6 overflow-hidden border border-slate-100 relative`}>
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent group-hover:opacity-0 transition-opacity" />
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-slate-400 mb-3 uppercase tracking-widest">
                  <span className="text-blue-600">{post.category}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
