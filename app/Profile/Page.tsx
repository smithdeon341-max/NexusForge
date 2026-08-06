"use client";

import Link from "next/link";
import { 
  User, LayoutDashboard, Building2, Briefcase, Target, 
  Settings, BarChart3, Users, Edit3, Mail, Phone, MapPin, 
  ShieldCheck, Clock, CheckCircle2, ChevronLeft,
  Calendar
} from "lucide-react";

// --- DUMMY DATA ---
const USER_DATA = {
  name: "Admin User",
  role: "System Administrator",
  department: "Executive",
  email: "admin@nexusforge.com",
  phone: "+1 (555) 019-2837",
  location: "Louisville, KY",
  timezone: "EST (UTC-5)",
  joinDate: "January 2026",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces",
  stats: {
    tasksCompleted: 142,
    projectsActive: 3,
    hoursLogged: 1240
  }
};

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-black text-zinc-200 font-sans flex flex-col">
      
      {/* HEADER NAVIGATION */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 text-white">
          <Link href="/businesses" className="p-2 hover:bg-zinc-800 rounded-lg transition-colors -ml-2">
            <ChevronLeft size={20} />
          </Link>
          <div className="flex items-center gap-2">
            <User className="text-blue-500" size={24} />
            <h1 className="text-xl font-black tracking-tight">My Profile</h1>
          </div>
        </div>
        <Link href="/profile/edit">
          <button className="bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all text-sm shadow-lg shadow-blue-900/20">
            <Edit3 size={16} /> Edit Profile
          </button>
        </Link>
      </header>

      <div className="flex-1 p-6 max-w-5xl mx-auto w-full space-y-6">
        
        {/* HERO SECTION */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
            <img 
              src={USER_DATA.avatar} 
              alt="Profile" 
              className="w-32 h-32 rounded-2xl object-cover border-4 border-zinc-800 shadow-2xl"
            />
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-black text-white mb-1">{USER_DATA.name}</h2>
              <p className="text-blue-400 font-bold mb-4">{USER_DATA.role}</p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-semibold text-zinc-400">
                <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-zinc-500"/> Level 5 Access</span>
                <span className="flex items-center gap-1.5"><Building2 size={16} className="text-zinc-500"/> {USER_DATA.department}</span>
                <span className="flex items-center gap-1.5"><MapPin size={16} className="text-zinc-500"/> {USER_DATA.location}</span>
              </div>
            </div>
          </div>
        </section>

        {/* TWO COLUMN DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Contact Information */}
          <section className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-2">Email Address</p>
                  <p className="font-semibold text-zinc-200 flex items-center gap-2"><Mail size={16} className="text-blue-500"/> {USER_DATA.email}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-2">Phone Number</p>
                  <p className="font-semibold text-zinc-200 flex items-center gap-2"><Phone size={16} className="text-blue-500"/> {USER_DATA.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-2">Timezone</p>
                  <p className="font-semibold text-zinc-200 flex items-center gap-2"><Clock size={16} className="text-blue-500"/> {USER_DATA.timezone}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-2">Joined</p>
                  <p className="font-semibold text-zinc-200 flex items-center gap-2"><Calendar size={16} className="text-blue-500"/> {USER_DATA.joinDate}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Stats */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between">
            <h3 className="text-lg font-bold text-white mb-6">Activity Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-black/50 border border-zinc-800 rounded-xl">
                <span className="text-sm font-semibold text-zinc-400 flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500"/> Tasks Done</span>
                <span className="font-black text-white">{USER_DATA.stats.tasksCompleted}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-black/50 border border-zinc-800 rounded-xl">
                <span className="text-sm font-semibold text-zinc-400 flex items-center gap-2"><Briefcase size={16} className="text-orange-500"/> Active Proj</span>
                <span className="font-black text-white">{USER_DATA.stats.projectsActive}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-black/50 border border-zinc-800 rounded-xl">
                <span className="text-sm font-semibold text-zinc-400 flex items-center gap-2"><Clock size={16} className="text-blue-500"/> Hours</span>
                <span className="font-black text-white">{USER_DATA.stats.hoursLogged}</span>
              </div>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}