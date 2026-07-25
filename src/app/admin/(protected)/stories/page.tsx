import { requireAdmin } from "@/features/auth/utils/server-auth";
import { db } from "@/db/drizzle";
import { stories, users, StoryContent } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { formatDistanceToNow } from "date-fns";
import { Search, MoreVertical, Eye, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default async function AdminStoriesPage() {
  await requireAdmin(true);

  const latestStories = await db.select({
    id: stories.id,
    slug: stories.slug,
    status: stories.status,
    content: stories.content,
    views: stories.views,
    createdAt: stories.createdAt,
    userFullName: users.fullName,
    userEmail: users.email,
  })
  .from(stories)
  .leftJoin(users, eq(stories.userId, users.id))
  .orderBy(desc(stories.createdAt))
  .limit(100);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-sans text-slate-800">Story Management</h1>
          <p className="text-slate-500 mt-1">Review, manage, and moderate user stories</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input 
              type="text" 
              placeholder="Search stories by title or slug..." 
              className="pl-10 bg-white"
            />
          </div>
          <div className="flex gap-2">
            <select className="bg-white border border-slate-200 rounded-lg text-sm px-3 py-2 text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Story Title</th>
                <th className="px-6 py-4 font-semibold">Author</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Views</th>
                <th className="px-6 py-4 font-semibold">Created</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {latestStories.map(story => {
                const content = story.content as StoryContent;
                return (
                  <tr key={story.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{content.title || "Untitled Story"}</div>
                      {story.slug && (
                        <div className="text-xs text-indigo-600 font-mono mt-1">
                          /s/{story.slug}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-700">{story.userFullName || "Unknown"}</div>
                      <div className="text-xs text-slate-500">{story.userEmail}</div>
                    </td>
                    <td className="px-6 py-4">
                      {story.status === "PUBLISHED" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                          <CheckCircle2 className="w-3 h-3" /> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                          <FileText className="w-3 h-3" /> Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Eye className="w-4 h-4 text-slate-400" /> {story.views.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {formatDistanceToNow(new Date(story.createdAt), { addSuffix: true })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {story.status === "PUBLISHED" && story.slug && (
                        <Button variant="ghost" size="sm" asChild className="mr-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                          <Link href={`/s/${story.slug}`} target="_blank">View</Link>
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-900">
                        <MoreVertical className="w-5 h-5" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
              
              {latestStories.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No stories found.
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
