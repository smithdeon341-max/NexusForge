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
    <main className="min-h-screen bg-black flex items-center justify-center p-4 font-mono text-sky-400 text-center">
      <div className="w-full max-w-md bg-zinc-950 rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.75)] border border-zinc-800 overflow-hidden">
        {/* Header Section */}
        <div className="border border-zinc-700 rounded-b-none rounded-t-3xl p-8 text-center relative overflow-hidden bg-zinc-950/95">
          <div className="absolute top-0 right-0 w-28 h-28 bg-sky-500/15 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <Cpu className="text-sky-400 mx-auto mb-4" size={48} />
          <h1 className="text-3xl md:text-4xl uppercase font-black text-sky-400 tracking-[0.45em] leading-tight">
            NexusForge LLC
          </h1>
          <p className="text-sky-400 text-sm md:text-base mt-3 uppercase tracking-[0.35em]">
            Enterprise Management Portal
          </p>
        </div>
        <div className="h-3 bg-white" />

        {/* Input Section */}
        <div className="p-8 space-y-6 bg-white border-t border-zinc-800 text-center">
          <div className="flex flex-col items-center gap-3 mb-6 bg-zinc-900 p-4 rounded-3xl border border-zinc-800">
            <ShieldCheck className="text-sky-400 shrink-0" size={24} />
            <p className="text-sm text-white leading-relaxed">
              This is a secure, invite-only portal. Enter the access code provided by your administrator.
            </p>
          </div>

          <form onSubmit={handleVerifyCode} className="space-y-6 mx-auto max-w-md text-center">
            <div className="space-y-2">
              <label htmlFor="code" className="text-sm font-bold text-sky-400 uppercase tracking-[0.35em] block">
                Access Code
              </label>
              <div className="relative mx-auto max-w-xl">
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
                  className="w-full pl-11 pr-4 py-4 bg-white border border-zinc-800 rounded-3xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all font-mono font-bold tracking-[0.25em] text-black placeholder:text-zinc-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !inviteCode}
              className="w-full rounded-3xl border border-zinc-800 bg-sky-500 px-6 py-4 text-black font-bold transition hover:bg-sky-400 disabled:opacity-70 flex items-center justify-center gap-2 mx-auto"
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

          <div className="mt-8 border-t border-zinc-800 pt-6">
            <p className="text-sm text-sky-400 uppercase tracking-[0.35em]">
              Are you an administrator? <a href="/admin/login" className="text-sky-400 font-bold hover:underline">Sign in here</a>
            </p>
          </div>
        </div>
        <div className="h-3 bg-white" />

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