"use client";

import Link from "next/link";
import { BarChart2, MessageCircle, Globe, Users, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1120] text-slate-300 pt-20 pb-10 border-t border-slate-800 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-900/20 blur-[120px] rounded-full point-events-none -z-10" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand & Tagline */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 ring-2 ring-white/10">
                <BarChart2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-extrabold tracking-tighter text-white">
                AI<span className="text-blue-500">Analyst</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-8 pr-4">
              Unlock the hidden value in your datasets. Join over 10,000 teams who use our AI engine to automatically visualize and query data without code.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {[
                { icon: MessageCircle, href: "https://twitter.com", label: "Twitter" },
                { icon: Globe, href: "https://github.com", label: "GitHub" },
                { icon: Users, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: Mail, href: "mailto:hello@aianalyst.com", label: "Email" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Product</h3>
            <ul className="space-y-4">
              {[
                { name: "Home", href: "/" },
                { name: "Features", href: "/features" },
                { name: "Pricing", href: "/pricing" },
                { name: "Dashboard", href: "/dashboard" },
              ].map((link, i) => (
                <li key={i}>
                  <Link 
                    href={link.href}
                    className="text-sm font-medium text-slate-400 hover:text-blue-400 hover:pl-2 transition-all duration-300 inline-block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Resources</h3>
            <ul className="space-y-4">
              {[
                { name: "Blog & News", href: "/blog" },
                { name: "Help Center", href: "/faq" },
                { name: "API Documentation", href: "#", external: true },
                { name: "System Status", href: "/maintenance" },
              ].map((link, i) => (
                <li key={i}>
                  <Link 
                    href={link.href}
                    target={link.external ? "_blank" : "_self"}
                    rel={link.external ? "noopener noreferrer" : ""}
                    className="text-sm font-medium text-slate-400 hover:text-blue-400 hover:pl-2 transition-all duration-300 inline-block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Legal & Contact */}
          <div>
            <h3 className="text-white font-bold mb-6 text-sm tracking-widest uppercase">Legal</h3>
            <ul className="space-y-4">
              {[
                { name: "Contact Us", href: "/contact" },
                { name: "Privacy Policy", href: "/policy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Cookie Settings", href: "#" },
              ].map((link, i) => (
                <li key={i}>
                  <Link 
                    href={link.href}
                    className="text-sm font-medium text-slate-400 hover:text-blue-400 hover:pl-2 transition-all duration-300 inline-block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer Bottom Setup */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm font-medium">
            © {currentYear} AI Analyst Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-slate-300">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            All systems operational
          </div>
        </div>

      </div>
    </footer>
  );
}
