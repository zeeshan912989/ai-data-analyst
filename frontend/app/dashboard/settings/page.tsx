"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Shield, Bell, Database, Globe, 
  Trash2, Save, LogOut, Camera, Lock,
  Moon, Sun, MapPin, Mail, Phone,
  CreditCard, ChevronRight, Zap, Check, AlertCircle
} from "lucide-react";

type TabType = "general" | "notifications" | "data" | "security";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("general");
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/api/auth/dashboard`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      setProfile(data);
      setName(data.full_name);
      setEmail(data.email);
      setCompany(data.company || "");
      // phone would be fetched from separate profile endpoint if available
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/api/auth/profile`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name, company, phone }),
      });
      if (res.ok) {
        alert("Settings saved successfully! ✨");
        fetchProfile();
      }
    } catch (e) {
      alert("Error saving settings");
    } finally {
      setIsLoading(false);
    }
  };

  const sidebarItems = [
    { id: "general", label: "General", icon: <User className="w-4 h-4" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
    { id: "data", label: "Data & Privacy", icon: <Database className="w-4 h-4" /> },
    { id: "security", label: "Security", icon: <Shield className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Accounts & Settings</h1>
          <p className="text-slate-500 font-medium">Control your profile, system preferences and data privacy.</p>
        </div>
        <div className="flex items-center gap-3">
           <button 
             onClick={handleUpdate}
             disabled={isLoading}
             className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95 disabled:opacity-50"
           >
             {isLoading ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : <Save className="w-4 h-4" />}
             Save Changes
           </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar Nav */}
        <aside className="lg:w-64 space-y-2">
           {sidebarItems.map((item) => (
             <button
               key={item.id}
               onClick={() => setActiveTab(item.id as TabType)}
               className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                 activeTab === item.id 
                   ? "bg-white text-blue-600 shadow-sm border border-slate-100" 
                   : "text-slate-500 hover:bg-slate-100/50"
               }`}
             >
               {item.icon}
               {item.label}
             </button>
           ))}
           <div className="pt-6 mt-6 border-t border-slate-100">
             <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-rose-500 hover:bg-rose-50 transition-all">
               <LogOut className="w-4 h-4" />
               Sign Out
             </button>
           </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
             {activeTab === "general" && (
               <motion.div 
                 key="general"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 className="space-y-8"
               >
                 {/* Profile Card */}
                 <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-8">
                   <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-slate-100">
                     <div className="relative group">
                        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-4xl font-extrabold text-white shadow-xl shadow-blue-500/20 overflow-hidden">
                           {profile?.profile_pic ? <img src={profile.profile_pic} className="w-full h-full object-cover" /> : profile?.full_name?.charAt(0)}
                        </div>
                        <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-xl shadow-lg border border-slate-100 flex items-center justify-center text-slate-600 hover:text-blue-600 transition-all opacity-0 group-hover:opacity-100">
                          <Camera className="w-4 h-4" />
                        </button>
                     </div>
                     <div className="text-center sm:text-left space-y-1">
                        <h2 className="text-xl font-extrabold text-slate-900">{profile?.full_name}</h2>
                        <p className="text-slate-500 text-sm font-medium flex items-center gap-2 justify-center sm:justify-start">
                          <Mail className="w-3.5 h-3.5 text-slate-300" />
                          {profile?.email}
                        </p>
                        <div className="pt-2 flex items-center gap-2">
                           <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-emerald-100 flex items-center gap-1">
                             <Check className="w-3 h-3" />
                             Verified Account
                           </span>
                        </div>
                     </div>
                   </div>

                   <div className="grid sm:grid-cols-2 gap-6 pt-4">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                        <div className="relative">
                           <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                           <input 
                             type="text" 
                             value={name}
                             onChange={(e) => setName(e.target.value)}
                             className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm font-bold text-slate-700" 
                           />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Company / Organization</label>
                        <input 
                          type="text" 
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Acme Inc."
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm font-bold text-slate-700" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                        <div className="relative">
                           <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                           <input 
                             type="tel" 
                             value={phone}
                             onChange={(e) => setPhone(e.target.value)}
                             placeholder="+92 300 0000000"
                             className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm font-bold text-slate-700" 
                           />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Default Timezone</label>
                        <div className="relative">
                           <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                           <select className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-sm font-bold text-slate-700 appearance-none">
                             <option>(GMT+05:00) Islamabad, Karachi</option>
                             <option>(GMT+00:00) London</option>
                             <option>(GMT-08:00) Pacific Time</option>
                           </select>
                        </div>
                      </div>
                   </div>
                 </div>

                 {/* Appearance Card */}
                 <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
                    <h3 className="text-lg font-extrabold text-slate-900">Appearance & Theme</h3>
                    <div className="grid grid-cols-2 gap-4">
                       <button className="p-4 rounded-2xl border-2 border-blue-500 bg-blue-50 flex flex-col items-center gap-3">
                          <Sun className="w-6 h-6 text-blue-600" />
                          <span className="text-xs font-black uppercase text-blue-600">Light Mode</span>
                       </button>
                       <button className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex flex-col items-center gap-3 opacity-60 grayscale">
                          <Moon className="w-6 h-6 text-slate-400" />
                          <span className="text-xs font-black uppercase text-slate-400">Dark Mode</span>
                       </button>
                    </div>
                 </div>
               </motion.div>
             )}

             {activeTab === "notifications" && (
               <motion.div 
                 key="notif"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6"
               >
                 <h3 className="text-lg font-extrabold text-slate-900 mb-6">Notification Preferences</h3>
                 <div className="space-y-4">
                   {[
                     { label: "Email Notifications", desc: "Receive updates about your data at your email.", icon: <Mail className="w-5 h-5" /> },
                     { label: "AI Insights Desktop Alerts", desc: "AI will alert you when critical trends are found.", icon: <Bot className="w-5 h-5 text-indigo-500" /> },
                     { label: "Plan Limit Reminders", desc: "Get notified when you reach 80% usage.", icon: <Zap className="w-5 h-5 text-yellow-500" /> },
                   ].map((item, idx) => (
                     <div key={idx} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                       <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                            {item.icon}
                         </div>
                         <div>
                            <p className="font-bold text-slate-900">{item.label}</p>
                            <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                         </div>
                       </div>
                       <label className="relative inline-flex items-center cursor-pointer">
                         <input type="checkbox" defaultChecked className="sr-only peer" />
                         <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                       </label>
                     </div>
                   ))}
                 </div>
               </motion.div>
             )}

             {activeTab === "data" && (
               <motion.div 
                 key="data"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="space-y-6"
               >
                 <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
                   <h3 className="text-lg font-extrabold text-slate-900">Manage Stored Data</h3>
                   <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-4">
                      <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
                      <div>
                         <p className="text-sm font-bold text-amber-900">Privacy Notice</p>
                         <p className="text-xs text-amber-700 mt-1 font-medium leading-relaxed">Deleting your data will permanently remove all analysis results, AI insights, and uploaded file summaries. This action cannot be undone.</p>
                      </div>
                   </div>
                   <div className="space-y-3">
                      <button className="w-full flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all font-bold text-sm text-slate-700">
                        Clear Analysis History
                        <ChevronRight className="w-4 h-4 text-slate-300" />
                      </button>
                      <button className="w-full flex items-center justify-between p-4 rounded-2xl border border-rose-100 bg-rose-50/10 hover:bg-rose-50 transition-all font-bold text-sm text-rose-500">
                        Delete All Account Data
                        <Trash2 className="w-4 h-4" />
                      </button>
                   </div>
                 </div>
               </motion.div>
             )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Bot(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 13v2" />
      <path d="M9 13v2" />
    </svg>
  )
}
