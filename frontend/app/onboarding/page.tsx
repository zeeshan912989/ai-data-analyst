"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  Building2, 
  Store, 
  Briefcase, 
  GraduationCap,
  LineChart,
  Megaphone,
  Wallet,
  Users,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Loader2,
  BarChart2
} from "lucide-react";

// Types
type OnboardingData = {
  user_type: string;
  use_case: string;
  experience_level: string;
  company_name: string;
  monthly_data_size: string;
  preferred_currency: string;
  main_goal: string;
  theme: string;
  notifications_enabled: boolean;
};

// Config
const steps = [
  "Welcome",
  "User Type",
  "Use Case",
  "Experience",
  "Business Details",
  "Goals",
  "Preferences"
];

const variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction < 0 ? 50 : -50, opacity: 0 })
};

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [userName, setUserName] = useState("User");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [data, setData] = useState<OnboardingData>({
    user_type: "",
    use_case: "",
    experience_level: "",
    company_name: "",
    monthly_data_size: "medium",
    preferred_currency: "USD",
    main_goal: "",
    theme: "light",
    notifications_enabled: true
  });

  useEffect(() => {
    // Get user info to personalize welcome message
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }
      try {
        const res = await fetch("http://localhost:8000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const u = await res.json();
          setUserName(u.name.split(' ')[0] || "User");
        }
      } catch (err) {}
    };
    fetchUser();
  }, [router]);

  const updateData = (fields: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...fields }));
  };

  const nextStep = () => {
    if (step < steps.length - 1) {
      setDirection(1);
      setStep(s => s + 1);
    } else {
      submitOnboarding();
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setDirection(-1);
      setStep(s => s - 1);
    }
  };

  const submitOnboarding = async () => {
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    try {
      await fetch("http://localhost:8000/api/auth/onboarding/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      // Small simulated delay for realistic "setup" feel
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  const progress = ((step + 1) / steps.length) * 100;

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-8 animate-pulse shadow-lg shadow-blue-500/20">
          <BarChart2 className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Setting up your dashboard...</h2>
        <p className="text-slate-500 font-medium">Personalizing models based on your responses.</p>
        <div className="w-64 h-2 bg-slate-200 rounded-full mt-8 overflow-hidden">
          <motion.div 
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-full bg-blue-600 rounded-full"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-100 selection:text-blue-700">
      
      {/* Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200 z-50">
        <motion.div 
          className="h-full bg-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center pt-20 pb-10 px-6 overflow-hidden">
        
        <div className="w-full max-w-2xl relative flex-1 flex flex-col">
          {/* Skip Button */}
          {step > 0 && (
             <button onClick={submitOnboarding} className="absolute right-0 top-0 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors z-20">
               Skip Onboarding
             </button>
          )}

          <div className="flex-1 relative mt-10">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                {step === 0 && <StepWelcome name={userName} onNext={nextStep} />}
                {step === 1 && <StepUserType data={data} updateData={updateData} />}
                {step === 2 && <StepUseCase data={data} updateData={updateData} />}
                {step === 3 && <StepExperience data={data} updateData={updateData} />}
                {step === 4 && <StepBusinessDetails data={data} updateData={updateData} />}
                {step === 5 && <StepGoals data={data} updateData={updateData} />}
                {step === 6 && <StepPreferences data={data} updateData={updateData} />}
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Navigation Footer */}
          {step > 0 && (
            <div className="pt-8 mt-10 border-t border-slate-200 flex items-center justify-between z-10 w-full bg-slate-50">
              <button 
                onClick={prevStep}
                className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button 
                onClick={nextStep}
                className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold shadow-lg shadow-slate-900/10 hover:bg-black hover:scale-[1.02] transition-all flex items-center gap-2"
              >
                {step === steps.length - 1 ? "Complete Setup" : "Continue"} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// Step Components
// ----------------------------------------------------

function StepWelcome({ name, onNext }: { name: string, onNext: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center h-full pt-10">
      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-8 border-4 border-white shadow-xl">
        <span className="text-3xl">👋</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
        Welcome, {name}
      </h1>
      <p className="text-lg text-slate-500 font-medium max-w-md mx-auto mb-10 leading-relaxed">
        Let’s get your AI Data Analyst workspace configured. It takes less than 60 seconds.
      </p>
      <button 
        onClick={onNext}
        className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-600/20 hover:bg-blue-700 hover:scale-105 transition-all flex items-center gap-2"
      >
        Get Started <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

function StepUserType({ data, updateData }: any) {
  const options = [
    { id: "smb", label: "Small Business Owner", icon: Building2 },
    { id: "ecom", label: "E-commerce Seller", icon: Store },
    { id: "freelance", label: "Freelancer / Consultant", icon: Briefcase },
    { id: "student", label: "Student / Researcher", icon: GraduationCap },
    { id: "other", label: "Other", icon: Users }
  ];

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-slate-900 mb-2">What best describes you?</h2>
      <p className="text-slate-500 mb-8 font-medium">We'll tailor your insights accordingly.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map(opt => (
          <SelectionCard 
            key={opt.id} 
            selected={data.user_type === opt.id} 
            onClick={() => updateData({ user_type: opt.id })}
            icon={opt.icon}
            label={opt.label}
          />
        ))}
      </div>
    </div>
  );
}

function StepUseCase({ data, updateData }: any) {
  const options = [
    { id: "sales", label: "Sales Data", icon: LineChart },
    { id: "marketing", label: "Marketing Data", icon: Megaphone },
    { id: "financial", label: "Financial Data", icon: Wallet },
    { id: "hr", label: "HR / Employee Data", icon: Users }
  ];

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-slate-900 mb-2">What do you want to analyze?</h2>
      <p className="text-slate-500 mb-8 font-medium">Select your primary use case.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map(opt => (
          <SelectionCard 
            key={opt.id} 
            selected={data.use_case === opt.id} 
            onClick={() => updateData({ use_case: opt.id })}
            icon={opt.icon}
            label={opt.label}
          />
        ))}
        <SelectionCard 
            selected={data.use_case === "other"} 
            onClick={() => updateData({ use_case: "other" })}
            icon={BarChart2}
            label="Other / Mixed"
        />
      </div>
    </div>
  );
}

function StepExperience({ data, updateData }: any) {
  const options = [
    { id: "beginner", label: "Beginner", desc: "I've rarely used Excel or data tools." },
    { id: "intermediate", label: "Intermediate", desc: "I know my way around spreadsheets." },
    { id: "advanced", label: "Advanced", desc: "I write SQL, use Python, or advanced BI tools." }
  ];

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-slate-900 mb-2">How familiar are you with data analysis?</h2>
      <p className="text-slate-500 mb-8 font-medium">Don't worry, the AI is designed for everyone.</p>
      <div className="space-y-4">
        {options.map(opt => (
          <div 
            key={opt.id}
            onClick={() => updateData({ experience_level: opt.id })}
            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
              data.experience_level === opt.id 
              ? 'border-blue-600 bg-blue-50/50 shadow-md ring-4 ring-blue-600/10' 
              : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`font-bold text-lg ${data.experience_level === opt.id ? 'text-blue-900' : 'text-slate-900'}`}>{opt.label}</h3>
                <p className={`font-medium text-sm mt-1 ${data.experience_level === opt.id ? 'text-blue-700' : 'text-slate-500'}`}>{opt.desc}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                data.experience_level === opt.id ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
              }`}>
                {data.experience_level === opt.id && <CheckCircle2 className="w-4 h-4 text-white" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepBusinessDetails({ data, updateData }: any) {
  return (
    <div>
      <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Business Details</h2>
      <p className="text-slate-500 mb-8 font-medium">This helps us format your reports effectively.</p>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Company / Brand Name</label>
          <input 
            type="text" 
            value={data.company_name}
            onChange={e => updateData({ company_name: e.target.value })}
            placeholder="e.g. Acme Corp" 
            className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-white shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-900 outline-none"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Monthly Data Size</label>
            <select 
              value={data.monthly_data_size}
              onChange={e => updateData({ monthly_data_size: e.target.value })}
              className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-white shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-900 outline-none cursor-pointer appearance-none"
            >
              <option value="small">Small (&lt;10k rows)</option>
              <option value="medium">Medium (10k-100k rows)</option>
              <option value="large">Large (&gt;100k rows)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Currency</label>
            <select 
              value={data.preferred_currency}
              onChange={e => updateData({ preferred_currency: e.target.value })}
              className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-white shadow-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium text-slate-900 outline-none cursor-pointer appearance-none"
            >
              <option value="PKR">PKR (₨)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepGoals({ data, updateData }: any) {
  const options = [
    { id: "sales", label: "Increase sales" },
    { id: "tracking", label: "Track performance" },
    { id: "trends", label: "Find trends" },
    { id: "decisions", label: "Make better decisions" }
  ];

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-slate-900 mb-2">What is your main goal?</h2>
      <p className="text-slate-500 mb-8 font-medium">Select the primary reason you are using AI Data Analyst.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map(opt => (
          <SelectionCard 
            key={opt.id} 
            selected={data.main_goal === opt.id} 
            onClick={() => updateData({ main_goal: opt.id })}
            label={opt.label}
          />
        ))}
      </div>
    </div>
  );
}

function StepPreferences({ data, updateData }: any) {
  return (
    <div>
      <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Almost done!</h2>
      <p className="text-slate-500 mb-8 font-medium">Set your dashboard preferences.</p>
      
      <div className="space-y-6">
        <div className="p-6 rounded-2xl border border-slate-200 bg-white flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">App Theme</h3>
            <p className="text-sm font-medium text-slate-500">Choose your workspace vibe.</p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => updateData({ theme: 'light' })} 
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${data.theme === 'light' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Light
            </button>
            <button 
              onClick={() => updateData({ theme: 'dark' })} 
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${data.theme === 'dark' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Dark
            </button>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-slate-200 bg-white flex items-center justify-between cursor-pointer" onClick={() => updateData({ notifications_enabled: !data.notifications_enabled })}>
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Email Reports</h3>
            <p className="text-sm font-medium text-slate-500">Receive weekly automated AI insights.</p>
          </div>
          <div className={`w-12 h-6 rounded-full transition-colors flex items-center p-1 ${data.notifications_enabled ? 'bg-blue-600' : 'bg-slate-300'}`}>
            <motion.div 
              className="w-4 h-4 rounded-full bg-white shadow-sm"
              animate={{ x: data.notifications_enabled ? 24 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable card for grid selections
function SelectionCard({ selected, onClick, icon: Icon, label }: any) {
  return (
    <div 
      onClick={onClick}
      className={`p-6 rounded-2xl border-2 flex flex-col gap-4 cursor-pointer transition-all ${
        selected 
        ? 'border-blue-600 bg-blue-50/50 shadow-md ring-4 ring-blue-600/10' 
        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-1'
      }`}
    >
      <div className="flex items-center justify-between">
        {Icon ? (
           <div className={`p-3 rounded-xl ${selected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
              <Icon className="w-5 h-5" />
           </div>
        ) : (
           <div /> // spacer
        )}
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
          {selected && <CheckCircle2 className="w-3 h-3 text-white" />}
        </div>
      </div>
      <h3 className={`font-bold text-lg ${selected ? 'text-blue-900' : 'text-slate-900'}`}>{label}</h3>
    </div>
  );
}
