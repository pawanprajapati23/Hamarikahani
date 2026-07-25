import { pgTable, uuid, varchar, integer, jsonb, index } from "drizzle-orm/pg-core";
import { transactionStatusEnum } from "./enums";
import { users } from "./users";
import { stories } from "./stories";
import { timestamps } from "../utils";

export const transactions = pgTable(
  "transactions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "restrict" }),
    storyId: uuid("story_id").notNull().references(() => stories.id, { onDelete: "restrict" }),
    razorpayOrderId: varchar("razorpay_order_id", { length: 255 }).notNull().unique(),
    razorpayPaymentId: varchar("razorpay_payment_id", { length: 255 }).unique(),
    amount: integer("amount").notNull(), // Stored in paise/cents to avoid floating point math
    status: transactionStatusEnum("status").default("INITIATED").notNull(),
    metadata: jsonb("metadata"), // Raw webhook dumps for financial debugging
    ...timestamps,
  },
  (table) => ({
    storyIdIdx: index("transactions_story_id_idx").on(table.storyId),
  })
);
