import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - AI Data Analyst",
  description: "Analyze your data with the power of Groq AI.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {children}
    </div>
  );
}
