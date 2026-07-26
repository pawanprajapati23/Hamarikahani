import { pgTable, uuid, varchar, jsonb, uniqueIndex, index, integer } from "drizzle-orm/pg-core";
import { storyStatusEnum } from "./enums";
import { users } from "./users";
import { themes } from "./themes";
import { timestamps } from "../utils";
import { sql } from "drizzle-orm";

export interface EditorBlock {
  id: string;
  type: "text" | "image" | "video" | "music" | "quote" | "spacer" | "valentine_template";
  content: string;
  metadata?: Record<string, any>;
}

export interface StoryContent {
  title?: string;
  category?: string;
  blocks?: EditorBlock[];
}

export const stories = pgTable(
  "stories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    themeId: uuid("theme_id").notNull().references(() => themes.id, { onDelete: "restrict" }),
    slug: varchar("slug", { length: 255 }),
    status: storyStatusEnum("status").default("DRAFT").notNull(),
    views: integer("views").default(0).notNull(),
    content: jsonb("content").notNull().default({}), // Dynamic story content
    ...timestamps,
  },
  (table) => ({
    // Partial unique index: Slugs must be unique, but only if they are not NULL (drafts have no slug)
    uniqueSlugIdx: uniqueIndex("unique_slug_idx")
      .on(table.slug)
      .where(sql`${table.slug} IS NOT NULL`),
    userIdIdx: index("stories_user_id_idx").on(table.userId),
    statusIdx: index("stories_status_idx").on(table.status),
  })
);
