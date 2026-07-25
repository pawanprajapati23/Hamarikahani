import { pgEnum } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["USER", "ADMIN"]);
export const storyStatusEnum = pgEnum("story_status", ["DRAFT", "PENDING_PAYMENT", "PUBLISHED", "ARCHIVED"]);
export const transactionStatusEnum = pgEnum("transaction_status", ["INITIATED", "SUCCESS", "FAILED"]);
export const assetTypeEnum = pgEnum("asset_type", ["IMAGE", "AUDIO"]);
