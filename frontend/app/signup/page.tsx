"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Loader2, BarChart2, CheckCircle2, Shield, Zap, Sparkles, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const hasName = formData.name.length > 2;
  const isEmailValid = formData.email.includes("@") && formData.email.includes(".");
  // Reduced to 6 characters so the button becomes active
  const isPasswordStrong = formData.password.length >= 6;
  const passwordsMatch = formData.password === formData.confirmPassword && formData.password !== "";
  const isFormValid = hasName && isEmailValid && isPasswordStrong && passwordsMatch && formData.agreeTerms;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });
      
      if (response.ok) {
        // Automatically login the user after register
        const loginRes = await fetch("http://localhost:8000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });
        
        if (loginRes.ok) {
          const data = await loginRes.json();
          localStorage.setItem("token", data.access_token);
          window.location.href = "/onboarding";
        }
      } else {
        const errorData = await response.json();
        alert(errorData.detail || "Registration failed");
        setIsLoading(false);
      }
    } catch (error) {
      alert("Network error. Please make sure backend is running.");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-slate-50">
      
      {/* Left Panel: Signup Form */}
      <div className="flex items-center justify-center p-6 sm:p-12 relative h-full">
        {/* Home Button */}
        <Link 
          href="/" 
          className="absolute top-6 right-6 lg:top-8 lg:right-8 flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors bg-white hover:bg-slate-50 px-4 py-2 rounded-full border border-slate-200 shadow-sm z-50 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="hidden sm:block">Home</span>
        </Link>
        
        {/* Mobile Nav Top */}
        <div className="absolute top-6 left-6 lg:hidden">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <BarChart2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-slate-900 hidden sm:block">
              AI Analyst
            </span>
          </Link>
        </div>

        <div className="w-full max-w-[440px] space-y-8 bg-white p-8 sm:p-10 rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-slate-100 mt-12 lg:mt-0">
          
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Get started</h1>
            <p className="text-slate-500 text-sm font-medium">
              Create your account to start analyzing data with AI.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            
            {/* Full Name */}
            <div className="space-y-1.5 group">
              <label className="text-sm font-bold text-slate-700 group-focus-within:text-blue-600 transition-colors">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all placeholder-slate-400 text-slate-900"
                required
              />
            </div>

            {/* Email Field */}
            <div className="space-y-1.5 group">
              <label className="text-sm font-bold text-slate-700 group-focus-within:text-blue-600 transition-colors">Work Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all placeholder-slate-400 text-slate-900"
                required
              />
            </div>

            {/* Password Field */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5 group">
                <label className="text-sm font-bold text-slate-700 group-focus-within:text-blue-600 transition-colors">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all placeholder-slate-400 text-slate-900 pr-10"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5 group">
                <label className="text-sm font-bold text-slate-700 group-focus-within:text-blue-600 transition-colors">Confirm</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all placeholder-slate-400 text-slate-900 pr-10"
                    required
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors">
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Password validation UI */}
            <AnimatePresence>
              {formData.confirmPassword.length > 0 && !passwordsMatch && (
                <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="text-red-500 text-xs font-semibold">
                  Passwords do not match.
                </motion.p>
              )}
            </AnimatePresence>

            {/* Terms and Conditions */}
            <div className="flex items-start gap-2 pt-2">
              <input
                id="agreeTerms"
                name="agreeTerms"
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="w-4 h-4 mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20 cursor-pointer"
                required
              />
              <label htmlFor="agreeTerms" className="text-xs text-slate-500 font-medium leading-tight">
                I agree to the <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link> and <Link href="/policy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className={`w-full relative flex items-center justify-center py-3.5 px-4 rounded-xl text-white font-bold transition-all duration-300 mt-2 ${
                isFormValid && !isLoading
                  ? "bg-blue-600 hover:bg-blue-700 shadow-[0_8px_20px_0_rgba(37,99,235,0.3)] transform hover:-translate-y-0.5"
                  : "bg-slate-300 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Create free account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-bold tracking-widest uppercase">Or Continue With</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Social Logins */}
          <div className="flex gap-4 relative z-10 w-full">
            <button 
              type="button"
              onClick={async () => {
                try {
                  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
                    alert("Supabase URL is missing from environment variables on Vercel!");
                    return;
                  }
                  const { error } = await supabase.auth.signInWithOAuth({
                    provider: 'google',
                    options: {
                      redirectTo: `${window.location.origin}/dashboard`
                    }
                  });
                  if (error) alert("Login error: " + error.message);
                } catch (e: any) {
                  alert("Error: " + e.message);
                }
              }}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-slate-700 font-bold text-sm z-50 pointer-events-auto cursor-pointer"
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
                try {
                  const { error } = await supabase.auth.signInWithOAuth({
                    provider: 'github',
                    options: {
                      redirectTo: `${window.location.origin}/dashboard`
                    }
                  });
                  if (error) alert("Login error: " + error.message);
                } catch (e: any) {
                  alert("Error: " + e.message);
                }
              }}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm text-slate-700 font-bold text-sm z-50 pointer-events-auto cursor-pointer"
            >
              <svg className="w-5 h-5 text-slate-900" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
              </svg>
              GitHub
            </button>
          </div>

          <p className="text-center text-sm text-slate-500 font-medium pt-2">
            Already have an account?{" "}
            <Link href="/login" className="text-slate-900 hover:text-blue-600 font-bold transition-colors">
              Log in instead
            </Link>
          </p>

        </div>
      </div>

      {/* Right Panel: Feature Showcase (Visible on lg screens) */}
      <div className="hidden lg:flex flex-col relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-900 border-l border-slate-200 p-12 justify-center items-center">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] mix-blend-overlay" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-tr from-blue-400/20 to-purple-400/20 blur-[120px] rounded-full mix-blend-screen -z-10" />
        
        <div className="relative z-10 w-full max-w-lg mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white"
          >
            <div className="inline-flex items-center gap-2 mb-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-2xl">
              <Sparkles className="w-4 h-4 text-blue-200" />
              <span className="text-xs font-bold tracking-widest text-blue-100 uppercase">Automated Intelligence</span>
            </div>
            <h2 className="text-5xl font-extrabold leading-[1.1] mb-6 tracking-tight text-white drop-shadow-md">
              Unlock the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200">hidden value</span> in your data.
            </h2>
            <p className="text-blue-100/80 text-lg font-medium leading-relaxed">Join highly-effective teams using our AI engine to query, interpret, and visually communicate their data—zero coding required.</p>
          </motion.div>
        </div>

        {/* Floating Mockup Component */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="relative z-10 w-full max-w-lg"
        >
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-2xl overflow-hidden relative group hover:bg-white/15 transition-colors duration-500">
            {/* Glowing orb inside card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/30 blur-[60px] rounded-full -z-10 group-hover:bg-indigo-400/40 transition-colors duration-500" />
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
              </div>
              <div className="flex gap-2">
                <div className="w-12 h-2 rounded-full bg-white/20" />
                <div className="w-20 h-2 rounded-full bg-white/20" />
              </div>
            </div>

            {/* Mock Chart Area */}
            <div className="space-y-4">
              <div className="flex gap-4 h-32 items-end">
                {[40, 70, 45, 90, 65, 100, 80].map((height, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 1, delay: 0.5 + (i * 0.1), ease: "easeOut" }}
                    className="flex-1 bg-gradient-to-t from-blue-500/50 to-indigo-400/80 rounded-t-md relative group/bar cursor-pointer"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-8 h-6 bg-white rounded-md flex items-center justify-center text-[10px] font-bold text-slate-900 opacity-0 group-hover/bar:opacity-100 transition-opacity shadow-lg">
                      {height}%
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="h-px w-full bg-white/10" />
              
              <div className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/5">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                  <BarChart2 className="w-4 h-4 text-blue-200" />
                </div>
                <div className="flex-1">
                  <div className="h-2 w-32 bg-white/20 rounded-full mb-1.5" />
                  <div className="h-1.5 w-20 bg-white/10 rounded-full" />
                </div>
                <div className="text-emerald-300 text-xs font-bold">+24.5%</div>
              </div>
            </div>
            
          </div>

          {/* Floating Accents */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute -right-6 -bottom-6 w-32 h-32 bg-[url('/grid.svg')] bg-cover opacity-20 rounded-full mix-blend-screen"
          />
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="absolute -left-10 top-1/4 bg-white p-3 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-3 z-20"
          >
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Zap className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-900">Real-time</div>
              <div className="text-[10px] text-slate-500">Processing</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
    </main>
  );
}
