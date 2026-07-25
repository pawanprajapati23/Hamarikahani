import { pgTable, uuid, varchar, index } from "drizzle-orm/pg-core";
import { assetTypeEnum } from "./enums";
import { users } from "./users";
import { timestamps } from "../utils";

export const assets = pgTable(
  "assets",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    providerId: varchar("provider_id", { length: 512 }).notNull(), // E.g., Cloudinary public_id
    url: varchar("url", { length: 1024 }).notNull(),
    type: assetTypeEnum("type").notNull(),
    ...timestamps,
  },
  (table) => ({
    userIdIdx: index("assets_user_id_idx").on(table.userId),
  })
);
