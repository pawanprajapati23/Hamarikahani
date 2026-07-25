import { env } from "@/config/env";

type LogLevel = "info" | "warn" | "error" | "debug";

export const logger = {
  log: (level: LogLevel, message: string, meta?: Record<string, any>) => {
    const timestamp = new Date().toISOString();
    const logData = { timestamp, level, message, ...meta };

    if (env.NODE_ENV === "production") {
      // Structured JSON output for Datadog / CloudWatch / Vercel Logs in production
      console[level === "debug" ? "log" : level](JSON.stringify(logData));
    } else {
      // Human readable logs in local development
      console[level === "debug" ? "log" : level](`[${timestamp}] [${level.toUpperCase()}] ${message}`, meta || "");
    }
  },
  info: (message: string, meta?: Record<string, any>) => logger.log("info", message, meta),
  warn: (message: string, meta?: Record<string, any>) => logger.log("warn", message, meta),
  error: (message: string, meta?: Record<string, any>) => logger.log("error", message, meta),
  debug: (message: string, meta?: Record<string, any>) => logger.log("debug", message, meta),
};
