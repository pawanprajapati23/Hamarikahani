import { cache } from "react";
import { db } from "@/db/drizzle";
import { stories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { PublicStoryRenderer } from "@/features/story/components/PublicStoryRenderer";
import { Metadata } from "next";
import { StoryContent } from "@/db/schema/stories";

const getStory = cache(async (slug: string) => {
  const [story] = await db.select().from(stories).where(eq(stories.slug, slug));
  return story;
});

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const story = await getStory(params.slug);
  if (!story || story.status !== "PUBLISHED") return { title: "Story Not Found" };
  
  const content = story.content as StoryContent;
  return {
    title: `${content.title || "A special story for you"} | HamariKahani`,
    description: "Someone created a beautiful emotional surprise for you on HamariKahani.",
    openGraph: {
      title: content.title,
      description: "A digital surprise made with love.",
      type: "website",
    }
  };
}

export default async function PublicStoryPage({ params }: { params: { slug: string } }) {
  // Query the story from Postgres matching the highly-optimized uniqueSlug index
  // Deduplicated via React cache()
  const story = await getStory(params.slug);
  
  if (!story || story.status !== "PUBLISHED") {
    return notFound();
  }

  const content = story.content as StoryContent;
  
  // Update views/analytics asynchronously without blocking the render (Fire and Forget)
  fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/analytics/view`, { method: "POST", body: JSON.stringify({ storyId: story.id }) }).catch(console.error);

  return (
    <main className="min-h-screen bg-background">
      <PublicStoryRenderer 
        title={content.title || ""}
        blocks={content.blocks || []}
        themeId={story.themeId} 
        slug={params.slug}
      />
    </main>
  );
}
