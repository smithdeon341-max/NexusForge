"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Target, Edit3, Save, X, Plus, Calendar, AlertCircle, 
  CheckCircle2, LayoutDashboard, Briefcase, Settings, BarChart3, Users, Building2 
} from "lucide-react";

// --- DUMMY DATA ---
const INITIAL_PLANS = [
  {
    id: 1,
    title: "Q3 Financial Restructuring",
    status: "Active",
    timeframe: "Present",
    content: "We need to reallocate 15% of the marketing budget towards the new WebRTC server infrastructure to handle the increased load from StudioSocial.",
  },
  {
    id: 2,
    title: "AI Automation Rollout",
    status: "Draft",
    timeframe: "Future",
    content: "Phase 1: Integrate Vercel AI Gateway.\nPhase 2: Fine-tune local Llama 3 model for customer support.\nPhase 3: Deploy to production by Q4.",
  },
  {
    id: 3,
    title: "Enterprise Onboarding Revamp",
    status: "Completed",
    timeframe: "Past",
    content: "Successfully implemented the 6-digit secure invite code flow for all B2B clients using Supabase RLS.",
  }
];

// --- INDIVIDUAL CARD COMPONENT ---
function PlanCard({ plan, onSave }: { plan: any, onSave: (plan: any) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPlan, setEditedPlan] = useState(plan);

  if (isEditing) {
    return (
      <div className="bg-zinc-900 border border-blue-500 rounded-2xl p-5 shadow-2xl shadow-blue-900/10 mb-6 break-inside-avoid relative overflow-hidden ring-4 ring-blue-500/10">
        <input 
          type="text" 
          value={editedPlan.title}
          onChange={(e) => setEditedPlan({...editedPlan, title: e.target.value})}
          className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-white font-bold mb-4 focus:outline-none focus:border-blue-500"
        />
        <div className="flex gap-2 mb-4">
          <select 
            value={editedPlan.timeframe}
            onChange={(e) => setEditedPlan({...editedPlan, timeframe: e.target.value})}
            className="bg-zinc-950 border border-zinc-700 text-zinc-300 text-xs rounded px-2 py-1 focus:outline-none focus:border-blue-500"
          >
            <option value="Past">Past</option>
            <option value="Present">Present</option>
            <option value="Future">Future</option>
          </select>
          <select 
            value={editedPlan.status}
            onChange={(e) => setEditedPlan({...editedPlan, status: e.target.value})}
            className="bg-zinc-950 border border-zinc-700 text-zinc-300 text-xs rounded px-2 py-1 focus:outline-none focus:border-blue-500"
          >
            <option value="Draft">Draft</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <textarea 
          value={editedPlan.content}
          onChange={(e) => setEditedPlan({...editedPlan, content: e.target.value})}
          rows={5}
          className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-300 text-sm mb-4 focus:outline-none focus:border-blue-500 resize-none"
        />
        <div className="flex justify-end gap-2">
          <button 
            onClick={() => setIsEditing(false)}
            className="text-zinc-400 hover:text-white p-2 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
          <button 
            onClick={() => { onSave(editedPlan); setIsEditing(false); }}
            className="bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1 px-4 py-2 rounded-lg font-bold text-sm transition-colors"
          >
            <Save size={16} /> Save
          </button>
        </div>
      </div>
    );
  }

  // Visual styling based on status/timeframe
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Completed': return 'text-zinc-400 bg-zinc-800 border-zinc-700';
      default: return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors mb-6 break-inside-avoid group relative">
      {/* Edit Button (Visible on Hover) */}
      <button 
        onClick={() => setIsEditing(true)}
        className="absolute top-4 right-4 text-zinc-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800 p-1.5 rounded-lg border border-zinc-700"
      >
        <Edit3 size={16} />
      </button>

      <div className="flex flex-wrap gap-2 mb-4 pr-10">
        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded border ${getStatusColor(plan.status)}`}>
          {plan.status}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded flex items-center gap-1">
          <Calendar size={12} /> {plan.timeframe}
        </span>
      </div>

      <h3 className="text-xl font-bold text-white mb-3 leading-tight">{plan.title}</h3>
      
      <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-wrap">
        {plan.content}
      </p>
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function PlansDashboard() {
  const [plans, setPlans] = useState(INITIAL_PLANS);

  const handleSavePlan = (updatedPlan: any) => {
    setPlans(plans.map(p => p.id === updatedPlan.id ? updatedPlan : p));
    // Here is where you would run: supabase.from('plans').update(updatedPlan).eq('id', updatedPlan.id)
  };

  return (
    <main className="min-h-screen bg-black text-zinc-200 font-sans">
      
      {/* HEADER NAVIGATION (Matching previous pages) */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-white">
            <Target className="text-blue-500" size={28} />
            <h1 className="text-2xl font-black tracking-tight">Plans</h1>
          </div>
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><LayoutDashboard size={16}/> Home</Link>
            <Link href="/businesses" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><Building2 size={16}/> Businesses</Link>
            <Link href="/projects" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><Briefcase size={16}/> Projects</Link>
            <Link href="/development" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><Settings size={16}/> Development</Link>
            <Link href="/analytics" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><BarChart3 size={16}/> Analytics</Link>
            <Link href="/hr" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><Users size={16}/> HR</Link>
          </nav>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all text-sm">
          <Plus size={16} /> New Plan
        </button>
      </header>

      {/* MASONRY WALL */}
      <div className="p-6 max-w-[1600px] mx-auto">
        
        {/* Tailwind columns utility creates the Pinterest-style masonry grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {plans.map((plan) => (
            <PlanCard 
              key={plan.id} 
              plan={plan} 
              onSave={handleSavePlan} 
            />
          ))}
        </div>

      </div>

    </main>
  );
}