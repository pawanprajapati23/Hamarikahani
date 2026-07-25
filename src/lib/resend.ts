import { Resend } from "resend";
import { env } from "@/config/env";

// Instantiated safely to prevent build crashes if env vars are missing locally
export const resend = new Resend(env.RESEND_API_KEY || "dummy_key");
