"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, AlertCircle, CreditCard, Clock, 
  ChevronRight, TrendingUp, Zap, Users,
  BarChart2, FileText, Bot, ShieldCheck, Star
} from "lucide-react";

interface BillingStatus {
  plan: string;
  status: string;
  uploads_used: number;
  limit: number;
}

// Map plan names to Paddle Price IDs
// Replace these with your actual Paddle Price IDs after creating products in Paddle dashboard
const PADDLE_PRICE_IDS: Record<string, string> = {
  Starter: process.env.NEXT_PUBLIC_PADDLE_STARTER_PRICE_ID || 'pri_starter_placeholder',
  Pro: process.env.NEXT_PUBLIC_PADDLE_PRO_PRICE_ID || 'pri_pro_placeholder',
};

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for testing our AI capabilities.",
    features: ["3 uploads per day", "Basic insights", "Limited AI questions", "Community support"],
    cta: "Current Plan",
    active: false,
    icon: null,
    badge: null
  },
  {
    name: "Starter",
    price: "$5",
    description: "Ideal for small business data.",
    features: ["50 uploads/month", "Full AI insights", "Export PDF report", "Priority Support"],
    cta: "Upgrade to Starter",
    active: true,
    icon: <Zap className="w-5 h-5 text-blue-600" />,
    badge: "Most Popular"
  },
  {
    name: "Pro",
    price: "$10",
    description: "For data power users and agencies.",
    features: ["Unlimited uploads", "Priority AI responses", "Advanced analytics", "Custom Branding", "API Access"],
    cta: "Upgrade to Pro",
    active: false,
    icon: <Users className="w-5 h-5 text-indigo-600" />,
    badge: null
  }
];

export default function BillingPage() {
  const [billing, setBilling] = useState<BillingStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [checkoutStatus, setCheckoutStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchBilling();
  }, []);

  const fetchBilling = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/api/auth/billing/status`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setBilling(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // Open Paddle Checkout for a specific plan
  const handleUpgrade = (planName: string) => {
    const priceId = PADDLE_PRICE_IDS[planName];
    if (!priceId || priceId.includes('placeholder')) {
      // Fallback: use old mock upgrade for sandbox/demo
      handleMockUpgrade(planName);
      return;
    }

    if (typeof window !== 'undefined' && (window as any).Paddle) {
      setCheckoutStatus(`Opening ${planName} checkout...`);
      (window as any).Paddle.Checkout.open({
        items: [{ priceId, quantity: 1 }],
        settings: {
          displayMode: 'overlay',
          theme: 'light',
          locale: 'en',
          successUrl: `${window.location.origin}/dashboard/billing?success=true`,
        },
        customer: {
          email: localStorage.getItem("user_email") || undefined,
        },
        customData: {
          userId: localStorage.getItem("user_id") || "",
          planName: planName,
        },
      });
      setCheckoutStatus(null);
    } else {
      alert("Payment system is loading. Please try again in a moment.");
    }
  };

  // Fallback mock upgrade (when Paddle Price IDs not set yet)
  const handleMockUpgrade = async (plan: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/api/auth/billing/upgrade?plan=${plan}`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        alert(`✅ ${plan} plan activated! (Demo mode — Paddle checkout will activate after you set Price IDs)`);
        fetchBilling();
      }
    } catch (e) {
      alert("Error upgrading plan");
    }
  };

  const usagePercent = billing ? Math.min((billing.uploads_used / billing.limit) * 100, 100) : 0;

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Billing & Plans</h1>
          <p className="text-slate-500 font-medium">Manage your subscription, limits and payment methods.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Secured by Paddle
          </div>
          {billing && (
            <div className="bg-white border border-slate-200 px-6 py-4 rounded-2xl shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Current Cycle</p>
                <p className="font-bold text-slate-900">Ends Apr 28, 2026</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Success Banner */}
      {typeof window !== 'undefined' && new URLSearchParams(window.location?.search).get('success') === 'true' && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 flex items-center gap-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          <div>
            <h3 className="font-black text-emerald-900">Payment Successful! 🎉</h3>
            <p className="text-emerald-600 font-medium text-sm">Your plan has been upgraded. It may take a moment for changes to reflect.</p>
          </div>
        </div>
      )}

      {/* Usage Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[80px] -z-10 translate-x-20 -translate-y-20 opacity-50" />
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white">
                <BarChart2 className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Monthly Usage</h2>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-slate-900">{billing?.uploads_used} / {billing?.limit === 9999 ? "∞" : billing?.limit}</p>
              <p className="text-sm text-slate-500 font-medium">Uploads processed</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-1 shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${usagePercent}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full rounded-full ${usagePercent > 90 ? "bg-rose-500" : "bg-gradient-to-r from-blue-500 to-indigo-600"}`}
              />
            </div>
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
              <span>0 Uploads</span>
              <span>Limit: {billing?.limit === 9999 ? "Unlimited" : billing?.limit}</span>
            </div>
          </div>

          <div className="mt-10 grid sm:grid-cols-3 gap-6">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100/50">
              <FileText className="w-5 h-5 text-slate-400 mb-2" />
              <p className="text-lg font-bold text-slate-900">32</p>
              <p className="text-xs text-slate-500 font-medium whitespace-nowrap">PDF Reports</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100/50">
              <Bot className="w-5 h-5 text-slate-400 mb-2" />
              <p className="text-lg font-bold text-slate-900">140</p>
              <p className="text-xs text-slate-500 font-medium whitespace-nowrap">AI Queries</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100/50">
              <TrendingUp className="w-5 h-5 text-slate-400 mb-2" />
              <p className="text-lg font-bold text-slate-900">$0.12</p>
              <p className="text-xs text-slate-500 font-medium whitespace-nowrap">Cost per upload</p>
            </div>
          </div>
        </div>

        {/* Current Plan Mini Card */}
        <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col justify-between shadow-xl shadow-slate-200">
          <div>
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest">Active Status</span>
            <div className="mt-6 flex items-center justify-between">
               <h3 className="text-3xl font-bold">{billing?.plan}</h3>
               <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                 <Zap className="w-6 h-6 text-yellow-400" />
               </div>
            </div>
            <p className="text-slate-400 text-sm mt-2 font-medium">Renewal Date: May 28, 2026</p>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10">
            <button className="w-full py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
              <CreditCard className="w-5 h-5" />
              Manage Payment
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Table Section */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">Choose the best plan for your data</h2>
          <p className="text-slate-500 font-medium mt-2">Switch plans at any time based on your business needs.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <motion.div 
              key={plan.name}
              whileHover={{ y: -5 }}
              className={`relative rounded-3xl p-8 border ${billing?.plan === plan.name ? "ring-4 ring-blue-500/20 border-blue-500 bg-white" : "border-slate-200 bg-white"} flex flex-col transition-all`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg flex items-center gap-1">
                  <Star className="w-3 h-3 fill-white" />
                  {plan.badge}
                </div>
              )}
              
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-extrabold text-slate-900">{plan.name}</h3>
                {plan.icon}
              </div>
              
              <div className="mb-8">
                <span className="text-4xl font-black text-slate-900">{plan.price}</span>
                <span className="text-slate-500 font-bold">/mo</span>
                <p className="text-slate-400 text-sm mt-3 font-medium leading-relaxed">{plan.description}</p>
              </div>

              <div className="space-y-4 flex-grow mb-10">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-semibold text-slate-600">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleUpgrade(plan.name)}
                disabled={billing?.plan === plan.name || plan.name === "Free"}
                className={`w-full py-4 px-6 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
                  billing?.plan === plan.name 
                    ? "bg-slate-100 text-slate-400 cursor-default" 
                    : plan.active 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 active:scale-95" 
                      : "bg-slate-900 text-white hover:bg-slate-800 active:scale-95"
                }`}
              >
                {billing?.plan === plan.name ? "Current Plan ✓" : plan.cta}
                {billing?.plan !== plan.name && plan.name !== "Free" && <ChevronRight className="w-4 h-4" />}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Paddle Trust Footer */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <ShieldCheck className="w-10 h-10 text-slate-300" />
          <div>
            <h4 className="font-black text-slate-900">Secure Payments via Paddle</h4>
            <p className="text-slate-500 text-sm font-medium">We never store your card details. All payments are PCI DSS compliant.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="px-3 py-1.5 bg-white rounded-lg border border-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-widest">256-Bit SSL</span>
          <span className="px-3 py-1.5 bg-white rounded-lg border border-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-widest">PCI DSS</span>
          <span className="px-3 py-1.5 bg-white rounded-lg border border-slate-200 text-[10px] font-black text-slate-500 uppercase tracking-widest">GDPR</span>
        </div>
      </div>
    </div>
  );
}
