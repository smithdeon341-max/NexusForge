"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Settings, Plus, Search, MoreHorizontal, Calendar, Building2, User, 
  Code2, LayoutDashboard, Briefcase, Target, BarChart3, Users, X
} from "lucide-react";

// --- DUMMY DATA ---
const INITIAL_DEV_PROJECTS = [
  { id: 1, name: "Forge AI Engine", business: "NexusForge Labs", status: "Active", employee: "Admin", timeframe: "Present", tools: ["Next.js", "Vercel AI SDK", "Gemini"] },
  { id: 2, name: "Ember Dating Swipe Logic", business: "StudioSocial", status: "Completed", employee: "Marcus Tech", timeframe: "Past", tools: ["React", "Framer Motion", "Supabase RLS"] },
  { id: 3, name: "Real-time Video CDN", business: "We The People App", status: "Draft", employee: "Sarah Jenkins", timeframe: "Future", tools: ["LiveKit", "Mux", "WebRTC"] },
];

// --- CUSTOM TAG INPUT COMPONENT ---
// Allows you to type a tool, hit enter, and it turns into a tag
function TagInput({ tags, onChange }: { tags: string[], onChange: (tags: string[]) => void }) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        onChange([...tags, input.trim()]);
      }
      setInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-1.5 bg-zinc-950/50 border border-zinc-700 rounded-lg focus-within:border-blue-500 transition-colors">
      {tags.map(tag => (
        <span key={tag} className="flex items-center gap-1 bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
          {tag}
          <button onClick={() => removeTag(tag)} className="hover:text-white transition-colors"><X size={12} /></button>
        </span>
      ))}
      <input 
        type="text" 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type tool & hit enter..."
        className="bg-transparent text-xs text-white focus:outline-none min-w-[120px] flex-1 py-1"
      />
    </div>
  );
}

// --- MAIN DEVELOPMENT DASHBOARD ---
export default function DevelopmentDashboard() {
  const [projects, setProjects] = useState(INITIAL_DEV_PROJECTS);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Status Badge Styling
  const getStatusBadge = (status: string) => {
    if (status === 'Active') return <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest">Active</span>;
    if (status === 'Completed') return <span className="bg-zinc-800 text-zinc-400 border border-zinc-700 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest">Completed</span>;
    return <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest">Draft</span>;
  };

  return (
    <main className="min-h-screen bg-black text-zinc-200 font-sans">
      
      {/* HEADER NAVIGATION */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-white">
            <Settings className="text-blue-500" size={28} />
            <h1 className="text-2xl font-black tracking-tight">Development</h1>
          </div>
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><LayoutDashboard size={16}/> Home</Link>
            <Link href="/businesses" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><Building2 size={16}/> Businesses</Link>
            <Link href="/projects" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><Briefcase size={16}/> Projects</Link>
            <Link href="/plans" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><Target size={16}/> Plans</Link>
            <Link href="/analytics" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><BarChart3 size={16}/> Analytics</Link>
            <Link href="/hr" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><Users size={16}/> HR</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input type="text" placeholder="Search dev stack..." className="bg-zinc-900 border border-zinc-800 text-sm text-white rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-blue-500 w-64" />
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all text-sm">
            <Plus size={16} /> New Stack
          </button>
        </div>
      </header>

      {/* DATA TABLE SECTION */}
      <div className="p-6 max-w-[1600px] mx-auto">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
          
          <table className="w-full text-left border-collapse">
            
            {/* Table Headers */}
            <thead>
              <tr className="bg-zinc-950/50 border-b border-zinc-800 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                <th className="p-4 pl-6">Project Name</th>
                <th className="p-4">Business</th>
                <th className="p-4">Status & Time</th>
                <th className="p-4">Lead Dev</th>
                <th className="p-4 w-1/3">Favorite Tools & Stack</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            
            {/* Table Body */}
            <tbody className="divide-y divide-zinc-800 text-sm">
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-zinc-800/50 transition-colors group">
                  
                  {/* Name */}
                  <td className="p-4 pl-6">
                    <div className="font-bold text-white flex items-center gap-2">
                      <Code2 size={16} className="text-blue-500" />
                      {proj.name}
                    </div>
                  </td>
                  
                  {/* Business */}
                  <td className="p-4 text-zinc-300">
                    <div className="flex items-center gap-2">
                      <Building2 size={14} className="text-zinc-500" />
                      {proj.business}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <div className="flex flex-col gap-2 items-start">
                      {getStatusBadge(proj.status)}
                      <span className="text-[10px] font-bold text-zinc-500 flex items-center gap-1 uppercase tracking-wider">
                        <Calendar size={12}/> {proj.timeframe}
                      </span>
                    </div>
                  </td>

                  {/* Employee */}
                  <td className="p-4 text-zinc-300">
                    <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 px-2 py-1 rounded-md w-fit">
                      <User size={14} className="text-zinc-500" />
                      <span className="font-semibold">{proj.employee}</span>
                    </div>
                  </td>

                  {/* Tools / Tag Input */}
                  <td className="p-4">
                    {editingId === proj.id ? (
                      <TagInput 
                        tags={proj.tools} 
                        onChange={(newTags) => {
                          setProjects(projects.map(p => p.id === proj.id ? { ...p, tools: newTags } : p));
                        }} 
                      />
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {proj.tools.map(tool => (
                          <span key={tool} className="bg-zinc-800 text-zinc-300 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="p-4 pr-6 text-right">
                    <button 
                      onClick={() => setEditingId(editingId === proj.id ? null : proj.id)}
                      className="text-zinc-500 hover:text-white bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                    >
                      {editingId === proj.id ? 'Done' : 'Edit Stack'}
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </main>
  );
}