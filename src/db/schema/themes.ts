import { pgTable, uuid, varchar, jsonb, boolean } from "drizzle-orm/pg-core";
import { timestamps } from "../utils";

export const themes = pgTable("themes", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  config: jsonb("config").notNull(), // Stores colors, fonts, layout definitions
  isActive: boolean("is_active").default(true).notNull(),
  ...timestamps,
});
