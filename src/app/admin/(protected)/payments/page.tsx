import { requireAdmin } from "@/features/auth/utils/server-auth";
import { db } from "@/db/drizzle";
import { transactions, users, stories, StoryContent } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { formatDistanceToNow } from "date-fns";
import { Search, MoreVertical, IndianRupee, Clock, CheckCircle2, XCircle, Undo2, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default async function AdminPaymentsPage() {
  await requireAdmin(true);

  const latestTx = await db.select({
    id: transactions.id,
    amount: transactions.amount,
    status: transactions.status,
    razorpayOrderId: transactions.razorpayOrderId,
    createdAt: transactions.createdAt,
    userFullName: users.fullName,
    userEmail: users.email,
    storySlug: stories.slug,
    storyContent: stories.content,
  })
  .from(transactions)
  .leftJoin(users, eq(transactions.userId, users.id))
  .leftJoin(stories, eq(transactions.storyId, stories.id))
  .orderBy(desc(transactions.createdAt))
  .limit(100);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-sans text-slate-800">Payment Management</h1>
          <p className="text-slate-500 mt-1">Audit orders, refunds, and Razorpay transactions</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input 
              type="text" 
              placeholder="Search by Order ID or User Email..." 
              className="pl-10 bg-white"
            />
          </div>
          <div className="flex gap-2">
            <select className="bg-white border border-slate-200 rounded-lg text-sm px-3 py-2 text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="all">All Payments</option>
              <option value="SUCCESS">Successful</option>
              <option value="FAILED">Failed</option>
              <option value="INITIATED">Pending</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Amount / Date</th>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Purchased Story</th>
                <th className="px-6 py-4 font-semibold">Razorpay Order ID</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {latestTx.map(tx => {
                const content = tx.storyContent as StoryContent | null;
                return (
                  <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 text-base">₹{(tx.amount / 100).toLocaleString()}</div>
                      <div className="text-sm text-slate-500 mt-0.5">
                        {formatDistanceToNow(new Date(tx.createdAt), { addSuffix: true })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-700">{tx.userFullName || "Unknown"}</div>
                      <div className="text-xs text-slate-500">{tx.userEmail}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-700 truncate max-w-[150px]">
                        {content?.title || "Untitled Story"}
                      </div>
                      {tx.storySlug && (
                        <Link href={`/s/${tx.storySlug}`} target="_blank" className="text-xs text-indigo-600 font-mono mt-0.5 hover:underline flex items-center">
                          /s/{tx.storySlug} <ArrowUpRight className="w-3 h-3 ml-0.5" />
                        </Link>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <code className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-mono border border-slate-200">
                        {tx.razorpayOrderId}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      {tx.status === "SUCCESS" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-100 text-emerald-700">
                          <CheckCircle2 className="w-3 h-3" /> Success
                        </span>
                      )}
                      {tx.status === "FAILED" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-rose-100 text-rose-700">
                          <XCircle className="w-3 h-3" /> Failed
                        </span>
                      )}
                      {tx.status === "INITIATED" && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-100 text-amber-700">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      )}

                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-900">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
              
              {latestTx.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
