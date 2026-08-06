"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Users, LayoutDashboard, Building2, Briefcase, Target, Settings, BarChart3, 
  Search, Plus, FileText, UserPlus, Phone, Mail, MoreHorizontal, FileSignature, 
  BookOpen, FolderOpen, Download
} from "lucide-react";

// --- DUMMY DATA ---
const EMPLOYEES = [
  { id: 1, name: "Marcus Tech", role: "Lead Developer", department: "Engineering", business: "NexusForge Labs", email: "marcus@nexusforge.com", phone: "(555) 123-4567", status: "Active" },
  { id: 2, name: "Sarah Jenkins", role: "HR Manager", department: "Operations", business: "StudioSocial", email: "sarah@studiosocial.app", phone: "(555) 987-6543", status: "Active" },
  { id: 3, name: "Jessica Cole", role: "Content Director", department: "Marketing", business: "We The People", email: "jessica@wethepeople.app", phone: "(555) 345-6789", status: "On Leave" },
];

const DOCUMENTS = [
  { id: 1, category: "Policies", title: "2026 Code of Ethics & Conduct.pdf", size: "2.4 MB", date: "Jan 15, 2026", icon: BookOpen },
  { id: 2, category: "Procedures", title: "Remote Work Security Protocol.pdf", size: "1.1 MB", date: "Feb 02, 2026", icon: FileText },
  { id: 3, category: "Contracts", title: "Standard NDA & Non-Compete (Template).pdf", size: "845 KB", date: "Jan 10, 2026", icon: FileSignature },
  { id: 4, category: "Forms", title: "Direct Deposit Authorization Form.pdf", size: "420 KB", date: "Mar 01, 2026", icon: FolderOpen },
];

const TABS = ["Directory", "Policies & Procedures", "Contracts", "Forms"];

export default function HRDashboard() {
  const [activeTab, setActiveTab] = useState("Directory");

  // Helper to filter documents based on the active tab
  const getFilteredDocs = () => {
    if (activeTab === "Policies & Procedures") return DOCUMENTS.filter(d => d.category === "Policies" || d.category === "Procedures");
    if (activeTab === "Contracts") return DOCUMENTS.filter(d => d.category === "Contracts");
    if (activeTab === "Forms") return DOCUMENTS.filter(d => d.category === "Forms");
    return [];
  };

  return (
    <main className="min-h-screen bg-black text-zinc-200 font-sans">
      
      {/* HEADER NAVIGATION */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-white">
            <Users className="text-blue-500" size={28} />
            <h1 className="text-2xl font-black tracking-tight">Human Resources</h1>
          </div>
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><LayoutDashboard size={16}/> Home</Link>
            <Link href="/businesses" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><Building2 size={16}/> Businesses</Link>
            <Link href="/projects" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><Briefcase size={16}/> Projects</Link>
            <Link href="/plans" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><Target size={16}/> Plans</Link>
            <Link href="/development" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><Settings size={16}/> Development</Link>
            <Link href="/analytics" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><BarChart3 size={16}/> Analytics</Link>
          </nav>
        </div>
      </header>

      <div className="p-6 max-w-[1600px] mx-auto">
        
        {/* TABS NAVIGATION */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex gap-1 bg-zinc-900 border border-zinc-800 p-1 rounded-xl w-fit">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${
                  activeTab === tab 
                    ? "bg-zinc-800 text-white shadow-sm" 
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Contextual Action Button (Changes based on active tab) */}
          <button className="bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all text-sm">
            {activeTab === "Directory" ? (
              <><UserPlus size={16} /> Add Employee</>
            ) : (
              <><Plus size={16} /> Upload Document</>
            )}
          </button>
        </div>

        {/* TAB CONTENT: DIRECTORY */}
        {activeTab === "Directory" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Search/Filter Bar */}
            <div className="p-4 border-b border-zinc-800 flex gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                <input type="text" placeholder="Search employees by name, role, or email..." className="w-full bg-zinc-950 border border-zinc-800 text-sm text-white rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-blue-500" />
              </div>
            </div>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-950/50 border-b border-zinc-800 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  <th className="p-4 pl-6">Employee</th>
                  <th className="p-4">Business & Dept</th>
                  <th className="p-4">Contact Info</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-sm">
                {EMPLOYEES.map((emp) => (
                  <tr key={emp.id} className="hover:bg-zinc-800/50 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="font-bold text-white text-base">{emp.name}</div>
                      <div className="text-zinc-400">{emp.role}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-zinc-300 mb-1">
                        <Building2 size={14} className="text-blue-500" /> {emp.business}
                      </div>
                      <div className="text-zinc-500 text-xs font-semibold">{emp.department}</div>
                    </td>
                    <td className="p-4 space-y-1">
                      <div className="flex items-center gap-2 text-zinc-300">
                        <Mail size={14} className="text-zinc-500" /> {emp.email}
                      </div>
                      <div className="flex items-center gap-2 text-zinc-300">
                        <Phone size={14} className="text-zinc-500" /> {emp.phone}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest border ${
                        emp.status === 'Active' 
                          ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                          : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <button className="text-zinc-500 hover:text-white p-2 bg-zinc-950 border border-zinc-800 rounded-lg transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB CONTENT: DOCUMENTS (Policies, Contracts, Forms) */}
        {activeTab !== "Directory" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {getFilteredDocs().map(doc => {
              const Icon = doc.icon;
              return (
                <div key={doc.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 hover:border-blue-500/50 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 border border-blue-500/20">
                      <Icon size={24} />
                    </div>
                    <button className="text-zinc-500 hover:text-white bg-zinc-950 p-2 rounded-lg border border-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Download size={16} />
                    </button>
                  </div>
                  <h3 className="font-bold text-white mb-2 leading-tight line-clamp-2" title={doc.title}>
                    {doc.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-zinc-500 font-semibold mt-4 pt-4 border-t border-zinc-800">
                    <span>{doc.size}</span>
                    <span>Updated: {doc.date}</span>
                  </div>
                </div>
              )
            })}
            
            {/* Empty State if no docs */}
            {getFilteredDocs().length === 0 && (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-zinc-800 rounded-2xl">
                <FileText size={48} className="text-zinc-700 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-zinc-400">No documents found</h3>
                <p className="text-sm text-zinc-500 mt-1">Upload a PDF to get started.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  );
}