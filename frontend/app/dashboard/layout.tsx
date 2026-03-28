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
  Home
} from "lucide-react";

import { useState, useEffect } from "react";
import { AdvancedLoader } from "@/components/advanced-loader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/auth/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
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

  const menuItems = [
    { label: "Overview", icon: Home, href: "/dashboard" },
    { label: "Upload Data", icon: Upload, href: "/dashboard/upload" },
    { label: "AI Analysis", icon: BarChart2, href: "/dashboard/analysis" },
    { label: "Trends & Reports", icon: LineChart, href: "/dashboard/trends" },
    { label: "Export & PDF", icon: Download, href: "/dashboard/export" },
    { label: "Ask AI (Q&A)", icon: MessageSquareText, href: "/dashboard/ask" },
  ];

  const bottomItems = [
    { label: "Notifications", icon: Bell, href: "/dashboard/notifications" },
    { label: "Billing & Plan", icon: CreditCard, href: "/dashboard/billing" },
    { label: "Settings", icon: Settings, href: "/dashboard/settings" },
    { label: "Admin Panel", icon: Users, href: "/admin", adminOnly: true }
  ];

  const initials = userData?.full_name ? userData.full_name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : "AA";

  if (isLoading) {
    return <AdvancedLoader fullScreen />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-900 font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden lg:flex sticky top-0 h-screen">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
              <BarChart2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold tracking-tight text-slate-900">
              AI Analyst
            </span>
          </Link>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          <div className="space-y-1 mb-8">
            <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Workspace</p>
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  pathname === item.href 
                    ? "bg-blue-50 text-blue-700 font-bold shadow-[0_0_0_1px_rgba(59,130,246,0.1)]" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>

          <div className="space-y-1">
            <p className="px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Account</p>
            {bottomItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  pathname === item.href 
                    ? "bg-blue-50 text-blue-700 font-bold" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                } ${item.adminOnly ? "text-indigo-600 mt-4 border border-indigo-100" : ""}`}
              >
                <item.icon className={`w-4 h-4 ${item.adminOnly ? "text-indigo-600" : ""}`} />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        
        {/* User Badge */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 group cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-colors">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm ring-2 ring-white">
              {userData ? initials : "..."}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-slate-900 truncate">{userData ? (userData.full_name || "User") : "Loading..."}</p>
              <p className="text-xs text-slate-500 font-medium truncate">Free Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center w-full max-w-md">
            <div className="relative w-full hidden md:block group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search queries, reports, or datasets (Ctrl+K)" 
                className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all text-slate-900 font-medium"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors hover:bg-slate-100 rounded-full">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-10 overflow-x-hidden">
          {children}
        </main>
      </div>

    </div>
  );
}
