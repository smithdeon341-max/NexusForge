/// <reference types="react" />
"use client";

import { useState, type FormEvent } from "react";
import { Cpu, ArrowRight, ShieldCheck, KeyRound } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BusinessIndexPage() {
  const [inviteCode, setInviteCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleVerifyCode = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // In a real app, you will send this code to your API to verify it against Supabase
    // If valid, route them to a specific /register?token=XYZ page
    setTimeout(() => {
      setIsLoading(false);
      router.push(`/register?token=${inviteCode}`);
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-zinc-50 flex items-center justify-center p-4 font-sans text-zinc-900">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-blue-900 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <Cpu className="text-blue-400 mx-auto mb-4" size={40} />
          <h1 className="text-2xl font-black text-white tracking-tight">NexusForge LLC</h1>
          <p className="text-blue-200 text-sm mt-2 font-medium">Enterprise Management Portal</p>
        </div>

        {/* Input Section */}
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6 bg-blue-50 p-4 rounded-xl border border-blue-100">
            <ShieldCheck className="text-blue-700 shrink-0" size={24} />
            <p className="text-sm text-blue-900 font-medium leading-relaxed">
              This is a secure, invite-only portal. Enter the access code provided by your administrator.
            </p>
          </div>

          <form onSubmit={handleVerifyCode} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="code" className="text-sm font-bold text-zinc-700 uppercase tracking-wider">
                Access Code
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <KeyRound className="h-5 w-5 text-zinc-400" />
                </div>
                <input
                  id="code"
                  type="text"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                  placeholder="e.g. NF-8392A"
                  required
                  className="w-full pl-11 pr-4 py-4 bg-zinc-50 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all font-mono font-bold tracking-widest text-zinc-800 placeholder:font-sans placeholder:font-normal placeholder:tracking-normal"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !inviteCode}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Verify Code
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Admin Login Link */}
          <div className="mt-8 text-center border-t border-zinc-100 pt-6">
            <p className="text-sm text-zinc-500">
              Are you an administrator? <a href="/admin/login" className="text-blue-700 font-bold hover:underline">Sign in here</a>
            </p>
          </div>
        </div>
      </div>

    </main>
  );
}