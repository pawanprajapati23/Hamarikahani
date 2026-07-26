import { requireAuth } from "@/features/auth/utils/server-auth";
import { signOut } from "@/features/auth/api/actions";
import { db } from "@/db/drizzle";
import { stories, StoryContent } from "@/db/schema/stories";
import { eq, desc, and, isNull, sql } from "drizzle-orm";
import Link from "next/link";
import { Plus, Settings, BarChart3, Clock, Globe, ArrowRight, LogOut, LayoutTemplate, Trash2, Home, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyLinkButton, ShareButton } from "@/features/dashboard/components/DashboardActions";
import { UserProfile } from "@/features/dashboard/components/UserProfile";

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const user = await requireAuth();
  const userName = user.auth.user_metadata?.full_name || user.auth.email?.split('@')[0] || "User";
  
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
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      {/* Dashboard Sidebar */}
      <aside className="w-full md:w-72 border-r border-border/40 bg-white p-6 md:p-8 flex flex-col gap-10 shadow-sm z-10 relative">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        
        <UserProfile initialName={userName} email={user.auth.email || ""} />
        
        <nav className="flex flex-col gap-2 flex-grow relative z-10">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2 pl-3">Menu</p>
          <Button variant="ghost" className="justify-start hover:bg-primary/5 hover:text-primary rounded-xl" asChild>
            <Link href="/"><Home className="w-4 h-4 mr-3" /> Home</Link>
          </Button>
          <Button variant="secondary" className="justify-start bg-primary/5 text-primary shadow-sm border border-primary/10 rounded-xl" asChild>
            <Link href="/dashboard"><LayoutTemplate className="w-4 h-4 mr-3" /> My Templates</Link>
          </Button>
          <Button variant="ghost" className="justify-start text-muted-foreground hover:text-foreground rounded-xl" asChild>
            <Link href="/dashboard/settings"><Settings className="w-4 h-4 mr-3" /> Settings</Link>
          </Button>
        </nav>
        
        <div className="mt-auto space-y-4 relative z-10">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-2xl border border-primary/10 mb-6 text-center space-y-3">
            <Sparkles className="w-6 h-6 text-primary mx-auto" />
            <h4 className="text-sm font-bold text-foreground">Create More Magic</h4>
            <p className="text-xs text-muted-foreground">Surprise your loved ones with premium templates.</p>
            <Button className="w-full rounded-xl shadow-lg shadow-primary/20" size="sm" asChild>
              <Link href="/"><Plus className="w-4 h-4 mr-2" /> New Template</Link>
            </Button>
          </div>

          <form action={signOut}>
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors">
              <LogOut className="w-4 h-4 mr-3" /> Log out
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Analytics Header */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-border/40">
            <h1 className="text-3xl lg:text-4xl font-bold mb-8 font-playfair tracking-tight text-foreground">Welcome back, {userName.split(' ')[0]}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <p className="text-xs text-slate-500 font-bold mb-2 uppercase tracking-widest">Total Templates</p>
                <p className="text-4xl font-bold tracking-tight text-slate-800">{totalStoriesCount}</p>
              </div>
              <div className="bg-emerald-50/50 border border-emerald-100 p-6 rounded-3xl hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <p className="text-xs text-emerald-600/70 font-bold mb-2 uppercase tracking-widest">Active Links</p>
                <div className="flex items-end gap-2">
                  <p className="text-4xl font-bold tracking-tight text-emerald-600">{publishedCount}</p>
                  <Globe className="w-5 h-5 text-emerald-500 mb-2" />
                </div>
              </div>
              <div className="bg-amber-50/50 border border-amber-100 p-6 rounded-3xl hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <p className="text-xs text-amber-600/70 font-bold mb-2 uppercase tracking-widest">Drafts</p>
                <div className="flex items-end gap-2">
                  <p className="text-4xl font-bold tracking-tight text-amber-600">{draftCount}</p>
                  <Clock className="w-5 h-5 text-amber-500 mb-2" />
                </div>
              </div>
            </div>
          </div>

          {/* Stories List */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold font-playfair text-foreground">My Collection</h2>
            </div>
            
            {userStories.length === 0 ? (
              <div className="text-center py-32 bg-white border border-border/40 rounded-[2rem] shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
                <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-6 shadow-inner relative z-10">
                  <LayoutTemplate className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-3xl font-playfair font-bold mb-3 relative z-10">No templates yet</h3>
                <p className="text-muted-foreground mb-10 max-w-md relative z-10 leading-relaxed text-sm">Create your first emotional surprise today. It only takes a few minutes to build something beautiful and memorable.</p>
                <Button asChild className="rounded-full shadow-lg shadow-primary/20 px-8 py-6 text-md relative z-10"><Link href="/">Explore Templates <ArrowRight className="w-4 h-4 ml-2" /></Link></Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {userStories.map(story => {
                    const content = story.content as StoryContent;
                    const isPublished = story.status === "PUBLISHED";
                    const fullUrl = `${baseUrl}/s/${story.slug}`;
                    
                    return (
                      <div key={story.id} className="group bg-white border border-border/40 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/40 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div className="flex justify-between items-start mb-6">
                          <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest ${isPublished ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                            {isPublished ? "Paid & Active" : "Unpaid Draft"}
                          </span>
                        </div>
                        
                        <h3 className="text-xl lg:text-2xl font-bold font-playfair mb-2 leading-tight tracking-tight text-slate-800 group-hover:text-primary transition-colors">
                          {story.title || "Untitled Template"}
                        </h3>
                        <p className="text-xs text-muted-foreground font-medium mb-6 flex-grow">
                          Last updated {new Date(story.updatedAt || story.createdAt).toLocaleDateString()}
                        </p>
                        
                        <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-slate-100">
                          {isPublished ? (
                            <>
                              <div className="flex gap-2">
                                <CopyLinkButton url={fullUrl} />
                                <ShareButton url={fullUrl} title={story.title} />
                              </div>
                              <Button variant="outline" className="rounded-xl w-full justify-between border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40" asChild>
                                <Link href={`/s/${story.slug}`}>
                                  View Live Page <ArrowRight className="w-4 h-4" />
                                </Link>
                              </Button>
                            </>
                          ) : (
                            <Button variant="default" className="w-full rounded-xl shadow-md shadow-primary/20" asChild>
                              <Link href={`/templates/${story.type.replace('_template', '')}/create?edit=${story.id}`}>
                                Edit Template <ArrowRight className="w-4 h-4 ml-2" />
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
