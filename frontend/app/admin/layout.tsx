import Link from "next/link";
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
