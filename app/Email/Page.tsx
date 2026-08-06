"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Mail, Inbox, Send, Archive, Trash2, AlertCircle, Edit3, 
  Search, Paperclip, Reply, Forward, MoreHorizontal, LayoutDashboard,
  Star, ChevronLeft, ChevronRight
} from "lucide-react";

// --- DUMMY EMAIL DATA ---
const EMAILS = [
  { 
    id: 1, 
    sender: "Sarah Jenkins", 
    email: "sarah@studiosocial.app",
    subject: "Urgent: Q3 Onboarding Docs require approval", 
    preview: "Hey Admin, I've finalized the onboarding docs for the new hires next week. Please review and...",
    time: "10:24 AM",
    isUnread: true,
    isStarred: true,
    body: "Hey Admin,\n\nI've finalized the onboarding docs for the new hires next week. Please review and sign off by EOD today so I can send them out.\n\nAlso, let me know if we need to adjust the hardware budget for the Lead Dev role.\n\nBest,\nSarah Jenkins\nHR Manager, StudioSocial"
  },
  { 
    id: 2, 
    sender: "Marcus Tech", 
    email: "marcus@nexusforge.com",
    subject: "WebRTC Server Costs - Optimization Idea", 
    preview: "Looking at the AWS bill for the video routing, I think we can cut costs by 30% if we switch to...",
    time: "Yesterday",
    isUnread: true,
    isStarred: false,
    body: "Looking at the AWS bill for the video routing, I think we can cut costs by 30% if we switch to Cloudflare R2 for the VOD storage and strictly use LiveKit for the live rooms.\n\nLet's discuss this at the 2PM sync."
  },
  { 
    id: 3, 
    sender: "Stripe Billing", 
    email: "receipts@stripe.com",
    subject: "Successful Payout: $14,250.00", 
    preview: "Your payout of $14,250.00 is on its way to your bank account ending in 4921.",
    time: "Aug 12",
    isUnread: false,
    isStarred: false,
    body: "Your payout of $14,250.00 is on its way to your bank account ending in 4921. It should arrive within 1-2 business days."
  },
];

export default function EmailDashboard() {
  const [activeFolder, setActiveFolder] = useState("Inbox");
  const [selectedEmail, setSelectedEmail] = useState(EMAILS[0]);
  const [isComposing, setIsComposing] = useState(false);

  return (
    <main className="min-h-screen bg-black text-zinc-200 font-sans flex flex-col h-screen overflow-hidden">
      
      {/* HEADER NAVIGATION */}
      <header className="shrink-0 bg-black/80 backdrop-blur-md border-b border-zinc-800 px-6 py-4 flex items-center justify-between z-50">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-white">
            <Mail className="text-blue-500" size={28} />
            <h1 className="text-2xl font-black tracking-tight">Email</h1>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input type="text" placeholder="Search emails..." className="bg-zinc-900 border border-zinc-800 text-sm text-white rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-blue-500 w-64" />
          </div>
          <Link href="/businesses">
            <button className="text-zinc-400 hover:text-white transition-colors bg-zinc-900 border border-zinc-800 p-2 rounded-lg">
              Dashboard
            </button>
          </Link>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <aside className="w-72 border-r border-zinc-800 bg-zinc-900/30 p-4 overflow-auto">
          <nav className="flex flex-col gap-2">
            <button onClick={() => setActiveFolder('Inbox')} className={`text-left p-2 rounded ${activeFolder === 'Inbox' ? 'bg-zinc-800' : ''}`}>Inbox</button>
            <button onClick={() => setActiveFolder('Sent')} className={`text-left p-2 rounded ${activeFolder === 'Sent' ? 'bg-zinc-800' : ''}`}>Sent</button>
            <button onClick={() => setActiveFolder('Archive')} className={`text-left p-2 rounded ${activeFolder === 'Archive' ? 'bg-zinc-800' : ''}`}>Archive</button>
            <button onClick={() => setActiveFolder('Trash')} className={`text-left p-2 rounded ${activeFolder === 'Trash' ? 'bg-zinc-800' : ''}`}>Trash</button>
          </nav>
        </aside>

        {/* EMAIL LIST & PREVIEW */}
        <section className="flex-1 flex overflow-hidden">
          <div className="w-96 border-r border-zinc-800 overflow-auto">
            {EMAILS.map(email => (
              <div key={email.id} onClick={() => setSelectedEmail(email)} className={`p-3 border-b border-zinc-800 cursor-pointer ${selectedEmail?.id === email.id ? 'bg-zinc-800/50' : ''}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{email.sender}</div>
                    <div className="text-sm text-zinc-400">{email.preview}</div>
                  </div>
                  <div className="text-xs text-zinc-500">{email.time}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex-1 p-6 overflow-auto">
            {selectedEmail ? (
              <article>
                <h2 className="text-xl font-bold">{selectedEmail.subject}</h2>
                <p className="text-sm text-zinc-400">From: {selectedEmail.sender} &lt;{selectedEmail.email}&gt;</p>
                <pre className="whitespace-pre-wrap mt-4 text-zinc-200">{selectedEmail.body}</pre>
              </article>
            ) : (
              <div className="text-zinc-500">No email selected</div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
              