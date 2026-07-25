import { pgTable, uuid, varchar, text, timestamp, boolean, jsonb, integer } from "drizzle-orm/pg-core";
import { timestamps } from "../utils";

export const siteSettings = pgTable("site_settings", {
  key: varchar("key", { length: 255 }).primaryKey(),
  value: jsonb("value").notNull(),
  ...timestamps,
});

export const adminLogs = pgTable("admin_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  adminEmail: varchar("admin_email", { length: 255 }).notNull(),
  action: varchar("action", { length: 255 }).notNull(),
  target: varchar("target", { length: 255 }),
  details: jsonb("details"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  isVisible: boolean("is_visible").default(true).notNull(),
  ...timestamps,
});

export const coupons = pgTable("coupons", {
  id: uuid("id").primaryKey().defaultRandom(),
  code: varchar("code", { length: 50 }).notNull().unique(),
  discountType: varchar("discount_type", { length: 20 }).notNull(), // 'PERCENTAGE' or 'FIXED'
  discountValue: integer("discount_value").notNull(), // e.g. 10 for 10% or 5000 for Rs.50
  usageLimit: integer("usage_limit"), // null means unlimited
  usageCount: integer("usage_count").default(0).notNull(),
  expiryDate: timestamp("expiry_date"),
  isActive: boolean("is_active").default(true).notNull(),
  ...timestamps,
});
