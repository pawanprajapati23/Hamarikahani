import { requireAuth } from "@/features/auth/utils/server-auth";
import { db } from "@/db/drizzle";
import { stories, StoryContent } from "@/db/schema/stories";
import { eq, desc, and, isNull, sql } from "drizzle-orm";
import Link from "next/link";
import { Globe, ArrowRight, LayoutTemplate, Heart, Eye, Share2, MoreHorizontal, Trash2, Edit3, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyLinkButton, ShareButton } from "@/features/dashboard/components/DashboardActions";
import { TEMPLATES } from "@/config/templates";

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

  // Fetch total counts for metrics using SQL aggregations
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
    <div className="p-5 sm:p-8 lg:p-12 max-w-7xl mx-auto space-y-8 sm:space-y-10">
      
      {/* Welcome & Analytics Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-2 sm:mb-3 font-playfair tracking-tight text-slate-800">
          Hi, <span className="text-gradient">{userName.split(' ')[0]}</span> 👋
        </h1>
        <p className="text-slate-500 mb-8 sm:mb-10 text-sm sm:text-lg">Manage your beautiful surprises and create new memories.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="glass-card rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-pink-50 rounded-full blur-xl -mr-10 -mt-10" />
            <p className="text-[10px] sm:text-xs text-slate-400 font-bold mb-2 uppercase tracking-widest relative z-10">Total Creations</p>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-800 relative z-10">{totalStoriesCount}</p>
          </div>
          
          <div className="bg-gradient-to-br from-pink-500 to-purple-500 p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] shadow-luxury-lg relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
            <p className="text-[10px] sm:text-xs text-pink-100 font-bold mb-2 uppercase tracking-widest relative z-10">Active Pages</p>
            <div className="flex items-end gap-2 sm:gap-3 relative z-10">
              <p className="text-3xl sm:text-4xl font-bold tracking-tight">{publishedCount}</p>
              <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-pink-200 mb-1" />
            </div>
          </div>
          
          <div className="hidden md:block glass-card rounded-[2rem] p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-full blur-xl -mr-10 -mt-10" />
            <p className="text-xs text-slate-400 font-bold mb-2 uppercase tracking-widest relative z-10">Drafts</p>
            <div className="flex items-end gap-3 relative z-10">
              <p className="text-4xl font-bold tracking-tight text-slate-800">{draftCount}</p>
              <LayoutTemplate className="w-5 h-5 text-purple-500 mb-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Stories List */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-playfair text-slate-800">My Creations</h2>
          
          <Button className="rounded-full glow-button bg-gradient-to-r from-pink-500 to-purple-500 active:scale-[0.97] transition-all px-6 h-12 sm:h-12 text-sm sm:text-base w-full sm:w-auto text-white border-0 touch-target" asChild>
            <Link href="/">✨ Create New Surprise</Link>
          </Button>
        </div>
        
        {userStories.length === 0 ? (
          <div className="text-center py-16 sm:py-24 glass-card rounded-[2rem] sm:rounded-[3rem] flex flex-col items-center justify-center px-5 sm:px-8">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <Heart className="w-8 h-8 text-pink-500" />
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold mb-3 text-slate-800">❤️ You haven&apos;t created any surprise yet.</h3>
            <p className="text-slate-500 mb-6 sm:mb-8 max-w-sm leading-relaxed text-sm">Create your first emotional surprise for someone special. It only takes a few minutes.</p>
            <Button asChild className="rounded-full glow-button bg-gradient-to-r from-pink-500 to-purple-500 active:scale-[0.97] transition-all px-8 h-14 text-base sm:text-lg text-white border-0 w-full sm:w-auto touch-target">
              <Link href="/">✨ Create Surprise</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {userStories.map(story => {
                const content = story.content as StoryContent;
                const isPublished = story.status === "PUBLISHED";
                const fullUrl = `${baseUrl}/s/${story.slug}`;
                const templateIdStr = (content.blocks?.[0]?.type || "birthday_template").replace("_template", "");
                const templateData = TEMPLATES.find(t => t.id === `${templateIdStr}_template`) || TEMPLATES[0];
                const coverImage = templateData.coverImage;
                
                return (
                  <div key={story.id} className="group hk-card flex flex-col h-full">
                    
                    {/* Cover Image */}
                    <div className="relative h-48 sm:h-56 w-full bg-slate-100 overflow-hidden">
                      {coverImage ? (
                        <img src={coverImage} alt={templateData.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-100">
                          <ImageIcon className="w-10 h-10 text-slate-300" />
                        </div>
                      )}
                      
                      {/* Overlay Gradients */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-md ${isPublished ? 'bg-pink-500/90 text-white shadow-lg shadow-pink-500/20' : 'bg-white/90 text-slate-700 shadow-lg'}`}>
                          {isPublished ? "Active" : "Draft"}
                        </span>
                      </div>
                      
                      {/* Title Overlay */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest mb-1 block">
                          {templateData.name}
                        </span>
                        <h3 className="text-xl font-bold font-playfair leading-tight text-white line-clamp-1">
                          {content.title || "Untitled Surprise"}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="p-5 sm:p-6 flex flex-col flex-grow">
                      
                      {/* URL & Meta */}
                      <div className="mb-6 space-y-2">
                        {isPublished ? (
                          <div className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
                            <a href={fullUrl} target="_blank" rel="noreferrer" className="text-pink-600 font-medium truncate hover:underline">
                              hamarikahani.in/s/{story.slug}
                            </a>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-sm text-slate-400">
                            <div className="w-2 h-2 rounded-full bg-slate-300" />
                            <span className="italic">Link not claimed yet</span>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
                          <span>Created: {new Date(story.createdAt).toLocaleDateString()}</span>
                          {isPublished ? (
                            <span className="text-pink-600 font-bold bg-pink-50 px-2 py-1 rounded-md">Paid ₹99</span>
                          ) : (
                            <span className="text-slate-400 bg-slate-50 px-2 py-1 rounded-md">Unpaid</span>
                          )}
                        </div>
                      </div>
                      
                      {/* Analytics (Simple) */}
                      {isPublished && (
                        <div className="grid grid-cols-3 gap-2 py-4 border-y border-pink-50 mb-6">
                          <div className="text-center">
                            <p className="text-xs text-slate-400 mb-1">Views</p>
                            <p className="font-bold text-slate-700">{story.views || 0}</p>
                          </div>
                          <div className="text-center border-x border-pink-50">
                            <p className="text-xs text-slate-400 mb-1">Shares</p>
                            <p className="font-bold text-slate-700">0</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-slate-400 mb-1">Reactions</p>
                            <p className="font-bold text-slate-700">-</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Actions */}
                      <div className="mt-auto flex flex-wrap gap-2 pt-2">
                        {isPublished ? (
                          <>
                            <Button className="flex-1 rounded-full bg-slate-900 text-white hover:bg-slate-800 shadow-md h-11" asChild>
                              <Link href={`/s/${story.slug}`}>
                                <Eye className="w-4 h-4 mr-2" /> Open
                              </Link>
                            </Button>
                            <CopyLinkButton url={fullUrl} />
                            <ShareButton url={fullUrl} title={content.title || ""} />
                            <Button variant="outline" size="icon" className="rounded-full border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 h-11 w-11">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button className="flex-1 rounded-full bg-pink-50 text-pink-600 hover:bg-pink-100 hover:text-pink-700 h-11" asChild>
                              <Link href={`/templates/${templateIdStr}/create?edit=${story.id}`}>
                                <Edit3 className="w-4 h-4 mr-2" /> Continue Editing
                              </Link>
                            </Button>
                            <Button variant="outline" size="icon" className="rounded-full border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 h-11 w-11">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-12">
                <Button variant="outline" className="rounded-full bg-white/50 backdrop-blur-md border-slate-200" disabled={page <= 1} asChild={page > 1}>
                  {page > 1 ? <Link href={`/dashboard?page=${page - 1}`}>Previous</Link> : <span>Previous</span>}
                </Button>
                <span className="text-sm font-medium text-slate-500">
                  Page {page} of {totalPages}
                </span>
                <Button variant="outline" className="rounded-full bg-white/50 backdrop-blur-md border-slate-200" disabled={page >= totalPages} asChild={page < totalPages}>
                  {page < totalPages ? <Link href={`/dashboard?page=${page + 1}`}>Next</Link> : <span>Next</span>}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
