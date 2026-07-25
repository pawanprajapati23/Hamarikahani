import { requireAdmin } from "@/features/auth/utils/server-auth";
import { db } from "@/db/drizzle";
import { coupons } from "@/db/schema";
import { desc } from "drizzle-orm";
import { formatDistanceToNow, format } from "date-fns";
import { Plus, Search, MoreVertical, Tag, ShieldCheck, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function AdminCouponsPage() {
  await requireAdmin(true);

  const allCoupons = await db.select().from(coupons).orderBy(desc(coupons.createdAt));

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-sans text-slate-800">Coupon Management</h1>
          <p className="text-slate-500 mt-1">Create promotional codes, track usage, and manage discounts</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" /> Create Coupon
        </Button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input 
              type="text" 
              placeholder="Search coupon code..." 
              className="pl-10 bg-white"
            />
          </div>
          <div className="flex gap-2">
            <select className="bg-white border border-slate-200 rounded-lg text-sm px-3 py-2 text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Code</th>
                <th className="px-6 py-4 font-semibold">Discount</th>
                <th className="px-6 py-4 font-semibold">Usage</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Expiry Date</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allCoupons.map(coupon => {
                const isExpired = coupon.expiryDate && new Date(coupon.expiryDate) < new Date();
                const isMaxedOut = coupon.usageLimit !== null && coupon.usageCount >= coupon.usageLimit;
                
                return (
                  <tr key={coupon.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-2">
                        <Tag className="w-4 h-4 text-indigo-500" />
                        <span className="font-bold text-slate-900 font-mono text-base">{coupon.code}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md inline-block">
                        {coupon.discountType === "PERCENTAGE" 
                          ? `${coupon.discountValue}% OFF` 
                          : `₹${(coupon.discountValue / 100).toLocaleString()} OFF`}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-700">
                        {coupon.usageCount} <span className="text-slate-400">/ {coupon.usageLimit || "∞"}</span>
                      </div>
                      {isMaxedOut && <div className="text-xs text-rose-500 mt-0.5 font-medium">Limit reached</div>}
                    </td>
                    <td className="px-6 py-4">
                      {coupon.isActive && !isExpired && !isMaxedOut ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-100 text-emerald-700">
                          <ShieldCheck className="w-3 h-3" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-500">
                          <ShieldAlert className="w-3 h-3" /> {isExpired ? "Expired" : isMaxedOut ? "Exhausted" : "Disabled"}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {coupon.expiryDate ? format(new Date(coupon.expiryDate), "MMM d, yyyy") : "Never expires"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-900">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
              
              {allCoupons.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <Tag className="w-12 h-12 text-slate-200 mb-4" />
                      <p className="text-lg font-medium text-slate-600">No coupons created yet</p>
                      <p className="text-sm">Click the button above to generate a new promotion.</p>
                    </div>
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
