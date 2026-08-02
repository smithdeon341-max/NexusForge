"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Building2, Plus, Mail, MessageSquare, ChevronDown, User, 
  Settings, CheckSquare, Calendar, Share2, Send, 
  MoreHorizontal, Briefcase, BarChart3, Users, LayoutDashboard, Target
} from "lucide-react";

// --- DUMMY DATA ---
const BUSINESSES = [
  { id: 1, name: "NexusForge Labs", owner: "Admin", year: "2026", value: "$2.5M" },
  { id: 2, name: "StudioSocial", owner: "Admin", year: "2026", value: "$850K" },
  { id: 3, name: "We The People App", owner: "Admin", year: "2025", value: "$1.2M" },
];

const WALL_POSTS = [
  { id: 1, name: "Sarah Jenkins", role: "HR Manager", time: "10m ago", text: "StudioSocial Q3 onboarding docs are finalized and in the shared drive.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces" },
  { id: 2, name: "Marcus Tech", role: "Lead Dev", time: "1h ago", text: "Pushed the new WebRTC update to NexusForge staging. Please test the video latency.", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces" },
];

export default function BusinessesDashboard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newPost, setNewPost] = useState("");

  return (
    <main className="min-h-screen bg-black text-zinc-200 font-sans">
      
      {/* HEADER / TOP NAVIGATION */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        
        {/* Left Side: Logo & Tabs */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-white">
            <Building2 className="text-blue-500" size={28} />
            <h1 className="text-2xl font-black tracking-tight">Businesses</h1>
          </div>
          
          {/* Main Header Tabs */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><LayoutDashboard size={16}/> Home</Link>
            <Link href="/projects" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><Briefcase size={16}/> Projects</Link>
            <Link href="/plans" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><Target size={16}/> Plans</Link>
            <Link href="/development" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><Settings size={16}/> Development</Link>
            <Link href="/analytics" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><BarChart3 size={16}/> Analytics</Link>
            <Link href="/hr" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><Users size={16}/> HR</Link>
          </nav>
        </div>

        {/* Right Side: Notifications & Profile */}
        <div className="flex items-center gap-6">
          
          {/* Notification Icons */}
          <div className="flex items-center gap-4 border-r border-zinc-800 pr-6">
            <button className="relative text-zinc-400 hover:text-white transition-colors">
              <Mail size={22} />
              {/* Glowing Red Dot */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-black"></span>
              </span>
            </button>
            <button className="relative text-zinc-400 hover:text-white transition-colors">
              <MessageSquare size={22} />
              {/* Glowing Red Dot */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-black"></span>
              </span>
            </button>
          </div>

          {/* Profile & Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 focus:outline-none group"
            >
              <div className="text-right hidden md:block">
                <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">Admin User</div>
                <div className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Owner</div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces" 
                alt="Profile" 
                className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
              />
              <ChevronDown size={16} className={`text-zinc-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden py-2 z-50">
                <Link href="/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-300 hover:bg-blue-600 hover:text-white transition-colors"><User size={16}/> Profile</Link>
                <Link href="/profile/edit" className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-300 hover:bg-blue-600 hover:text-white transition-colors"><Settings size={16}/> Profile Edits</Link>
                <Link href="/tasks" className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-300 hover:bg-blue-600 hover:text-white transition-colors"><CheckSquare size={16}/> Task</Link>
                <Link href="/calendar" className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-300 hover:bg-blue-600 hover:text-white transition-colors"><Calendar size={16}/> Calendar</Link>
                <Link href="/socials" className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-300 hover:bg-blue-600 hover:text-white transition-colors"><Share2 size={16}/> Socials</Link>
                <div className="border-t border-zinc-800 my-1"></div>
                <Link href="/email" className="flex items-center justify-between px-4 py-2 text-sm text-zinc-300 hover:bg-blue-600 hover:text-white transition-colors">
                  <div className="flex items-center gap-3"><Mail size={16}/> Email</div>
                  <span className="bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">3</span>
                </Link>
                <Link href="/messenger" className="flex items-center justify-between px-4 py-2 text-sm text-zinc-300 hover:bg-blue-600 hover:text-white transition-colors">
                  <div className="flex items-center gap-3"><MessageSquare size={16}/> Messenger</div>
                  <span className="bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">1</span>
                </Link>
              </div>
            )}
          </div>

        </div>
      </header>


      {/* MAIN CONTENT GRID */}
      <div className="p-6 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT SIDE: Businesses (Takes up 2/3 of the screen on desktop) */}
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Owned Businesses</h2>
              <p className="text-sm text-zinc-400">Manage and track metadata for all subsidiary companies.</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20">
              <Plus size={20} />
              Create Card
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BUSINESSES.map((biz) => (
              <div key={biz.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:border-blue-500/50 transition-colors group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full group-hover:bg-blue-500/10 transition-colors -z-10"></div>
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center border border-zinc-700 text-blue-400">
                    <Building2 size={24} />
                  </div>
                  <button className="text-zinc-500 hover:text-white"><MoreHorizontal size={20}/></button>
                </div>
                <h3 className="text-xl font-black text-white mb-4">{biz.name}</h3>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Owner</span>
                    <span className="font-bold text-zinc-200">{biz.owner}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Year Owned</span>
                    <span className="font-bold text-zinc-200">{biz.year}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Estimated Value</span>
                    <span className="font-bold text-green-400">{biz.value}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT SIDE: Communication Wall (Takes up 1/3 of the screen) */}
        <section className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col h-[calc(100vh-120px)] sticky top-[100px]">
            
            {/* Wall Header */}
            <div className="p-4 border-b border-zinc-800">
              <h2 className="font-bold text-white flex items-center gap-2">
                <MessageSquare size={18} className="text-blue-500"/> Team Wall
              </h2>
            </div>

            {/* Posts Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {WALL_POSTS.map(post => (
                <div key={post.id} className="bg-black/50 p-4 rounded-xl border border-zinc-800">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={post.avatar} alt={post.name} className="w-10 h-10 rounded-full object-cover border border-zinc-700" />
                    <div>
                      <div className="font-bold text-sm text-zinc-200">{post.name}</div>
                      <div className="text-xs text-zinc-500">{post.role} • {post.time}</div>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {post.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-zinc-800 bg-zinc-950/50 rounded-b-2xl">
              <form className="relative" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="text" 
                  placeholder="Post an update or news..." 
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-500 text-white p-1.5 rounded-lg transition-colors">
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}