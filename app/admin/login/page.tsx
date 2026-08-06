'use client';

import { useState, type FormEvent } from 'react';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      router.push('/AdminDashboard');
    }, 800);
  };

  return (
    <main className="min-h-screen bg-black text-sky-400 flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-950 shadow-[0_30px_80px_rgba(0,0,0,0.9)] overflow-hidden">
        <div className="p-8 text-center bg-zinc-950 border-b border-zinc-700 glow-border">
          <ShieldCheck className="mx-auto mb-4 text-sky-400 glow-text" size={48} />
          <h1 className="text-3xl font-black uppercase tracking-[0.35em] text-sky-400 glow-text">Admin Login</h1>
          <p className="mt-3 text-sm uppercase text-sky-400 tracking-[0.35em] glow-text">Secure console access</p>
        </div>

        <div className="h-3 bg-white" />

        <div className="p-8 bg-white border-t border-zinc-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-xs uppercase tracking-[0.35em] text-sky-400 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-sky-400">
                  <Lock size={18} />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full rounded-3xl border border-zinc-800 bg-sky-500/10 px-4 py-4 pl-12 text-black outline-none transition focus:border-sky-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xs uppercase tracking-[0.35em] text-sky-400 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-3xl border border-zinc-800 bg-sky-500/10 px-4 py-4 text-black outline-none transition focus:border-sky-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !username || !password}
              className="w-full rounded-3xl border border-zinc-800 bg-sky-500 px-6 py-4 text-black font-bold transition hover:bg-sky-400 disabled:opacity-70 glow-border"
            >
              {isLoading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        <div className="h-3 bg-white" />

        <div className="p-6 text-center bg-zinc-950 border-t border-zinc-700 glow-border">
          <p className="text-sky-400 uppercase tracking-[0.35em] text-sm font-semibold glow-text">A.W.O.F. Conglomerate</p>
          <p className="text-sky-400 uppercase tracking-[0.35em] text-sm font-semibold mt-2 glow-text">Deon Smith</p>
        </div>
      </div>
    </main>
  );
}
