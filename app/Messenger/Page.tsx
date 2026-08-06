"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Hash, MessageSquare, Plus, Search, Bell, Settings, 
  Smile, Paperclip, Send, User, LayoutDashboard, Building2, 
  Briefcase, MoreVertical, Phone, Video
} from "lucide-react";

// --- DUMMY DATA ---
const CHANNELS = [
  { id: 1, name: "general", unread: 0 },
  { id: 2, name: "engineering", unread: 3 },
  { id: 3, name: "marketing", unread: 0 },
  { id: 4, name: "announcements", unread: 1 },
];

const DIRECT_MESSAGES = [
  { id: 1, name: "Marcus Tech", status: "online" },
  { id: 2, name: "Sarah Jenkins", status: "offline" },
  { id: 3, name: "Jessica Cole", status: "online" },
];

const MESSAGES = [
  { id: 1, user: "Sarah Jenkins", time: "10:14 AM", content: "Did anyone get a chance to look at the new staging server?", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces" },
  { id: 2, user: "Marcus Tech", time: "10:16 AM", content: "Yeah, the WebRTC latency is way down. Looks good to me.", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&crop=faces" },
  { id: 3, user: "Admin User", time: "10:18 AM", content: "Excellent. Let's prep it for production deployment tomorrow night.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces" },
];

export default function MessengerDashboard() {
  const [activeChannel, setActiveChannel] = useState("engineering");
  const [messageInput, setMessageInput] = useState("");

  return (
    <main className="min-h-screen bg-black text-zinc-200 font-sans flex h-screen overflow-hidden">
      
      {/* COLUMN 1: Workspace Switcher (Far Left) */}
      <aside className="w-[72px] bg-zinc-950 border-r border-zinc-800 flex flex-col items-center py-4 gap-4 hidden sm:flex shrink-0 z-20">
        <Link href="/businesses" className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:border-blue-500 transition-colors group">
          <LayoutDashboard size={20} className="group-hover:scale-110 transition-transform" />
        </Link>
        <div className="w-8 h-[2px] bg-zinc-800 rounded-full"></div>
        
        {/* Workspaces */}
        <button className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-black text-lg flex items-center justify-center shadow-lg shadow-blue-900/20 ring-2 ring-blue-500 ring-offset-2 ring-offset-black">
          NF
        </button>
        <button className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-400 font-black text-lg flex items-center justify-center transition-colors">
          SS
        </button>
        <button className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-400 font-black text-lg flex items-center justify-center transition-colors">
          WP
        </button>
        
        <button className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 border-dashed hover:border-zinc-500 text-zinc-500 flex items-center justify-center mt-2 transition-colors">
          <Plus size={20} />
        </button>
      </aside>

      {/* COLUMN 2: Channels & DMs Sidebar */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col hidden md:flex shrink-0 z-10">
        
        {/* Workspace Header */}
        <div className="h-16 px-4 border-b border-zinc-800 flex items-center justify-between hover:bg-zinc-800/50 cursor-pointer transition-colors">
          <h2 className="font-black text-white text-lg">NexusForge</h2>
          <Settings size={18} className="text-zinc-400" />
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-6">
          
          {/* Channels Section */}
          <div>
            <div className="px-4 flex items-center justify-between group mb-1">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Channels</h3>
              <button className="text-zinc-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Plus size={14} />
              </button>
            </div>
            <div className="space-y-[2px]">
              {CHANNELS.map(channel => (
                <button 
                  key={channel.id}
                  onClick={() => setActiveChannel(channel.name)}
                  className={`w-full flex items-center justify-between px-4 py-1.5 transition-colors ${
                    activeChannel === channel.name 
                      ? "bg-blue-600/10 text-blue-400 font-bold" 
                      : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-300"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Hash size={16} className={activeChannel === channel.name ? "text-blue-500" : "text-zinc-500"} /> 
                    {channel.name}
                  </div>
                  {channel.unread > 0 && (
                    <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {channel.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Direct Messages Section */}
          <div>
            <div className="px-4 flex items-center justify-between group mb-1">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Direct Messages</h3>
              <button className="text-zinc-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Plus size={14} />
              </button>
            </div>
            <div className="space-y-[2px]">
              {DIRECT_MESSAGES.map(dm => (
                <button 
                  key={dm.id}
                  className="w-full flex items-center gap-2 px-4 py-1.5 text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-300 transition-colors"
                >
                  <div className="relative">
                    <div className="w-5 h-5 rounded-md bg-zinc-800 flex items-center justify-center border border-zinc-700">
                      <User size={12} />
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-zinc-900 ${dm.status === 'online' ? 'bg-green-500' : 'bg-zinc-500'}`}></div>
                  </div>
                  <span className="truncate">{dm.name}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </aside>

      {/* COLUMN 3: Main Chat Area */}
      <section className="flex-1 flex flex-col bg-black min-w-0">
        
        {/* Chat Header */}
        <header className="h-16 px-6 border-b border-zinc-800 flex items-center justify-between shrink-0 bg-zinc-950/50">
          <div className="flex items-center gap-2">
            <Hash size={20} className="text-zinc-500" />
            <h2 className="font-bold text-white text-lg">{activeChannel}</h2>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Desktop search/actions */}
            <div className="hidden lg:flex items-center gap-4 border-r border-zinc-800 pr-4">
              <button className="text-zinc-400 hover:text-white"><Phone size={18} /></button>
              <button className="text-zinc-400 hover:text-white"><Video size={20} /></button>
            </div>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
              <input type="text" placeholder="Search..." className="bg-zinc-900 border border-zinc-800 text-sm text-white rounded-lg pl-8 pr-4 py-1.5 focus:outline-none focus:border-blue-500 w-48" />
            </div>
            <button className="text-zinc-400 hover:text-white md:hidden"><Search size={20} /></button>
            <button className="text-zinc-400 hover:text-white"><MoreVertical size={20} /></button>
          </div>
        </header>

        {/* Chat Messages Feed */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Welcome Message */}
          <div className="pb-8 border-b border-zinc-800/50 mb-4">
            <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mb-4 border border-zinc-800">
              <Hash size={32} className="text-zinc-400" />
            </div>
            <h1 className="text-2xl font-black text-white mb-2">Welcome to #{activeChannel}!</h1>
            <p className="text-zinc-400">This is the start of the <span className="font-bold text-zinc-200">#{activeChannel}</span> channel. Feel free to start a conversation.</p>
          </div>

          {/* Render Messages */}
          {MESSAGES.map((msg) => (
            <div key={msg.id} className="flex gap-4 group hover:bg-zinc-900/30 p-2 -mx-2 rounded-lg transition-colors">
              <img src={msg.avatar} alt={msg.user} className="w-10 h-10 rounded-xl object-cover border border-zinc-800 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-bold text-zinc-200">{msg.user}</span>
                  <span className="text-xs text-zinc-500 font-medium">{msg.time}</span>
                </div>
                <p className="text-zinc-300 leading-relaxed">
                  {msg.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input Bar */}
        <div className="p-6 pt-2 shrink-0">
          <div className="bg-zinc-900 border border-zinc-700 focus-within:border-blue-500 rounded-xl overflow-hidden transition-colors shadow-2xl">
            
            <textarea 
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder={`Message #${activeChannel}`}
              rows={1}
              className="w-full bg-transparent text-white p-4 pb-2 focus:outline-none resize-none"
            />
            
            <div className="px-3 pb-3 flex justify-between items-center bg-zinc-900">
              <div className="flex items-center gap-1">
                <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
                  <Plus size={18} />
                </button>
                <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors hidden sm:block">
                  <Smile size={18} />
                </button>
                <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors hidden sm:block">
                  <Paperclip size={18} />
                </button>
              </div>
              
              <button 
                className={`p-2 rounded-lg transition-all ${
                  messageInput.trim().length > 0 
                    ? "bg-blue-600 text-white hover:bg-blue-500" 
                    : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                }`}
              >
                <Send size={16} className={messageInput.trim().length > 0 ? "ml-0.5" : ""} />
              </button>
            </div>
          </div>
          <p className="text-[10px] text-zinc-500 text-center mt-2 font-bold uppercase tracking-widest">
            Press Enter to send, Shift + Enter for new line
          </p>
        </div>

      </section>
    </main>
  );
}