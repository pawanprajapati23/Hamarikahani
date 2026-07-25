import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { roleEnum } from "./enums";
import { timestamps } from "../utils";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(), // Maps 1:1 with Supabase auth.users
  email: varchar("email", { length: 255 }).notNull().unique(),
  fullName: varchar("full_name", { length: 255 }),
  avatarUrl: varchar("avatar_url", { length: 1024 }),
  role: roleEnum("role").default("USER").notNull(),
  ...timestamps,
});
