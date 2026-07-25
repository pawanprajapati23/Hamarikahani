import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/config/env";
import * as schema from "./schema";

// Disable prefetch as it is not supported for "Transaction" pool mode (essential for Supavisor edge pooling)
const client = postgres(env.DATABASE_URL || "postgres://dummy:dummy@localhost:5432/dummy", { prepare: false });

export const db = drizzle(client, { schema });
