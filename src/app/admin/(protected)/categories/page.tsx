import { requireAdmin } from "@/features/auth/utils/server-auth";
import { db } from "@/db/drizzle";
import { categories } from "@/db/schema";
import { desc } from "drizzle-orm";
import { formatDistanceToNow } from "date-fns";
import { Plus, MoreVertical, FolderTree, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function AdminCategoriesPage() {
  await requireAdmin(true);

  const allCategories = await db.select().from(categories).orderBy(desc(categories.createdAt));

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-sans text-slate-800">Category Management</h1>
          <p className="text-slate-500 mt-1">Organize stories by themes, events, or relationships</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" /> New Category
        </Button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Category Name</th>
                <th className="px-6 py-4 font-semibold">Slug (URL)</th>
                <th className="px-6 py-4 font-semibold">Visibility</th>
                <th className="px-6 py-4 font-semibold">Created</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allCategories.map(cat => (
                <tr key={cat.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
                        <FolderTree className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-slate-900 text-base">{cat.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-mono">
                      {cat.slug}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    {cat.isVisible ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-100 text-emerald-700">
                        <Eye className="w-3 h-3" /> Visible
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-500">
                        <EyeOff className="w-3 h-3" /> Hidden
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {formatDistanceToNow(new Date(cat.createdAt), { addSuffix: true })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-900">
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </td>
                </tr>
              ))}
              
              {allCategories.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <FolderTree className="w-12 h-12 text-slate-200 mb-4" />
                      <p className="text-lg font-medium text-slate-600">No categories found</p>
                      <p className="text-sm">Create categories to help users find themes easier.</p>
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
