"use client";

import { useState, useRef, useCallback } from 'react';

// Lightweight local replacement for `useChat` to avoid external dependency
function useChat() {
  const [messages, setMessages] = useState<Array<{id: string; role: string; content: string;}>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const idRef = useRef(1);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  const handleSubmit = useCallback((e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input) return;
    const userMsg = { id: String(idRef.current++), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Fake AI response after short delay
    setTimeout(() => {
      const aiMsg = { id: String(idRef.current++), role: 'assistant', content: `Acknowledged: ${userMsg.content}` };
      setMessages(prev => [...prev, aiMsg]);
      setIsLoading(false);
    }, 700);
  }, [input]);

  return { messages, input, handleInputChange, handleSubmit, setInput, isLoading };
}
import Link from "next/link";
import { 
  ShieldAlert, Cpu, Send, User, Terminal, LayoutDashboard, 
  Activity, Zap, Lock, Database, FileText, TrendingUp
} from "lucide-react";

export default function AdminDashboard() {
  // Connects to the /api/chat route we built earlier
  const { messages, input, handleInputChange, handleSubmit, setInput, isLoading } = useChat();

  // Quick commands that auto-fill the AI input
  const handleQuickCommand = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <main className="min-h-screen bg-black text-zinc-200 font-sans flex flex-col md:flex-row selection:bg-blue-500/30">
      
      {/* LEFT SIDEBAR: Executive Overview & System Health */}
      <aside className="w-full md:w-80 bg-zinc-950 border-r border-zinc-800 flex flex-col">
        <div className="p-6 border-b border-zinc-800 bg-black/50">
          <div className="flex items-center gap-3 mb-1 text-white">
            <ShieldAlert className="text-red-500" size={24} />
            <h1 className="text-xl font-black tracking-tight">Admin Override</h1>
          </div>
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Level 5 Access Granted</p>
        </div>

        <div className="p-6 flex-1 overflow-y-auto space-y-8">
          
          {/* System Diagnostics */}
          <div>
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Activity size={14} /> System Health
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400 flex items-center gap-2"><Database size={14}/> DB Cluster</span>
                <span className="text-green-400 font-bold flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Online</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400 flex items-center gap-2"><Lock size={14}/> Auth API</span>
                <span className="text-green-400 font-bold flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Online</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-zinc-400 flex items-center gap-2"><Zap size={14}/> WebRTC Nodes</span>
                <span className="text-green-400 font-bold flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Online</span>
              </div>
            </div>
          </div>

          {/* AI Quick Prompts */}
          <div>
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Cpu size={14} /> Executive Prompts
            </h3>
            <div className="space-y-2">
              <button 
                onClick={() => handleQuickCommand("Draft a Non-Disclosure Agreement for a new Lead Developer.")}
                className="w-full text-left bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 p-3 rounded-xl text-sm text-zinc-300 transition-colors flex items-center gap-3"
              >
                <FileText size={16} className="text-blue-500" /> Draft NDA Contract
              </button>
              <button 
                onClick={() => handleQuickCommand("Analyze the Q3 cashflow and burn rate across all ventures and suggest budget cuts.")}
                className="w-full text-left bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 p-3 rounded-xl text-sm text-zinc-300 transition-colors flex items-center gap-3"
              >
                <TrendingUp size={16} className="text-blue-500" /> Analyze Q3 Burn Rate
              </button>
              <button 
                onClick={() => handleQuickCommand("Generate an executive summary of the top 3 critical tasks in the Development pipeline.")}
                className="w-full text-left bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 p-3 rounded-xl text-sm text-zinc-300 transition-colors flex items-center gap-3"
              >
                <Terminal size={16} className="text-blue-500" /> Dev Pipeline Summary
              </button>
            </div>
          </div>

        </div>
        
        <div className="p-4 border-t border-zinc-800 bg-black">
          <Link href="/businesses">
            <button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all text-sm border border-zinc-800">
              <LayoutDashboard size={16} /> Return to Dashboard
            </button>
          </Link>
        </div>
      </aside>

      {/* RIGHT SIDE: Forge AI Assistant */}
      <section className="flex-1 flex flex-col relative h-screen">
        
        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 pb-32">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20 shadow-[0_0_30px_rgba(37,99,235,0.2)]">
                <Cpu size={40} className="text-blue-500" />
              </div>
              <h2 className="text-3xl font-black text-white mb-2">Forge Executive AI</h2>
              <p className="text-zinc-500 max-w-md">
                Secure channel established. I am ready to assist with high-level strategy, data analysis, and legal document generation.
              </p>
            </div>
          )}

          {messages.map(m => (
            <div key={m.id} className="flex gap-4 max-w-4xl mx-auto w-full">
              {/* Avatar */}
              <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center mt-1 border ${
                m.role === 'user' 
                  ? 'bg-zinc-900 border-zinc-700 text-zinc-400' 
                  : 'bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
              }`}>
                {m.role === 'user' ? <User size={18} /> : <Cpu size={18} />}
              </div>
              
              {/* Message Content */}
              <div className="flex-1 space-y-2">
                <div className="font-black text-xs text-zinc-500 uppercase tracking-widest">
                  {m.role === 'user' ? 'Executive (Admin)' : 'Forge AI'}
                </div>
                <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed">
                  {m.content}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-4 max-w-4xl mx-auto w-full">
              <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center mt-1 border bg-blue-600 border-blue-500 text-white">
                <Cpu size={18} className="animate-pulse" />
              </div>
              <div className="flex items-center text-blue-500 text-sm font-bold animate-pulse">
                Processing command...
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/90 to-transparent p-6 md:p-10">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative flex items-center">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Enter executive command..."
              className="w-full bg-zinc-900/90 backdrop-blur-md border border-zinc-700 text-white rounded-xl pl-5 pr-14 py-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-zinc-600 shadow-2xl"
            />
            <button 
              type="submit" 
              disabled={isLoading || !input}
              className="absolute right-3 bg-blue-600 text-white p-2.5 rounded-lg disabled:opacity-50 hover:bg-blue-500 transition-colors shadow-lg"
            >
              <Send size={18} />
            </button>
          </form>
        </div>

      </section>
    </main>
  );
}