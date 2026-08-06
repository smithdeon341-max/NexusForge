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
    <main className="min-h-screen bg-black flex items-center justify-center p-4 font-mono text-sky-400">
      <div className="w-full max-w-md bg-zinc-950 rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.75)] border border-zinc-800 overflow-hidden">
        {/* Header Section */}
        <div className="border border-zinc-700 rounded-b-none rounded-t-3xl p-8 text-center relative overflow-hidden bg-zinc-950/95">
          <div className="absolute top-0 right-0 w-28 h-28 bg-sky-500/15 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <Cpu className="text-sky-400 mx-auto mb-4" size={48} />
          <h1 className="text-3xl md:text-4xl uppercase font-black text-sky-400 tracking-[0.45em] leading-tight">
            NexusForge LLC
          </h1>
          <p className="text-sky-300 text-sm md:text-base mt-3 uppercase tracking-[0.35em]">
            Enterprise Management Portal
          </p>
        </div>

        {/* Input Section */}
        <div className="p-8 space-y-6 bg-zinc-950/95 border-t border-zinc-800">
          <div className="flex items-start gap-3 mb-6 bg-zinc-900 p-4 rounded-3xl border border-zinc-800">
            <ShieldCheck className="text-sky-400 shrink-0" size={24} />
            <p className="text-sm text-sky-300 leading-relaxed">
              This is a secure, invite-only portal. Enter the access code provided by your administrator.
            </p>
          </div>

          <form onSubmit={handleVerifyCode} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="code" className="text-sm font-bold text-sky-300 uppercase tracking-[0.35em]">
                Access Code
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <KeyRound className="h-5 w-5 text-sky-400" />
                </div>
                <input
                  id="code"
                  type="text"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                  placeholder="e.g. NF-8392A"
                  required
                  className="w-full pl-11 pr-4 py-4 bg-zinc-900 border border-zinc-800 rounded-3xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all font-mono font-bold tracking-[0.25em] text-sky-200 placeholder:text-sky-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !inviteCode}
              className="w-full bg-sky-500 hover:bg-sky-400 text-black font-bold py-4 rounded-3xl shadow-[0_20px_40px_rgba(14,165,233,0.25)] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Verify Code
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-zinc-800 pt-6">
            <p className="text-sm text-sky-400">
              Are you an administrator? <a href="/admin/login" className="text-sky-400 font-bold hover:underline">Sign in here</a>
            </p>
          </div>
        </div>

        {/* Footer Section */}
        <div className="border-t border-zinc-700 p-6 text-center bg-zinc-950/95">
          <p className="text-sky-400 uppercase tracking-[0.35em] text-sm font-semibold">
            A.W.O.F. Conglomerate
          </p>
          <p className="text-sky-400 uppercase tracking-[0.35em] text-sm font-semibold mt-2">
            Deon Smith
          </p>
        </div>
      </div>
    </main>
  );
}