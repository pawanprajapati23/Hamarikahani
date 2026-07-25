import postgres from "postgres";

const connectionString = "postgresql://postgres.afjqfpdanurievyvtuev:MusicalPawan~pk@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true";
const client = postgres(connectionString, { prepare: false });

async function main() {
  try {
    await client`
      CREATE TABLE IF NOT EXISTS "site_settings" (
        "key" varchar(255) PRIMARY KEY,
        "value" jsonb NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL,
        "deleted_at" timestamp
      );
    `;

    await client`
      CREATE TABLE IF NOT EXISTS "admin_logs" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "admin_email" varchar(255) NOT NULL,
        "action" varchar(255) NOT NULL,
        "target" varchar(255),
        "details" jsonb,
        "created_at" timestamp DEFAULT now() NOT NULL
      );
    `;

    await client`
      CREATE TABLE IF NOT EXISTS "categories" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "name" varchar(255) NOT NULL,
        "slug" varchar(255) NOT NULL UNIQUE,
        "is_visible" boolean DEFAULT true NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL,
        "deleted_at" timestamp
      );
    `;

    await client`
      CREATE TABLE IF NOT EXISTS "coupons" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "code" varchar(50) NOT NULL UNIQUE,
        "discount_type" varchar(20) NOT NULL,
        "discount_value" integer NOT NULL,
        "usage_limit" integer,
        "usage_count" integer DEFAULT 0 NOT NULL,
        "expiry_date" timestamp,
        "is_active" boolean DEFAULT true NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL,
        "deleted_at" timestamp
      );
    `;

    console.log("Admin migration completed");
  } catch (e: any) {
    console.error(e);
  }
  process.exit(0);
}

main();
