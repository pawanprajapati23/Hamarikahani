"use server";

import { requireAuth } from "@/features/auth/utils/server-auth";
import { db } from "@/db/drizzle";
import { stories } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function saveStoryDraft(data: {
  storyId: string | null;
  category: string;
  themeId: string;
  title: string;
  blocks: any[];
}) {
  try {
    const user = await requireAuth();


    
    // Fallback theme ID if empty (from our seeder)
    const activeThemeId = data.themeId || "683c7554-313c-41c5-8851-339ff9d35643";

    if (data.storyId && data.storyId !== "mock-story-id-123") {
      await db.update(stories).set({
        themeId: activeThemeId,
        content: { title: data.title, blocks: data.blocks },
        updatedAt: new Date().toISOString()
      }).where(eq(stories.id, data.storyId));
      return { success: true, id: data.storyId };
    } else {
      const inserted = await db.insert(stories).values({
        userId: user.auth.id,
        themeId: activeThemeId,
        status: "DRAFT",
        content: { title: data.title, blocks: data.blocks }
      }).returning({ id: stories.id });
      
      return { success: true, id: inserted[0].id };
    }
  } catch (error: any) {
    console.error(error);
    return { success: false, error: "Failed to save draft" };
  }
}

export async function publishStory(storyId: string | null, slug: string) {
  try {
    const user = await requireAuth();
    if (!storyId || storyId === "mock-story-id-123") return { success: false, error: "Story ID missing or invalid" };



    await db.update(stories)
      .set({ status: "PUBLISHED", slug, updatedAt: new Date().toISOString() })
      .where(eq(stories.id, storyId));
    
    return { success: true };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: "Failed to publish story" };
  }
}
