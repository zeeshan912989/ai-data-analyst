"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart2, 
  Upload, 
  LineChart, 
  Download, 
  MessageSquareText, 
  Settings, 
  CreditCard, 
  Bell, 
  Search,
  Users,
  Home,
  ChevronRight,
  Sparkles,
  LogOut,
  AppWindow,
  Zap
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AdvancedLoader } from "@/components/advanced-loader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [userData, setUserData] = useState<any>(null);
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [activeBusiness, setActiveBusiness] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"}/api/auth/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
          setBusinesses(data.businesses || [{ id: 1, name: "Default Corp" }, { id: 2, name: "Retail Pro" }]); // Mock list
          setActiveBusiness(data.active_business || { id: 1, name: "Default Corp" });
        } else {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      } catch (err) {
        console.error("Backend offline");
      } finally {
        setTimeout(() => setIsLoading(false), 2000);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const menuItems = [
    { label: "Overview", icon: Home, href: "/dashboard" },
    { label: "Data Hub", icon: Upload, href: "/dashboard/upload" },
    { label: "AI Analysis", icon: Sparkles, href: "/dashboard/analysis" },
    { label: "Trends", icon: LineChart, href: "/dashboard/trends" },
    { label: "Exports", icon: Download, href: "/dashboard/export" },
    { label: "AI Chat", icon: MessageSquareText, href: "/dashboard/ask" },
  ];

  const bottomItems = [
    { label: "Inbox", icon: Bell, href: "/dashboard/notifications", count: userData?.unread_notifications },
    { label: "Billing", icon: CreditCard, href: "/dashboard/billing" },
    { label: "Settings", icon: Settings, href: "/dashboard/settings" },
  ];

  const initials = userData?.full_name ? userData.full_name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : "AA";

  if (isLoading) {
    return <AdvancedLoader fullScreen />;
  }

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex text-slate-900 font-sans overflow-hidden">
      
      {/* Premium Sidebar */}
      <aside className={`relative z-50 bg-[#0F172A] text-white flex flex-col hidden lg:flex transition-all duration-500 ease-in-out border-r border-white/5 ${isSidebarCollapsed ? 'w-24' : 'w-72'}`}>
        {/* Sidebar Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-indigo-600/10 pointer-events-none opacity-50" />
        
        {/* Logo Section */}
        <div className="h-20 flex items-center px-6 border-b border-white/5 relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20 group-hover:rotate-6 transition-transform">
              <BarChart2 className="w-5 h-5 text-white" />
            </div>
            {!isSidebarCollapsed && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-black text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400"
              >
                AI.Analyst
              </motion.span>
            )}
          </Link>
        </div>

        {/* Business Switcher */}
        {!isSidebarCollapsed && (
          <div className="px-6 mb-8 mt-6 relative z-10">
            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-1">Active Intelligence Hub</p>
              <div className="group/hub">
                 <button className="w-full flex items-center justify-between gap-3 p-3 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all text-left">
                    <div className="flex items-center gap-3 overflow-hidden">
                       <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-black text-xs shrink-0">{activeBusiness?.name[0] || "D"}</div>
                       <span className="text-sm font-bold truncate">{activeBusiness?.name || "Main Workforce"}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover/hub:translate-x-1 transition-transform" />
                 </button>
              </div>
            </div>
          </div>
        )}

        <div className="p-4 flex-1 overflow-y-auto space-y-8 relative z-10 custom-scrollbar">
          {/* Main Menu */}
          <div>
            {!isSidebarCollapsed && <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Intelligence Platform</p>}
            <nav className="space-y-1.5">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-bold transition-all group relative ${
                    pathname === item.href 
                      ? "bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)] border border-white/10" 
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <item.icon className={`w-5 h-5 transition-colors ${pathname === item.href ? 'text-blue-400' : 'group-hover:text-blue-400'}`} />
                  {!isSidebarCollapsed && <span>{item.label}</span>}
                  {pathname === item.href && !isSidebarCollapsed && (
                    <motion.div layoutId="activePill" className="absolute right-2 w-1.5 h-1.5 rounded-full bg-blue-500" />
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* Account & Systems */}
          <div>
            {!isSidebarCollapsed && <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Systems & Billing</p>}
            <nav className="space-y-1.5">
              {bottomItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-bold transition-all group relative ${
                    pathname === item.href 
                      ? "bg-white/10 text-white border border-white/10" 
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  } `}
                >
                  <item.icon className="w-5 h-5" />
                  {!isSidebarCollapsed && (
                    <span className="flex-1 flex justify-between items-center">
                      {item.label}
                      {item.count && item.count > 0 && (
                        <span className="px-1.5 py-0.5 bg-blue-500 text-[10px] rounded-full text-white">{item.count}</span>
                      )}
                    </span>
                  )}
                </Link>
              ))}
              
              {/* Logout Button */}
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-bold text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-all mt-4"
              >
                <LogOut className="w-5 h-5" />
                {!isSidebarCollapsed && <span>Logout</span>}
              </button>
            </nav>
          </div>
        </div>
        
        {/* Plan Upgrade Card (When sidebar not collapsed) */}
        {!isSidebarCollapsed && userData?.current_plan === 'Free' && (
          <div className="p-6 relative z-10">
             <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[28px] p-5 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform" />
                <Zap className="w-8 h-8 text-amber-400 mb-3" />
                <h4 className="font-black text-sm text-white mb-1">Upgrade to Pro</h4>
                <p className="text-[10px] font-medium text-white/70 mb-4 tracking-normal">Unlock advanced AI clusters and PDF reports.</p>
                <Link href="/dashboard/billing" className="block w-full py-2.5 bg-white text-blue-700 rounded-xl text-xs font-black text-center hover:bg-blue-50 transition-colors">
                   Get Unlimited Access
                </Link>
             </div>
          </div>
        )}

        {/* User Profile Mini */}
        <div className="p-4 border-t border-white/5 relative z-10">
          <Link href="/dashboard/settings" className={`flex items-center gap-4 p-2.5 rounded-2xl hover:bg-white/5 transition-all group ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-white to-slate-400 text-slate-900 flex items-center justify-center font-black text-sm shadow-xl ring-2 ring-white/10">
              {userData ? initials : "..."}
            </div>
            {!isSidebarCollapsed && (
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-black text-white truncate">{userData ? (userData.full_name || "User") : "Loading..."}</p>
                <p className="text-[10px] font-black uppercase text-blue-400 tracking-wider">Active Member</p>
              </div>
            )}
            {!isSidebarCollapsed && <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />}
          </Link>
        </div>

        {/* Collapse Toggle */}
        <button 
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="absolute -right-3 top-24 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-90 transition-all z-[60]"
        >
          {isSidebarCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5 rotate-180" />}
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
        {/* Top Floating Header */}
        <header className="h-20 flex items-center justify-between px-8 bg-white/70 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-40">
          <div className="flex items-center w-full max-w-xl">
             <div className="relative w-full hidden md:block group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Ask AI or search intel summaries..." 
                  className="w-full pl-12 pr-6 py-3 bg-slate-100/50 border border-slate-200 rounded-2xl text-sm font-bold placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white transition-all text-slate-900" 
                />
             </div>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/dashboard/notifications" className="relative p-2.5 text-slate-500 hover:text-blue-600 transition-all bg-slate-50 hover:bg-blue-50 rounded-2xl border border-slate-100">
              <Bell className="w-5 h-5" />
              {userData?.unread_notifications > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-rose-500 text-white text-[10px] font-black rounded-lg border-2 border-white min-w-[20px] h-[20px] flex items-center justify-center">
                  {userData.unread_notifications}
                </span>
              )}
            </Link>
            <div className="h-8 w-px bg-slate-200" />
            <div className="flex flex-col items-end">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{userData?.current_plan || "Free"} Plan</p>
               <p className="text-xs font-bold text-slate-900">{userData ? (userData.full_name || "User") : "Account"}</p>
            </div>
          </div>
        </header>

        {/* Page Content Container */}
        <main className="flex-1 overflow-y-auto px-8 lg:px-12 py-10 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Global CSS for Custom Scrollbar and Animations */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.4);
        }
      `}</style>
    </div>
  );
}
