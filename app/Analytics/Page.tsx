"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  BarChart3, LayoutDashboard, Building2, Briefcase, Target, Settings, Users, 
  TrendingUp, DollarSign, Activity, Calculator, ArrowRight
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';

// --- DUMMY CHART DATA ---
const BUSINESS_VALUATION_DATA = [
  { name: 'NexusForge', value: 2500000, cost: 1200000 },
  { name: 'StudioSocial', value: 850000, cost: 300000 },
  { name: 'We The People', value: 1200000, cost: 500000 },
];

const MONTHLY_CASHFLOW_DATA = [
  { month: 'Jan', revenue: 45000, burn: 22000 },
  { month: 'Feb', revenue: 52000, burn: 24000 },
  { month: 'Mar', revenue: 48000, burn: 28000 },
  { month: 'Apr', revenue: 61000, burn: 25000 },
  { month: 'May', revenue: 75000, burn: 30000 },
  { month: 'Jun', revenue: 89000, burn: 32000 },
];

export default function AnalyticsDashboard() {
  // Calculator State
  const [calcRevenue, setCalcRevenue] = useState<number | "">("");
  const [calcCost, setCalcCost] = useState<number | "">("");

  // Calculator Math Logic
  const profit = (Number(calcRevenue) || 0) - (Number(calcCost) || 0);
  const margin = Number(calcRevenue) > 0 ? ((profit / Number(calcRevenue)) * 100).toFixed(1) : "0.0";

  return (
    <main className="min-h-screen bg-black text-zinc-200 font-sans pb-12">
      
      {/* HEADER NAVIGATION */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-white">
            <BarChart3 className="text-blue-500" size={28} />
            <h1 className="text-2xl font-black tracking-tight">Analytics</h1>
          </div>
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><LayoutDashboard size={16}/> Home</Link>
            <Link href="/businesses" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><Building2 size={16}/> Businesses</Link>
            <Link href="/projects" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><Briefcase size={16}/> Projects</Link>
            <Link href="/plans" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><Target size={16}/> Plans</Link>
            <Link href="/development" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><Settings size={16}/> Development</Link>
            <Link href="/hr" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><Users size={16}/> HR</Link>
          </nav>
        </div>
      </header>

      <div className="p-6 max-w-[1600px] mx-auto space-y-6">
        
        {/* TOP KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-zinc-800 opacity-50"><DollarSign size={100} /></div>
            <p className="text-zinc-400 text-sm font-bold uppercase tracking-wider mb-2">Total Portfolio Value</p>
            <h2 className="text-4xl font-black text-white">$4.55M</h2>
            <p className="text-green-400 text-sm font-bold mt-2 flex items-center gap-1"><TrendingUp size={16}/> +12.4% vs Last Year</p>
          </div>
          
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-zinc-800 opacity-50"><Activity size={100} /></div>
            <p className="text-zinc-400 text-sm font-bold uppercase tracking-wider mb-2">Avg Monthly Burn</p>
            <h2 className="text-4xl font-black text-white">$26.8K</h2>
            <p className="text-orange-400 text-sm font-bold mt-2 flex items-center gap-1">Monitoring required</p>
          </div>

          {/* PROJECT ROI CALCULATOR WIDGET */}
          <div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-2xl relative overflow-hidden ring-1 ring-blue-500/20">
            <div className="flex items-center justify-between mb-4">
              <p className="text-blue-400 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                <Calculator size={16}/> Quick ROI Math
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs text-zinc-400 font-bold mb-1 block">Proj. Revenue ($)</label>
                <input 
                  type="number" 
                  value={calcRevenue}
                  onChange={(e) => setCalcRevenue(e.target.value ? Number(e.target.value) : "")}
                  className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500" 
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400 font-bold mb-1 block">Proj. Cost ($)</label>
                <input 
                  type="number" 
                  value={calcCost}
                  onChange={(e) => setCalcCost(e.target.value ? Number(e.target.value) : "")}
                  className="w-full bg-black border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-blue-500" 
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-blue-500/20 pt-4">
              <div>
                <p className="text-xs text-zinc-400">Net Profit</p>
                <p className={`text-lg font-black ${profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ${profit.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-zinc-400">Margin</p>
                <p className={`text-lg font-black ${profit >= 0 ? 'text-blue-400' : 'text-red-400'}`}>
                  {margin}%
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* MAIN CHARTS ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Chart 1: Business Valuations */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white">Business Valuations vs Sunk Costs</h3>
              <p className="text-sm text-zinc-400">Comparing current estimated value to total capital injected.</p>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={BUSINESS_VALUATION_DATA} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                  <Tooltip 
                    cursor={{ fill: '#27272a', opacity: 0.4 }}
                    contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                  />
                  <Bar dataKey="value" name="Valuation" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="cost" name="Sunk Cost" fill="#f97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Cashflow Trends */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-white">H1 Cashflow Trends</h3>
              <p className="text-sm text-zinc-400">Monthly gross revenue vs operational burn rate across all ventures.</p>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MONTHLY_CASHFLOW_DATA} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorBurn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis dataKey="month" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '8px', color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                  <Area type="monotone" dataKey="burn" name="Burn Rate" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorBurn)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}