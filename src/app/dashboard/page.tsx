import { requireAuth } from "@/features/auth/utils/server-auth";
import { signOut } from "@/features/auth/api/actions";
import { db } from "@/db/drizzle";
import { stories, StoryContent } from "@/db/schema/stories";
import { eq, desc, and, isNull, sql } from "drizzle-orm";
import Link from "next/link";
import { Plus, Settings, Globe, ArrowRight, LogOut, LayoutTemplate, Home, Sparkles, Heart } from "lucide-react";
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
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
      {/* Premium Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-400/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-rose-400/10 blur-[120px] rounded-full" />
      </div>

      <div className="flex flex-col md:flex-row relative z-10 min-h-screen">
        {/* Dashboard Sidebar - Glassmorphism */}
        <aside className="w-full md:w-72 bg-white/60 backdrop-blur-2xl border-r border-white/50 p-6 md:p-8 flex flex-col gap-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          <UserProfile initialName={userName} email={user.auth.email || ""} />
          
          <nav className="flex flex-col gap-2 flex-grow">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 pl-3">Menu</p>
            <Button variant="ghost" className="justify-start hover:bg-white hover:shadow-sm hover:text-indigo-600 rounded-xl transition-all" asChild>
              <Link href="/"><Home className="w-4 h-4 mr-3" /> Home</Link>
            </Button>
            <Button variant="secondary" className="justify-start bg-indigo-50/50 text-indigo-600 shadow-sm border border-indigo-100/50 rounded-xl" asChild>
              <Link href="/dashboard"><LayoutTemplate className="w-4 h-4 mr-3" /> My Templates</Link>
            </Button>
            <Button variant="ghost" className="justify-start text-slate-500 hover:text-slate-800 hover:bg-white hover:shadow-sm rounded-xl transition-all" asChild>
              <Link href="/dashboard/settings"><Settings className="w-4 h-4 mr-3" /> Settings</Link>
            </Button>
          </nav>
          
          <div className="mt-auto space-y-4">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-5 rounded-2xl shadow-xl shadow-indigo-500/20 mb-6 text-center space-y-3 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <Sparkles className="w-6 h-6 text-white/90 mx-auto animate-pulse" />
              <h4 className="text-sm font-bold text-white">Create More Magic</h4>
              <p className="text-xs text-white/70 leading-relaxed">Surprise your loved ones with premium templates.</p>
              <Button className="w-full rounded-xl bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg mt-2" size="sm" asChild>
                <Link href="/"><Plus className="w-4 h-4 mr-2" /> New Template</Link>
              </Button>
            </div>

            <form action={signOut}>
              <Button variant="ghost" className="w-full justify-start text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors">
                <LogOut className="w-4 h-4 mr-3" /> Log out
              </Button>
            </form>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 sm:p-8 lg:p-12 overflow-y-auto">
          <div className="max-w-6xl mx-auto space-y-10">
            
            {/* Analytics Header - Premium Cards */}
            <div className="mb-12">
              <h1 className="text-3xl lg:text-4xl font-bold mb-8 font-playfair tracking-tight text-slate-800">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{userName.split(' ')[0]}</span>
              </h1>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white/80 backdrop-blur-xl border border-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-full blur-xl -mr-10 -mt-10" />
                  <p className="text-[11px] text-slate-400 font-bold mb-2 uppercase tracking-widest relative z-10">Total Magic Created</p>
                  <p className="text-4xl font-bold tracking-tight text-slate-800 relative z-10">{totalStoriesCount}</p>
                </div>
                
                <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-6 rounded-[2rem] shadow-[0_8px_30px_rgba(16,185,129,0.2)] hover:shadow-[0_12px_40px_rgba(16,185,129,0.3)] transition-all duration-300 hover:-translate-y-1 relative overflow-hidden text-white">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
                  <p className="text-[11px] text-emerald-100 font-bold mb-2 uppercase tracking-widest relative z-10">Live & Active Surprises</p>
                  <div className="flex items-end gap-3 relative z-10">
                    <p className="text-4xl font-bold tracking-tight">{publishedCount}</p>
                    <Globe className="w-6 h-6 text-emerald-200 mb-1" />
                  </div>
                </div>
                
                <div className="bg-white/80 backdrop-blur-xl border border-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-full blur-xl -mr-10 -mt-10" />
                  <p className="text-[11px] text-slate-400 font-bold mb-2 uppercase tracking-widest relative z-10">Drafts Waiting</p>
                  <div className="flex items-end gap-3 relative z-10">
                    <p className="text-4xl font-bold tracking-tight text-slate-800">{draftCount}</p>
                    <LayoutTemplate className="w-5 h-5 text-amber-500 mb-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* Stories List */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold font-playfair text-slate-800">My Collection</h2>
              </div>
              
              {userStories.length === 0 ? (
                <div className="text-center py-24 bg-white/50 backdrop-blur-xl border border-white rounded-[3rem] shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <Heart className="w-8 h-8 text-indigo-500" />
                  </div>
                  <h3 className="text-2xl font-playfair font-bold mb-3 text-slate-800">No magic created yet</h3>
                  <p className="text-slate-500 mb-8 max-w-sm leading-relaxed text-sm">Create your first emotional surprise today. It only takes a few minutes to build something beautiful.</p>
                  <Button asChild className="rounded-full shadow-xl shadow-indigo-500/20 bg-indigo-600 hover:bg-indigo-700 px-8 h-12 text-md">
                    <Link href="/">Explore Templates <ArrowRight className="w-4 h-4 ml-2" /></Link>
                  </Button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {userStories.map(story => {
                      const content = story.content as StoryContent;
                      const isPublished = story.status === "PUBLISHED";
                      const fullUrl = `${baseUrl}/s/${story.slug}`;
                      
                      return (
                        <div key={story.id} className="group bg-white/70 backdrop-blur-xl border border-white rounded-[2rem] p-6 shadow-[0_8px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(79,70,229,0.1)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative overflow-hidden">
                          {/* Animated gradient top border on hover */}
                          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          <div className="flex justify-between items-start mb-6">
                            <span className={`text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest ${isPublished ? 'bg-emerald-100/50 text-emerald-700 border border-emerald-200/50' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                              {isPublished ? "Live Surprise" : "Draft"}
                            </span>
                          </div>
                          
                          <h3 className="text-xl font-bold font-playfair mb-2 leading-tight tracking-tight text-slate-800 group-hover:text-indigo-600 transition-colors">
                            {content.title || "Untitled Template"}
                          </h3>
                          <p className="text-xs text-slate-400 font-medium mb-8 flex-grow">
                            Updated {new Date(story.updatedAt || story.createdAt).toLocaleDateString()}
                          </p>
                          
                          <div className="mt-auto flex flex-col gap-3 pt-5 border-t border-slate-100/50">
                            {isPublished ? (
                              <>
                                <div className="flex gap-2">
                                  <CopyLinkButton url={fullUrl} />
                                  <ShareButton url={fullUrl} title={content.title || ""} />
                                </div>
                                <Button className="rounded-xl w-full justify-between bg-slate-900 text-white hover:bg-slate-800 shadow-md" asChild>
                                  <Link href={`/s/${story.slug}`}>
                                    View Live Page <ArrowRight className="w-4 h-4" />
                                  </Link>
                                </Button>
                              </>
                            ) : (
                              <Button variant="outline" className="w-full rounded-xl border-indigo-200 text-indigo-600 hover:bg-indigo-50" asChild>
                                <Link href={`/templates/${(content.blocks?.[0]?.type || "birthday_template").replace("_template", "")}/create?edit=${story.id}`}>
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
                    <div className="flex items-center justify-center gap-4 mt-12">
                      <Button variant="outline" className="rounded-full bg-white/50 backdrop-blur-md" disabled={page <= 1} asChild={page > 1}>
                        {page > 1 ? <Link href={`/dashboard?page=${page - 1}`}>Previous</Link> : <span>Previous</span>}
                      </Button>
                      <span className="text-sm font-medium text-slate-500">
                        Page {page} of {totalPages}
                      </span>
                      <Button variant="outline" className="rounded-full bg-white/50 backdrop-blur-md" disabled={page >= totalPages} asChild={page < totalPages}>
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
    </div>
  );
}
