"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, BarChart2, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Simple validation
  const isEmailValid = email.includes("@") && email.includes(".");
  const isPasswordValid = password.length > 5;
  const isFormValid = isEmailValid && isPasswordValid;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.access_token);
        window.location.href = "/dashboard";
      } else {
        const errorData = await response.json();
        alert(errorData.detail || "Invalid credentials");
        setIsLoading(false);
      }
    } catch (error) {
      alert("Network error connecting to Backend API.");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* Left Panel: Branding & Illustration (Visible on lg screens) */}
      <div className="hidden lg:flex flex-col relative overflow-hidden bg-slate-900 border-r border-slate-800 p-12 justify-between">
        {/* Abstract Background Effects */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[url('/grid.svg')] opacity-5 animate-[spin_100s_linear_infinite] -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-blue-600/20 to-indigo-600/30 blur-[120px] rounded-full -z-10" />

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <BarChart2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tighter text-white">
              AI<span className="text-blue-500">Analyst</span>
            </span>
          </Link>
        </div>

        {/* Floating Mockup Illustration */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 w-full max-w-lg mx-auto"
        >
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl relative">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-700 pb-4">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <BarChart2 className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex-1">
                <div className="h-3 w-32 bg-slate-700 rounded-full mb-2" />
                <div className="h-2 w-20 bg-slate-700/50 rounded-full" />
              </div>
            </div>
            {/* Fake Chart Lines */}
            <div className="h-32 w-full flex items-end gap-2">
              <div className="w-full bg-slate-700/30 rounded-t-sm" style={{ height: '30%' }} />
              <div className="w-full bg-blue-500/50 rounded-t-sm" style={{ height: '50%' }} />
              <div className="w-full bg-indigo-500/50 rounded-t-sm" style={{ height: '80%' }} />
              <div className="w-full bg-blue-400 rounded-t-sm shadow-[0_0_15px_rgba(96,165,250,0.5)]" style={{ height: '100%' }} />
              <div className="w-full bg-slate-700/30 rounded-t-sm" style={{ height: '40%' }} />
            </div>
            
            {/* Floating Detail Card */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -right-8 -top-8 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-600 text-sm">
                +42%
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 mb-1">Growth Identified</div>
                <div className="text-[10px] text-slate-500">via AI clustering</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="relative z-10 text-slate-400">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex -space-x-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-900 shadow-sm" />
              ))}
            </div>
            <div className="text-sm">
              <div className="flex items-center gap-1 text-white font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                10k+ Analysts
              </div>
              <div>Trust our engine</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="flex items-center justify-center p-6 sm:p-12 relative">
        <Link 
          href="/" 
          className="absolute top-6 right-6 lg:top-8 lg:right-8 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors bg-white hover:bg-slate-50 px-4 py-2 rounded-full border border-slate-200 shadow-sm z-50 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Home</span>
        </Link>
        <div className="w-full max-w-[440px] space-y-8 mt-12 lg:mt-0">
          
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                <BarChart2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tighter text-slate-900">
                AI<span className="text-blue-600">Analyst</span>
              </span>
            </Link>
          </div>

          <div className="text-center lg:text-left space-y-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back</h1>
            <p className="text-slate-500 text-sm md:text-base font-medium">
              Enter your credentials to access your workspaces.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Email Field */}
            <div className="space-y-2 group">
              <label className="text-sm font-semibold text-slate-700 group-focus-within:text-blue-600 transition-colors">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm placeholder-slate-400 text-slate-900"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2 group">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-700 group-focus-within:text-blue-600 transition-colors">
                  Password
                </label>
                <Link href="#" className="text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm placeholder-slate-400 text-slate-900 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20 cursor-pointer"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-slate-600 font-medium cursor-pointer">
                Remember me for 30 days
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className={`w-full relative flex items-center justify-center py-3.5 px-4 rounded-xl text-white font-bold transition-all duration-300 overflow-hidden ${
                isFormValid && !isLoading
                  ? "bg-slate-900 hover:bg-slate-800 shadow-[0_4px_14px_0_rgba(15,23,42,0.39)] transform hover:-translate-y-0.5"
                  : "bg-slate-300 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <span className="flex items-center gap-2">
                  Sign in to workspace
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink-0 mx-4 text-slate-400 text-sm font-medium">OR CONTINUE WITH</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Social Logins */}
          <div className="flex gap-4 relative z-10 w-full">
            <button 
              type="button"
              onClick={async () => {
                await supabase.auth.signInWithOAuth({
                  provider: 'google',
                  options: {
                    redirectTo: `${window.location.origin}/dashboard`
                  }
                });
              }}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-slate-700 font-bold text-sm z-50 pointer-events-auto"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>
            <button 
              type="button"
              onClick={async () => {
                await supabase.auth.signInWithOAuth({
                  provider: 'github',
                  options: {
                    redirectTo: `${window.location.origin}/dashboard`
                  }
                });
              }}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-slate-700 font-bold text-sm z-50 pointer-events-auto"
            >
              <svg className="w-5 h-5 text-slate-900" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
              </svg>
              GitHub
            </button>
          </div>

          <p className="text-center text-sm text-slate-500 font-medium">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-bold transition-colors">
              Create an account
            </Link>
          </p>

        </div>
      </div>
    </main>
  );
}
