import os

def create_page(path, component_name, title, desc):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(f'''export default function {component_name}() {{
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{title}</h1>
        <p className="text-slate-500 font-medium mt-2 max-w-2xl">{desc}</p>
      </div>
      
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 flex items-center justify-center min-h-[400px]">
        <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Component content goes here</p>
      </div>
    </div>
  );
}}
''')

# Dashboard Pages
dashboard_base = "c:/Users/azwaj/OneDrive/Desktop/ai-data-analyst/frontend/app/dashboard"
create_page(f"{dashboard_base}/upload/page.tsx", "UploadDataPage", "Upload Data", "Simply drag and drop your CSV or Excel files below to securely process them into your analytical workspace.")
create_page(f"{dashboard_base}/analysis/page.tsx", "AnalysisPage", "AI Data Analysis", "Review parsed data tables, distributions, missing values, and high-level AI-generated summaries.")
create_page(f"{dashboard_base}/trends/page.tsx", "TrendsPage", "Trends & Reports", "Interact with automatically plotted bar charts, line graphs, and correlation matrices.")
create_page(f"{dashboard_base}/export/page.tsx", "ExportPage", "Export Center", "Download your AI-generated intelligence as presentation-ready PDFs or shareable Excel deliverables.")
create_page(f"{dashboard_base}/ask/page.tsx", "AskAIPage", "Ask AI Q&A", "Chat directly with your dataset. Ask natural language questions and get immediate statistical answers.")
create_page(f"{dashboard_base}/settings/page.tsx", "SettingsPage", "Account Settings", "Manage your profile information, workspace configurations, and security preferences including 2FA.")
create_page(f"{dashboard_base}/billing/page.tsx", "BillingPage", "Subscription & Billing", "Upgrade your plan, review usage limits, and download past invoices here.")
create_page(f"{dashboard_base}/notifications/page.tsx", "NotificationsPage", "Notifications", "Review AI insight alerts, system updates, and collaboration messages.")

# Admin Layout
admin_base = "c:/Users/azwaj/OneDrive/Desktop/ai-data-analyst/frontend/app/admin"
os.makedirs(admin_base, exist_ok=True)

with open(f"{admin_base}/layout.tsx", "w", encoding="utf-8") as f:
    f.write('''import Link from "next/link";
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-900 flex text-white font-sans selection:bg-indigo-500/30">
      <aside className="w-64 border-r border-slate-800 p-6 flex flex-col">
        <Link href="/" className="text-2xl font-black mb-12 tracking-tighter">AI Analyst <span className="text-indigo-500 text-sm align-top">Admin</span></Link>
        <nav className="space-y-4 font-bold text-sm text-slate-400">
          <Link href="/admin" className="block hover:text-white transition-colors">Overview</Link>
          <Link href="/admin/users" className="block hover:text-white transition-colors">User Management</Link>
          <Link href="/admin/plans" className="block hover:text-white transition-colors">Plan Config</Link>
          <Link href="/admin/analytics" className="block hover:text-white transition-colors">Payment Analytics</Link>
        </nav>
      </aside>
      <main className="flex-1 p-12 bg-slate-950">
        {children}
      </main>
    </div>
  );
}
''')

# Admin Pages
create_page(f"{admin_base}/page.tsx", "AdminDashboardPage", "System Overview", "High-level metrics including total MRR, total weekly active users, and system resource utilization.")
create_page(f"{admin_base}/users/page.tsx", "AdminUsersPage", "User Management", "Search, filter, edit, or ban user accounts. Review API key usage per organization.")
create_page(f"{admin_base}/plans/page.tsx", "AdminPlansPage", "Subscription Plans", "Modify plan limits, create promo codes, or switch provider strategies.")
create_page(f"{admin_base}/analytics/page.tsx", "AdminAnalyticsPage", "Payment Analytics", "Integrates directly with Stripe metrics to visualize SaaS runway, churn rates, and growth multipliers.")

print("All dashboard and admin structure pages generated safely.")
