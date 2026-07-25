import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const connectionString = "postgresql://postgres.afjqfpdanurievyvtuev:MusicalPawan~pk@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true";
const client = postgres(connectionString, { prepare: false });
const db = drizzle(client);

async function main() {
  try {
    await client`ALTER TABLE "stories" ADD COLUMN "views" integer DEFAULT 0 NOT NULL;`;
    console.log("Migration completed");
  } catch (e: any) {
    if (e.message.includes("already exists")) {
      console.log("Column already exists");
    } else {
      console.error(e);
    }
  }
  process.exit(0);
}

main();
