import { requireAuth } from "@/features/auth/utils/server-auth";
import { db } from "@/db/drizzle";
import { stories } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import { Plus, Settings, BarChart3, Clock, CheckCircle2, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function DashboardPage({ searchParams }: { searchParams: { page?: string } }) {
  const user = await requireAuth();
  
  const page = Number(searchParams.page) || 1;
  const pageSize = 9;
  const offset = (page - 1) * pageSize;

  // Fetch paginated stories
  const userStories = await db.select().from(stories)
    .where(eq(stories.userId, user.auth.id))
    .orderBy(desc(stories.createdAt))
    .limit(pageSize)
    .offset(offset);

  // Fetch total counts for metrics and pagination
  const allStories = await db.select({ id: stories.id, status: stories.status }).from(stories)
    .where(eq(stories.userId, user.auth.id));
    
  const totalStoriesCount = allStories.length;
  const totalPages = Math.ceil(totalStoriesCount / pageSize);
  const draftCount = allStories.filter(s => s.status === "DRAFT").length;
  const publishedCount = allStories.filter(s => s.status === "PUBLISHED").length;

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Dashboard Sidebar */}
      <aside className="w-full md:w-64 border-r border-foreground/10 bg-card p-6 flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-playfair font-bold text-primary mb-1">Dashboard</h2>
          <p className="text-sm text-muted-foreground truncate">{user.auth.email}</p>
        </div>
        
        <nav className="flex flex-col gap-2 flex-grow">
          <Button variant="secondary" className="justify-start bg-foreground/5" asChild>
            <Link href="/dashboard"><BarChart3 className="w-4 h-4 mr-3" /> Overview</Link>
          </Button>
          <Button variant="ghost" className="justify-start text-muted-foreground hover:text-foreground" asChild>
            <Link href="/dashboard/settings"><Settings className="w-4 h-4 mr-3" /> Settings</Link>
          </Button>
        </nav>
        
        <Button className="w-full rounded-full shadow-lg" asChild>
          <Link href="/create"><Plus className="w-4 h-4 mr-2" /> New Story</Link>
        </Button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 sm:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Analytics Header */}
          <div>
            <h1 className="text-3xl font-bold mb-6">Welcome back</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-card border border-foreground/10 p-6 rounded-2xl shadow-sm">
                <p className="text-sm text-muted-foreground font-medium mb-2">Total Stories</p>
                <p className="text-4xl font-bold">{totalStoriesCount}</p>
              </div>
              <div className="bg-card border border-foreground/10 p-6 rounded-2xl shadow-sm">
                <p className="text-sm text-muted-foreground font-medium mb-2">Published</p>
                <div className="flex items-end gap-2">
                  <p className="text-4xl font-bold text-emerald-500">{publishedCount}</p>
                  <Globe className="w-5 h-5 text-emerald-500 mb-1" />
                </div>
              </div>
              <div className="bg-card border border-foreground/10 p-6 rounded-2xl shadow-sm">
                <p className="text-sm text-muted-foreground font-medium mb-2">Drafts</p>
                <div className="flex items-end gap-2">
                  <p className="text-4xl font-bold text-amber-500">{draftCount}</p>
                  <Clock className="w-5 h-5 text-amber-500 mb-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Stories List */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Your Stories</h2>
            </div>
            
            {userStories.length === 0 ? (
              <div className="text-center py-20 bg-card border border-foreground/10 rounded-3xl">
                <div className="w-16 h-16 bg-foreground/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No stories yet</h3>
                <p className="text-muted-foreground mb-6">Create your first emotional surprise today.</p>
                <Button asChild><Link href="/create">Start Creating</Link></Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userStories.map(story => {
                    const content = story.content as any;
                    const isPublished = story.status === "PUBLISHED";
                    return (
                      <div key={story.id} className="group bg-card border border-foreground/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${isPublished ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}>
                            {story.status}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold font-playfair mb-2 leading-tight">
                          {content.title || "Untitled Draft"}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-6">
                          Last updated {new Date(story.updatedAt).toLocaleDateString()}
                        </p>
                        
                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-foreground/5">
                          {isPublished ? (
                            <Button variant="ghost" className="text-primary hover:bg-primary/5 px-0 group-hover:px-4 transition-all" asChild>
                              <Link href={`/s/${story.slug}`}>
                                View Live <ArrowRight className="w-4 h-4 ml-2" />
                              </Link>
                            </Button>
                          ) : (
                            <Button variant="ghost" className="text-foreground hover:bg-foreground/5 px-0 group-hover:px-4 transition-all" asChild>
                              <Link href={`/create?id=${story.id}`}>
                                Edit Draft <ArrowRight className="w-4 h-4 ml-2" />
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-8">
                    <Button variant="outline" disabled={page <= 1} asChild={page > 1}>
                      {page > 1 ? <Link href={`/dashboard?page=${page - 1}`}>Previous</Link> : <span>Previous</span>}
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      Page {page} of {totalPages}
                    </span>
                    <Button variant="outline" disabled={page >= totalPages} asChild={page < totalPages}>
                      {page < totalPages ? <Link href={`/dashboard?page=${page + 1}`}>Next</Link> : <span>Next</span>}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
