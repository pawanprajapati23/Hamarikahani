"use server";

import { razorpay } from "@/lib/razorpay";
import { requireAuth } from "@/features/auth/utils/server-auth";
import { env } from "@/config/env";
import crypto from "crypto";
import { publishStory } from "@/features/editor/api/actions";

export async function createOrder(amount: number = 100) {
  try {
    const user = await requireAuth();

    const options = {
      amount: amount, 
      currency: "INR",
      receipt: `rcpt_${Date.now()}`
    };
    
    const order = await razorpay.orders.create(options);
    return { 
      success: true, 
      orderId: order.id, 
      amount: order.amount,
      keyId: env.RAZORPAY_KEY_ID // Send public key to client
    };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: "Failed to create Razorpay order" };
  }
}

export async function verifyPayment(
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string,
  storyId: string | null,
  slug: string
) {
  try {
    const user = await requireAuth();

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Payment successful, publish the story
      const res = await publishStory(storyId, slug);
      if (res.success) {
        return { success: true };
      } else {
        return { success: false, error: res.error };
      }
    } else {
      return { success: false, error: "Payment verification failed" };
    }
  } catch (error: any) {
    console.error(error);
    return { success: false, error: "Payment verification error" };
  }
}
