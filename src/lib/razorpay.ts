import Razorpay from "razorpay";
import { env } from "@/config/env";

// Instantiated safely for server environments
export const razorpay = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID || "dummy_id",
  key_secret: env.RAZORPAY_KEY_SECRET || "dummy_secret",
});
