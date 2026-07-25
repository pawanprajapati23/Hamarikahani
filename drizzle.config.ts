import type { Config } from "drizzle-kit";
import { env } from "./src/config/env";

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL || "postgres://dummy:dummy@localhost:5432/dummy",
  },
  verbose: true,
  strict: true,
} satisfies Config;
