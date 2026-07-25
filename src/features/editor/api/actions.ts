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

    // Since we are building the Editor Foundation, we mock the final DB insert
    // to prevent Foreign Key constraints from failing (since the 'themes' table is unseeded).
    // In production, this will utilize standard db.insert/db.update via Drizzle.

    console.log("[Editor API] Saving draft for user:", user.auth.id, data);

    if (data.storyId) {
      // Mock Update
      return { success: true, id: data.storyId };
    } else {
      // Mock Insert
      return { success: true, id: "mock-story-id-123" };
    }
  } catch (error: any) {
    console.error(error);
    return { success: false, error: "Failed to save draft" };
  }
}

export async function publishStory(storyId: string | null, slug: string) {
  try {
    const user = await requireAuth();
    if (!storyId) return { success: false, error: "Story ID missing" };

    console.log("[Payment/Publish API] Verifying payment and publishing for user:", user.auth.id, slug);

    // MOCK Payment verification occurs here. If valid:
    // Update story in postgres to PUBLISHED and assign unique slug
    
    // In actual production (where themes are seeded), we would run:
    // await db.update(stories).set({ status: "PUBLISHED", slug }).where(eq(stories.id, storyId));
    
    return { success: true };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: "Failed to publish story" };
  }
}
