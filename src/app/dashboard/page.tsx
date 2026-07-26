import { requireAuth } from "@/features/auth/utils/server-auth";
import { signOut } from "@/features/auth/api/actions";
import { db } from "@/db/drizzle";
import { stories, StoryContent } from "@/db/schema/stories";
import { eq, desc, and, isNull, sql } from "drizzle-orm";
import Link from "next/link";
import { Plus, Settings, BarChart3, Clock, Globe, ArrowRight, LogOut, LayoutTemplate, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyLinkButton, ShareButton } from "@/features/dashboard/components/DashboardActions";

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const user = await requireAuth();
  
  const { page: pageStr } = await searchParams;
  const page = Number(pageStr) || 1;
  const pageSize = 9;
  const offset = (page - 1) * pageSize;

  // Fetch paginated stories
  const userStories = await db.select().from(stories)
    .where(
      and(
        eq(stories.userId, user.auth.id),
        isNull(stories.deletedAt)
      )
    )
    .orderBy(desc(stories.createdAt))
    .limit(pageSize)
    .offset(offset);

  // Fetch total counts for metrics using SQL aggregations instead of loading everything into memory
  const statusCounts = await db.select({
    status: stories.status,
    count: sql<number>`count(*)::int`
  })
  .from(stories)
  .where(
    and(
      eq(stories.userId, user.auth.id),
      isNull(stories.deletedAt)
    )
  )
  .groupBy(stories.status);
    
  let draftCount = 0;
  let publishedCount = 0;
  
  statusCounts.forEach(row => {
    if (row.status === "DRAFT") draftCount = row.count;
    if (row.status === "PUBLISHED") publishedCount = row.count;
  });

  const totalStoriesCount = draftCount + publishedCount;
  const totalPages = Math.ceil(totalStoriesCount / pageSize);

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://hamarikahani.in";

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Dashboard Sidebar */}
      <aside className="w-full md:w-64 border-r border-border/40 bg-secondary/30 p-6 flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-playfair font-bold text-foreground mb-1">Dashboard</h2>
          <p className="text-sm font-medium text-muted-foreground truncate">{user.auth.email}</p>
        </div>
        
        <nav className="flex flex-col gap-2 flex-grow">
          <Button variant="secondary" className="justify-start bg-background shadow-sm border border-border/40" asChild>
            <Link href="/dashboard"><LayoutTemplate className="w-4 h-4 mr-3" /> My Templates</Link>
          </Button>
          <Button variant="ghost" className="justify-start text-muted-foreground hover:text-foreground" asChild>
            <Link href="/dashboard/settings"><Settings className="w-4 h-4 mr-3" /> Settings</Link>
          </Button>
        </nav>
        <div className="mt-auto space-y-4">
          <Button className="w-full rounded-full shadow-lg" asChild>
            <Link href="/"><Plus className="w-4 h-4 mr-2" /> New Template</Link>
          </Button>
          <form action={signOut}>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
              <LogOut className="w-4 h-4 mr-3" /> Log out
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 sm:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Analytics Header */}
          <div>
            <h1 className="text-3xl font-bold mb-8 tracking-tight">Welcome back</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-card border border-border/50 p-6 rounded-3xl shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <p className="text-sm text-muted-foreground font-medium mb-2 uppercase tracking-wider">Total Generated</p>
                <p className="text-4xl font-bold tracking-tight">{totalStoriesCount}</p>
              </div>
              <div className="bg-card border border-border/50 p-6 rounded-3xl shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <p className="text-sm text-muted-foreground font-medium mb-2 uppercase tracking-wider">Active Links</p>
                <div className="flex items-end gap-2">
                  <p className="text-4xl font-bold tracking-tight text-emerald-500">{publishedCount}</p>
                  <Globe className="w-5 h-5 text-emerald-500 mb-1" />
                </div>
              </div>
              <div className="bg-card border border-border/50 p-6 rounded-3xl shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <p className="text-sm text-muted-foreground font-medium mb-2 uppercase tracking-wider">Unpaid Drafts</p>
                <div className="flex items-end gap-2">
                  <p className="text-4xl font-bold tracking-tight text-amber-500">{draftCount}</p>
                  <Clock className="w-5 h-5 text-amber-500 mb-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Stories List */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">My Templates</h2>
            </div>
            
            {userStories.length === 0 ? (
              <div className="text-center py-24 bg-card border border-border/50 rounded-3xl shadow-lg flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <LayoutTemplate className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">No templates yet</h3>
                <p className="text-muted-foreground mb-8 max-w-md">Create your first emotional surprise today. It only takes a few minutes to build something beautiful.</p>
                <Button asChild className="rounded-full shadow-lg shadow-primary/20"><Link href="/">Explore Templates</Link></Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {userStories.map(story => {
                    const content = story.content as StoryContent;
                    const isPublished = story.status === "PUBLISHED";
                    const fullUrl = `${baseUrl}/s/${story.slug}`;
                    
                    return (
                      <div key={story.id} className="group bg-card border border-border/50 rounded-3xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-4">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${isPublished ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}>
                            {isPublished ? "Paid & Active" : "Unpaid Draft"}
                          </span>
                          {/* <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-error rounded-full"><Trash2 className="w-4 h-4" /></Button> */}
                        </div>
                        
                        <h3 className="text-2xl font-bold font-playfair mb-1 leading-tight tracking-tight">
                          {story.title || "Untitled Template"}
                        </h3>
                        <p className="text-sm text-primary mb-4 font-medium">
                          hamarikahani.in/s/{story.slug}
                        </p>
                        <p className="text-sm font-medium text-muted-foreground mb-8">
                          Created {new Date(story.createdAt).toLocaleDateString()}
                        </p>
                        
                        <div className="mt-auto flex flex-col gap-3 pt-4 border-t border-border/40">
                          {isPublished ? (
                            <>
                              <div className="flex gap-2">
                                <CopyLinkButton url={fullUrl} />
                                <ShareButton url={fullUrl} title={story.title} />
                              </div>
                              <Button variant="ghost" className="text-primary hover:bg-primary/5 rounded-xl w-full justify-between" asChild>
                                <Link href={`/s/${story.slug}`}>
                                  View Live Page <ArrowRight className="w-4 h-4" />
                                </Link>
                              </Button>
                            </>
                          ) : (
                            <Button variant="default" className="w-full rounded-xl" asChild>
                              {/* TODO: Create a proper resume checkout link if needed, for now just show a note or link to home */}
                              <Link href="/">
                                Create New <ArrowRight className="w-4 h-4 ml-2" />
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
