"use client";

import { useState } from "react";
import { 
  Users, Search, Filter, MoreHorizontal, 
  Shield, CheckCircle2, UserPlus, Mail,
  Trash2, Edit, ChevronRight, Zap
} from "lucide-react";

const users = [
  { id: 1, name: "Zeeshan Ahmed", email: "zeeshan@example.com", plan: "Pro", status: "Active", joined: "Mar 12, 2026", uploads: 42 },
  { id: 2, name: "Sarah Khan", email: "sarah@example.com", plan: "Starter", status: "Active", joined: "Mar 15, 2026", uploads: 12 },
  { id: 3, name: "John Doe", email: "john@example.com", plan: "Free", status: "Inactive", joined: "Feb 28, 2026", uploads: 3 },
  { id: 4, name: "Alice Baker", email: "alice@example.com", plan: "Pro", status: "Active", joined: "Mar 20, 2026", uploads: 89 },
  { id: 5, name: "Bob Smith", email: "bob@example.com", plan: "Starter", status: "Active", joined: "Mar 22, 2026", uploads: 5 },
  { id: 6, name: "Charlie Roy", email: "charlie@example.com", plan: "Free", status: "Banned", joined: "Mar 01, 2026", uploads: 0 },
];

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-20 px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">User Management</h1>
          <p className="text-slate-500 font-medium">Global database of users, subscriptions and access logs.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center gap-2 active:scale-95">
             <UserPlus className="w-4 h-4" />
             Add New User
           </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden p-8">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-10">
           <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search by name, email or plan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all font-bold text-sm text-slate-700"
              />
           </div>
           <div className="flex items-center gap-3">
              <button className="p-3 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-100 transition-all border border-slate-200">
                <Filter className="w-5 h-5" />
              </button>
              <button className="px-4 py-2.5 bg-slate-50 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-100 transition-all border border-slate-200">
                Download CSV
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-6 text-xs font-black text-slate-400 uppercase tracking-widest px-4">User</th>
                <th className="pb-6 text-xs font-black text-slate-400 uppercase tracking-widest px-4">Plan</th>
                <th className="pb-6 text-xs font-black text-slate-400 uppercase tracking-widest px-4">Usage</th>
                <th className="pb-6 text-xs font-black text-slate-400 uppercase tracking-widest px-4">Status</th>
                <th className="pb-6 text-xs font-black text-slate-400 uppercase tracking-widest px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="py-6 px-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-400">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 leading-none">{user.name}</p>
                        <p className="text-xs text-slate-400 font-medium mt-1 font-sans">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-4">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                      user.plan === 'Pro' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 
                      user.plan === 'Starter' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}>
                      {user.plan}
                    </span>
                  </td>
                  <td className="py-6 px-4">
                     <div>
                        <p className="text-sm font-bold text-slate-700">{user.uploads} Uploads</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Joined: {user.joined}</p>
                     </div>
                  </td>
                  <td className="py-6 px-4">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${
                         user.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 
                         user.status === 'Banned' ? 'bg-rose-500' : 'bg-slate-300'
                       }`} />
                       <span className="text-sm font-bold text-slate-600">{user.status}</span>
                    </div>
                  </td>
                  <td className="py-6 px-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all">
                          <Edit className="w-4 h-4" />
                       </button>
                       <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-rose-600 hover:border-rose-100 transition-all">
                          <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="pt-8 mt-8 border-t border-slate-100 flex items-center justify-between text-slate-500 text-sm font-bold">
           <p>Showing 1 to 6 of 1,248 users</p>
           <div className="flex items-center gap-2">
              <button className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all active:scale-95 disabled:opacity-50" disabled>Previous</button>
              <button className="px-4 py-2 rounded-xl bg-slate-900 text-white shadow-lg active:scale-95">Next</button>
           </div>
        </div>
      </div>
    </div>
  );
}
