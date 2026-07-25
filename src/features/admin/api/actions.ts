"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const ADMIN_EMAIL = "pavnkumarprajapati2000@gmail.com";

export async function sendAdminOTP(email: string) {
  if (email !== ADMIN_EMAIL) {
    return { success: false, error: "Access Denied. You are not authorized." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }
  
  return { success: true };
}

export async function verifyAdminOTP(email: string, token: string) {
  if (email !== ADMIN_EMAIL) {
    return { success: false, error: "Access Denied. You are not authorized." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error || !data.user) {
    return { success: false, error: error?.message || "Verification failed." };
  }

  // Double check the email of the authenticated user
  if (data.user.email !== ADMIN_EMAIL) {
    await supabase.auth.signOut();
    return { success: false, error: "Access Denied. You are not authorized." };
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function signOutAdmin() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/admin/login");
}
