import { requireAuth } from "@/features/auth/utils/server-auth";
import { redirect } from "next/navigation";
import { db } from "@/db/drizzle";
import { stories, users } from "@/db/schema";
import { sql } from "drizzle-orm";
import { Users, FileText, IndianRupee, ShieldAlert } from "lucide-react";

export default async function AdminDashboard() {
  const user = await requireAuth();
  
  // Basic Security Hardening: Only specific admin emails allowed
  // In production, this would be an RBAC role on the user table
  const adminEmails = ["admin@hamarikahani.in", "founder@hamarikahani.in"];
  if (!user.auth.email || !adminEmails.includes(user.auth.email)) {
    redirect("/dashboard");
  }

  // Fast Aggregate Queries for Admin Metrics
  const [userMetrics] = await db.select({ count: sql<number>`count(*)` }).from(users);
  const [storyMetrics] = await db.select({ count: sql<number>`count(*)` }).from(stories);
  const revenueEstimate = (Number(storyMetrics.count) * 499).toLocaleString('en-IN'); // Mock metric

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col">
      <header className="h-16 border-b border-zinc-800 px-8 flex items-center justify-between bg-zinc-900/50">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-red-500" />
          <span className="font-mono font-bold tracking-tight text-lg">HK_ADMIN_CONSOLE</span>
        </div>
        <div className="text-sm font-mono text-zinc-400">
          AUTHORIZED: {user.auth.email}
        </div>
      </header>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <h1 className="text-3xl font-bold font-sans">System Overview</h1>

          {/* Core Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400 font-mono mb-1">TOTAL_USERS</p>
                <p className="text-4xl font-bold">{userMetrics.count}</p>
              </div>
              <Users className="w-10 h-10 text-zinc-700" />
            </div>
            
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400 font-mono mb-1">TOTAL_STORIES</p>
                <p className="text-4xl font-bold text-blue-400">{storyMetrics.count}</p>
              </div>
              <FileText className="w-10 h-10 text-zinc-700" />
            </div>
            
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-sm text-zinc-400 font-mono mb-1">LIFETIME_REVENUE</p>
                <p className="text-4xl font-bold text-emerald-400">₹{revenueEstimate}</p>
              </div>
              <IndianRupee className="w-10 h-10 text-zinc-700" />
            </div>
          </div>

          {/* Admin Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-zinc-800">
            <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-xl hover:bg-zinc-900 transition-colors cursor-pointer">
              <h2 className="text-xl font-bold mb-2">User Management</h2>
              <p className="text-zinc-400 text-sm">Suspend accounts, reset passwords, or audit user activity logs.</p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-xl hover:bg-zinc-900 transition-colors cursor-pointer">
              <h2 className="text-xl font-bold mb-2">Content Moderation</h2>
              <p className="text-zinc-400 text-sm">Review flagged stories, DMCA takedowns, and enforce platform safety.</p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-xl hover:bg-zinc-900 transition-colors cursor-pointer">
              <h2 className="text-xl font-bold mb-2">Financial Audits</h2>
              <p className="text-zinc-400 text-sm">View Razorpay webhook history, refund requests, and invoice generation.</p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-xl hover:bg-zinc-900 transition-colors cursor-pointer">
              <h2 className="text-xl font-bold mb-2">SEO & Performance</h2>
              <p className="text-zinc-400 text-sm">Check Core Web Vitals metrics and dynamic sitemap.xml cache status.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
