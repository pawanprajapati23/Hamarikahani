import { db } from "@/db/drizzle";
import { stories } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { storyId } = await req.json();

    if (!storyId) {
      return NextResponse.json({ error: "Missing storyId" }, { status: 400 });
    }

    // Atomically increment views count using SQL to prevent race conditions
    await db.update(stories)
      .set({ views: sql`${stories.views} + 1` })
      .where(eq(stories.id, storyId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update story views:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
