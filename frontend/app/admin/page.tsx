export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Overview</h1>
        <p className="text-slate-500 font-medium mt-2 max-w-2xl">High-level metrics including total MRR, total weekly active users, and system resource utilization.</p>
      </div>
      
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 flex items-center justify-center min-h-[400px]">
        <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Component content goes here</p>
      </div>
    </div>
  );
}
