"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  User, ChevronLeft, Save, Upload, AlertCircle
} from "lucide-react";

export default function ProfileEditPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "Admin User",
    role: "System Administrator",
    phone: "+1 (555) 019-2837",
    location: "Louisville, KY",
    timezone: "EST (UTC-5)",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Here is where you will call Supabase: supabase.auth.updateUser({ data: formData })
    setTimeout(() => {
      setIsSaving(false);
      // Optional: router.push('/profile') to go back
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-black text-zinc-200 font-sans flex flex-col">
      
      {/* HEADER NAVIGATION */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 text-white">
          <Link href="/profile" className="p-2 hover:bg-zinc-800 rounded-lg transition-colors -ml-2">
            <ChevronLeft size={20} />
          </Link>
          <div className="flex items-center gap-2">
            <User className="text-blue-500" size={24} />
            <h1 className="text-xl font-black tracking-tight">Edit Profile</h1>
          </div>
        </div>
      </header>

      <div className="flex-1 p-6 max-w-3xl mx-auto w-full">
        
        <form onSubmit={handleSave} className="space-y-8">
          
          {/* Avatar Upload Section */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces" 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover border-2 border-zinc-700"
            />
            <div className="flex-1 text-center md:text-left">
              <h3 className="font-bold text-white mb-2">Profile Picture</h3>
              <p className="text-sm text-zinc-400 mb-4">We support PNGs, JPEGs and GIFs under 5MB.</p>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <button type="button" className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all text-sm">
                  <Upload size={16} /> Upload New
                </button>
                <button type="button" className="text-red-400 hover:text-red-300 font-bold text-sm px-4 py-2">
                  Remove
                </button>
              </div>
            </div>
          </section>

          {/* Form Fields */}
          <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl mb-6">
              <AlertCircle size={20} className="text-blue-500 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-200">
                Your email address and department are managed by your administrator and cannot be changed here.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Job Title</label>
                <input 
                  type="text" 
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Phone Number</label>
                <input 
                  type="text" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Location</label>
                <input 
                  type="text" 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" 
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Timezone</label>
                <select 
                  value={formData.timezone}
                  onChange={(e) => setFormData({...formData, timezone: e.target.value})}
                  className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                >
                  <option value="EST (UTC-5)">Eastern Standard Time (EST)</option>
                  <option value="CST (UTC-6)">Central Standard Time (CST)</option>
                  <option value="MST (UTC-7)">Mountain Standard Time (MST)</option>
                  <option value="PST (UTC-8)">Pacific Standard Time (PST)</option>
                </select>
              </div>
            </div>
          </section>

          {/* Save Button */}
          <div className="flex justify-end gap-4 pt-4">
            <Link href="/profile">
              <button type="button" className="text-zinc-400 hover:text-white font-bold text-sm px-6 py-3 transition-colors">
                Cancel
              </button>
            </Link>
            <button 
              type="submit" 
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 min-w-[140px] disabled:opacity-70"
            >
              {isSaving ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <><Save size={18} /> Save Changes</>
              )}
            </button>
          </div>

        </form>

      </div>
    </main>
  );
}