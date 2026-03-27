import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Pricing } from "@/components/pricing";
import { CtaBanner } from "@/components/cta-banner";
import { LogoBanner } from "@/components/logo-banner";
import { TestimonialBanner } from "@/components/testimonial-banner";

export default function PricingPage() {
  return (
    <main className="min-h-screen pt-20 flex flex-col selection:bg-blue-100 selection:text-blue-700">
      <Navbar />
      
      <div className="pt-24 pb-12 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
          Simple, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Transparent</span> Pricing
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          Choose the perfect plan for your data needs. Upgrade, downgrade, or cancel anytime. No hidden fees.
        </p>
      </div>

      <Pricing />
      
      <div className="my-12">
        <LogoBanner />
      </div>

      <TestimonialBanner />
      <CtaBanner />
      <Footer />
    </main>
  );
}
