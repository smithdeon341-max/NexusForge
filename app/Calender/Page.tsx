"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Calendar as CalendarIcon, LayoutDashboard, Building2, Briefcase, 
  Target, Settings, BarChart3, Users, ChevronLeft, ChevronRight, 
  Plus, MoreHorizontal, Clock, MapPin
} from "lucide-react";

// --- DUMMY EVENTS DATA ---
const EVENTS = [
  { id: 1, title: "Q3 Strategy Sync", date: "2026-08-15", time: "10:00 AM", type: "meeting", business: "NexusForge Labs" },
  { id: 2, title: "WebRTC Load Test", date: "2026-08-15", time: "2:00 PM", type: "dev", business: "We The People" },
  { id: 3, title: "StudioSocial Ad Campaign Launch", date: "2026-08-22", time: "All Day", type: "marketing", business: "StudioSocial" },
  { id: 4, title: "Lead Dev Interviews", date: "2026-08-08", time: "1:00 PM", type: "hr", business: "Forge AI" },
];

export default function CalendarDashboard() {
  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1)); // August 2026
  
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const today = () => setCurrentDate(new Date());

  // Calendar Math
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();
  
  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  // Generate grid array (including empty slots for padding)
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  // Helper to format date to match EVENT strings (YYYY-MM-DD)
  const formatDateString = (day: number) => {
    return `${year}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getEventStyle = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'dev': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'hr': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    }
  };

  return (
    <main className="min-h-screen bg-black text-zinc-200 font-sans flex flex-col">
      
      {/* HEADER NAVIGATION */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-white">
            <CalendarIcon className="text-blue-500" size={28} />
            <h1 className="text-2xl font-black tracking-tight">Calendar</h1>
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
        <button className="bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-all text-sm">
          <Plus size={16} /> New Event
        </button>
      </header>

      <div className="flex-1 p-6 max-w-[1600px] mx-auto w-full flex flex-col h-[calc(100vh-80px)]">
        
        {/* CALENDAR TOOLBAR */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-black text-white">{monthName} <span className="text-zinc-500">{year}</span></h2>
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-1">
              <button onClick={prevMonth} className="p-1.5 hover:bg-zinc-800 rounded-md transition-colors"><ChevronLeft size={20}/></button>
              <button onClick={today} className="px-3 py-1 text-sm font-bold text-zinc-300 hover:text-white transition-colors">Today</button>
              <button onClick={nextMonth} className="p-1.5 hover:bg-zinc-800 rounded-md transition-colors"><ChevronRight size={20}/></button>
            </div>
          </div>
          
          {/* Legend */}
          <div className="hidden md:flex items-center gap-4 text-xs font-bold text-zinc-400">
            <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div> Meeting</span>
            <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-green-500"></div> Dev</span>
            <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div> HR</span>
            <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div> Marketing</span>
          </div>
        </div>

        {/* CALENDAR GRID */}
        <div className="flex-1 bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
          
          {/* Days of Week Header */}
          <div className="grid grid-cols-7 border-b border-zinc-800 bg-zinc-900/50">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="py-3 text-center text-xs font-black uppercase tracking-widest text-zinc-500">
                {day}
              </div>
            ))}
          </div>

          {/* Grid Cells */}
          <div className="flex-1 grid grid-cols-7 auto-rows-fr bg-zinc-800 gap-[1px]">
            {days.map((day, index) => {
              // Find events for this specific day
              const dayEvents = day ? EVENTS.filter(e => e.date === formatDateString(day)) : [];
              const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();

              return (
                <div 
                  key={index} 
                  className={`bg-black p-2 md:p-3 transition-colors hover:bg-zinc-900/50 group relative ${!day ? 'bg-black/50' : ''}`}
                >
                  {day && (
                    <>
                      <div className={`text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full mb-2 ${isToday ? 'bg-blue-600 text-white' : 'text-zinc-400'}`}>
                        {day}
                      </div>
                      
                      <div className="space-y-1.5 overflow-y-auto max-h-[100px] no-scrollbar">
                        {dayEvents.map(event => (
                          <div 
                            key={event.id}
                            className={`p-1.5 rounded-md border text-xs cursor-pointer hover:opacity-80 transition-opacity ${getEventStyle(event.type)}`}
                          >
                            <div className="font-bold truncate">{event.title}</div>
                            <div className="flex items-center justify-between mt-1 opacity-70">
                              <span className="text-[9px] uppercase font-black">{event.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Hover action to add event on this day */}
                      <button className="absolute top-2 right-2 p-1 bg-zinc-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity md:flex hidden">
                        <Plus size={14} />
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          
        </div>
      </div>
    </main>
  );
}