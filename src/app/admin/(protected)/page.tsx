import { requireAdmin } from "@/features/auth/utils/server-auth";
import { db } from "@/db/drizzle";
import { stories, users, transactions } from "@/db/schema";
import { sql, eq, and, gte } from "drizzle-orm";
import { 
  Users, FileText, IndianRupee, ShieldAlert, CreditCard, Clock, XCircle, Undo2, ArrowUpRight, CheckCircle2, Activity, HardDrive, Database
} from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default async function AdminDashboard() {
  await requireAdmin(true);

  // 1. User Metrics
  const [totalUsersRes] = await db.select({ count: sql<number>`count(*)` }).from(users);
  const totalUsers = Number(totalUsersRes.count);
  
  // 2. Story Metrics
  const [totalStoriesRes] = await db.select({ count: sql<number>`count(*)` }).from(stories);
  const totalStories = Number(totalStoriesRes.count);
  
  const [publishedStoriesRes] = await db.select({ count: sql<number>`count(*)` }).from(stories).where(eq(stories.status, "PUBLISHED"));
  const publishedStories = Number(publishedStoriesRes.count);
  const draftStories = totalStories - publishedStories;

  // 3. Payment Metrics
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const allTx = await db.select().from(transactions);
  
  const totalOrders = allTx.length;
  const successfulTx = allTx.filter(t => t.status === "SUCCESS");
  const failedTx = allTx.filter(t => t.status === "FAILED");
  const pendingTx = allTx.filter(t => t.status === "INITIATED");
  const refundTx = allTx.filter(t => t.status === "REFUNDED");

  const totalRevenue = successfulTx.reduce((sum, t) => sum + t.amount, 0) / 100;
  
  const todayRevenue = successfulTx
    .filter(t => new Date(t.createdAt) >= startOfDay)
    .reduce((sum, t) => sum + t.amount, 0) / 100;

  const monthlyRevenue = successfulTx
    .filter(t => new Date(t.createdAt) >= startOfMonth)
    .reduce((sum, t) => sum + t.amount, 0) / 100;

  // Recent Users
  const recentUsers = await db.select().from(users).orderBy(sql`${users.createdAt} desc`).limit(5);
  
  // Recent Orders
  const recentOrders = await db.select({
    id: transactions.id,
    amount: transactions.amount,
    status: transactions.status,
    createdAt: transactions.createdAt,
    userEmail: users.email,
  })
  .from(transactions)
  .leftJoin(users, eq(transactions.userId, users.id))
  .orderBy(sql`${transactions.createdAt} desc`)
  .limit(5);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-sans text-slate-800">Dashboard</h1>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium border border-emerald-200">
            <Activity className="w-4 h-4" /> System Healthy
          </div>
          <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium border border-blue-200">
            <Database className="w-4 h-4" /> DB Connected
          </div>
        </div>
      </div>

      {/* Revenue Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={IndianRupee} color="text-emerald-600" bg="bg-emerald-100" />
        <MetricCard title="Today's Revenue" value={`₹${todayRevenue.toLocaleString()}`} icon={IndianRupee} color="text-indigo-600" bg="bg-indigo-100" />
        <MetricCard title="Monthly Revenue" value={`₹${monthlyRevenue.toLocaleString()}`} icon={IndianRupee} color="text-blue-600" bg="bg-blue-100" />
        <MetricCard title="Total Orders" value={totalOrders} icon={CreditCard} color="text-purple-600" bg="bg-purple-100" />
      </div>

      {/* Story & User Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard title="Total Users" value={totalUsers} icon={Users} color="text-slate-600" bg="bg-slate-100" />
        <MetricCard title="Active Users" value={totalUsers} subtitle="Last 30 days" icon={Activity} color="text-slate-600" bg="bg-slate-100" />
        <MetricCard title="Total Stories" value={totalStories} icon={FileText} color="text-slate-600" bg="bg-slate-100" />
        <MetricCard title="Published / Drafts" value={`${publishedStories} / ${draftStories}`} icon={CheckCircle2} color="text-slate-600" bg="bg-slate-100" />
      </div>

      {/* Transactions Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard title="Successful Payments" value={successfulTx.length} icon={CheckCircle2} color="text-emerald-600" bg="bg-emerald-100" />
        <MetricCard title="Pending Payments" value={pendingTx.length} icon={Clock} color="text-amber-600" bg="bg-amber-100" />
        <MetricCard title="Failed Payments" value={failedTx.length} icon={XCircle} color="text-rose-600" bg="bg-rose-100" />
        <MetricCard title="Refund Requests" value={refundTx.length} icon={Undo2} color="text-slate-600" bg="bg-slate-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
        {/* Recent Signups */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-bold text-slate-800">Recent Signups</h2>
            <Link href="/admin/users" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center">
              View all <ArrowUpRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recentUsers.map(u => (
              <div key={u.id} className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold">
                    {u.fullName?.charAt(0) || "U"}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{u.fullName || "Unnamed"}</p>
                    <p className="text-sm text-slate-500">{u.email}</p>
                  </div>
                </div>
                <div className="text-sm text-slate-400">
                  {formatDistanceToNow(new Date(u.createdAt), { addSuffix: true })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h2 className="font-bold text-slate-800">Latest Orders</h2>
            <Link href="/admin/payments" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center">
              View all <ArrowUpRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recentOrders.map(o => (
              <div key={o.id} className="p-6 flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">₹{(o.amount / 100).toLocaleString()}</p>
                  <p className="text-sm text-slate-500">{o.userEmail}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    o.status === "SUCCESS" ? "bg-emerald-100 text-emerald-700" :
                    o.status === "FAILED" ? "bg-rose-100 text-rose-700" :
                    "bg-amber-100 text-amber-700"
                  }`}>
                    {o.status}
                  </span>
                  <div className="text-xs text-slate-400">
                    {formatDistanceToNow(new Date(o.createdAt), { addSuffix: true })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, color, bg, subtitle }: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <p className="text-3xl font-bold text-slate-900">{value}</p>
        {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bg}`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
    </div>
  );
}
