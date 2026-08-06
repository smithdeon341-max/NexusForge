"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Share2, LayoutDashboard, Building2, Briefcase, Target, 
  Settings, BarChart3, Users, Plus, Image as ImageIcon, 
  Calendar as CalendarIcon, Send, Link2,
  MoreHorizontal, Clock, CheckCircle2
} from "lucide-react";

// --- DUMMY DATA ---
const SCHEDULED_POSTS = [
  { id: 1, platform: "Twitter", content: "Excited to announce the new WebRTC infrastructure for We The People app! Latency is down to 50ms. 🚀 #Tech #BuildInPublic", time: "Today at 2:00 PM", status: "Scheduled" },
  { id: 2, platform: "LinkedIn", content: "NexusForge LLC is expanding. We are looking for a Lead React Developer to join our core architecture team. Apply below.", time: "Tomorrow at 9:00 AM", status: "Draft" },
  { id: 3, platform: "Instagram", content: "Behind the scenes at StudioSocial HQ. 📸", time: "Aug 15 at 12:00 PM", status: "Scheduled", hasImage: true },
];

export default function SocialsDashboard() {
  const [activeTab, setActiveTab] = useState("Scheduled");
  const [postContent, setPostContent] = useState("");

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Twitter': return <Share2 size={18} className="text-sky-500" />;
      case 'LinkedIn': return <Briefcase size={18} className="text-blue-600" />;
      case 'Instagram': return <ImageIcon size={18} className="text-pink-500" />;
      default: return <Share2 size={18} className="text-zinc-500" />;
    }
  };

  return (
    <main className="min-h-screen bg-black text-zinc-200 font-sans flex flex-col h-screen overflow-hidden">
      
      {/* HEADER NAVIGATION */}
      <header className="shrink-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-white">
            <Share2 className="text-blue-500" size={28} />
            <h1 className="text-2xl font-black tracking-tight">Socials</h1>
          </div>
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><LayoutDashboard size={16}/> Home</Link>
            <Link href="/businesses" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><Building2 size={16}/> Businesses</Link>
            <Link href="/projects" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><Briefcase size={16}/> Projects</Link>
            <Link href="/plans" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><Target size={16}/> Plans</Link>
            <Link href="/development" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><Settings size={16}/> Development</Link>
            <Link href="/analytics" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><BarChart3 size={16}/> Analytics</Link>
            <Link href="/hr" className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"><Users size={16}/> HR</Link>
          </nav>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT SIDEBAR: Accounts & Composer */}
        <aside className="w-full md:w-96 bg-zinc-950 border-r border-zinc-800 flex flex-col shrink-0">
          <div className="p-6 border-b border-zinc-800">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Connected Accounts</h3>
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-black border border-zinc-800 rounded-xl flex items-center justify-center cursor-pointer ring-2 ring-blue-500">
                <Share2 size={20} className="text-sky-500" />
              </div>
              <div className="w-10 h-10 bg-black border border-zinc-800 rounded-xl flex items-center justify-center cursor-pointer hover:border-zinc-600 transition-colors">
                <Briefcase size={20} className="text-blue-600" />
              </div>
              <div className="w-10 h-10 bg-black border border-zinc-800 rounded-xl flex items-center justify-center cursor-pointer border-dashed text-zinc-600 hover:text-white hover:border-zinc-500 transition-colors">
                <Plus size={20} />
              </div>
            </div>
          </div>

          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Create Post</h3>
            <div className="bg-black border border-zinc-800 rounded-2xl p-4 flex-1 flex flex-col shadow-xl focus-within:border-blue-500 transition-colors">
              <textarea 
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="What's happening at NexusForge?"
                className="w-full flex-1 bg-transparent text-white resize-none focus:outline-none"
              />
              <div className="flex items-center justify-between pt-4 border-t border-zinc-800 mt-4">
                <div className="flex gap-2">
                  <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"><ImageIcon size={18}/></button>
                  <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"><CalendarIcon size={18}/></button>
                </div>
                <button 
                  disabled={!postContent}
                  className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all text-sm"
                >
                  <Send size={16} /> Schedule
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN AREA: Feed */}
        <section className="flex-1 overflow-y-auto bg-black p-6 md:p-10">
          <div className="max-w-3xl mx-auto space-y-6">
            
            {/* Tabs */}
            <div className="flex items-center gap-6 border-b border-zinc-800 pb-4 mb-8">
              <button onClick={() => setActiveTab("Scheduled")} className={`font-bold pb-4 -mb-[17px] transition-colors ${activeTab === 'Scheduled' ? 'text-white border-b-2 border-blue-500' : 'text-zinc-500 hover:text-zinc-300'}`}>Scheduled</button>
              <button onClick={() => setActiveTab("Drafts")} className={`font-bold pb-4 -mb-[17px] transition-colors ${activeTab === 'Drafts' ? 'text-white border-b-2 border-blue-500' : 'text-zinc-500 hover:text-zinc-300'}`}>Drafts</button>
              <button onClick={() => setActiveTab("Published")} className={`font-bold pb-4 -mb-[17px] transition-colors ${activeTab === 'Published' ? 'text-white border-b-2 border-blue-500' : 'text-zinc-500 hover:text-zinc-300'}`}>Published</button>
            </div>

            {/* Post Feed */}
            {SCHEDULED_POSTS.map(post => (
              <div key={post.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-black border border-zinc-800 rounded-lg">
                      {getPlatformIcon(post.platform)}
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">{post.platform} Account</div>
                      <div className="text-xs text-zinc-500 font-semibold flex items-center gap-1">
                        {post.status === 'Scheduled' ? <Clock size={12} className="text-blue-500"/> : <CheckCircle2 size={12} className="text-orange-500"/>}
                        {post.time}
                      </div>
                    </div>
                  </div>
                  <button className="text-zinc-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"><MoreHorizontal size={18}/></button>
                </div>
                
                <p className="text-zinc-300 text-sm leading-relaxed mb-4">{post.content}</p>
                
                {post.hasImage && (
                  <div className="w-full h-48 bg-zinc-800 rounded-xl border border-zinc-700 flex items-center justify-center text-zinc-500 mb-4">
                    [ Attached Image Placeholder ]
                  </div>
                )}
                
                <div className="flex gap-2">
                  <button className="text-xs font-bold text-zinc-400 bg-black border border-zinc-800 px-3 py-1.5 rounded-lg hover:text-white transition-colors">Edit</button>
                  <button className="text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-lg hover:bg-red-500/20 transition-colors">Delete</button>
                </div>
              </div>
            ))}

          </div>
        </section>

      </div>
    </main>
  );
}