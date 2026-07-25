import { relations } from "drizzle-orm";
import { users } from "./users";
import { stories } from "./stories";
import { themes } from "./themes";
import { transactions } from "./transactions";
import { assets } from "./assets";

export const usersRelations = relations(users, ({ many }) => ({
  stories: many(stories),
  transactions: many(transactions),
  assets: many(assets),
}));

export const themesRelations = relations(themes, ({ many }) => ({
  stories: many(stories),
}));

export const storiesRelations = relations(stories, ({ one, many }) => ({
  user: one(users, {
    fields: [stories.userId],
    references: [users.id],
  }),
  theme: one(themes, {
    fields: [stories.themeId],
    references: [themes.id],
  }),
  transactions: many(transactions),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(users, {
    fields: [transactions.userId],
    references: [users.id],
  }),
  story: one(stories, {
    fields: [transactions.storyId],
    references: [stories.id],
  }),
}));

export const assetsRelations = relations(assets, ({ one }) => ({
  user: one(users, {
    fields: [assets.userId],
    references: [users.id],
  }),
}));
