import { FileText, ArrowUpRight, ArrowDownRight, Users, Infinity } from "lucide-react";

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back, John</h1>
        <p className="text-slate-500 font-medium mt-1">Here is the latest intelligence derived from your datasets.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Datasets", value: "24", change: "+12%", trend: "up" },
          { label: "Queries Run", value: "1,490", change: "+4%", trend: "up" },
          { label: "Insights Generated", value: "342", change: "+24%", trend: "up" },
          { label: "Active Team Members", value: "5", change: "-2%", trend: "down" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[1.5rem] border border-slate-200 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:border-slate-300 transition-colors">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h2 className="text-3xl font-black text-slate-900">{stat.value}</h2>
              <div className={`flex items-center gap-1 text-sm font-bold ${stat.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts & Activity Split */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-[1.5rem] border border-slate-200 shadow-sm p-6 h-[400px] flex flex-col items-center justify-center text-slate-400 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
          <Infinity className="w-12 h-12 mb-4 text-blue-200" />
          <p className="font-bold text-slate-500">Analytics Graph Area</p>
          <p className="text-sm">Connect a dataset to populate visualizations.</p>
        </div>
        
        <div className="bg-white rounded-[1.5rem] border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6 tracking-tight">Recent Uploads</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors shrink-0">
                  <FileText className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">Q3_Marketing_Spend_v{i}.csv</p>
                  <p className="text-xs text-slate-500 font-medium">Updated 2h ago • 1.4MB</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
