import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Pricing } from "@/components/pricing";
import { Footer } from "@/components/footer";
import { LogoBanner } from "@/components/logo-banner";
import { CtaBanner } from "@/components/cta-banner";
import { MetricsBanner } from "@/components/metrics-banner";
import { TestimonialBanner } from "@/components/testimonial-banner";
import { BentoGridBanner } from "@/components/bento-grid-banner";
import { HumanFirstBanner } from "@/components/human-first-banner";
import { PillCtaBanner } from "@/components/pill-cta-banner";
import { FeatureBanner } from "@/components/feature-banner";

export default function LandingPage() {
  return (
    <main className="min-h-screen selection:bg-blue-100 selection:text-blue-700 font-sans">
      <Navbar />
      <Hero />
      <FeatureBanner />
      <BentoGridBanner />
      <LogoBanner />
      <HumanFirstBanner />
      <MetricsBanner />
      <Features />
      <TestimonialBanner />
      <Pricing />
      <PillCtaBanner />
      <CtaBanner />
      <Footer />
    </main>
  );
}
