"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { EmailService } from "../services/email.service";

const getSiteUrl = () => process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function signInWithEmail(email: string, redirectTo: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${getSiteUrl()}/auth/callback?redirect_to=${redirectTo}`,
    },
  });

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function signUpWithEmail(email: string, password: string, fullName: string) {
  const supabase = await createClient();
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${getSiteUrl()}/auth/callback?redirect_to=/dashboard`,
    },
  });

  if (error) return { success: false, error: error.message };
  
  // Trigger transactional welcome email in the background
  if (data.user) {
    EmailService.sendWelcomeEmail(email, fullName).catch(console.error);
  }

  return { success: true };
}

export async function signInWithGoogle(redirectTo: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${getSiteUrl()}/auth/callback?redirect_to=${redirectTo}`,
      queryParams: { access_type: 'offline', prompt: 'consent' }
    },
  });

  if (error) throw new Error(error.message);
  if (data.url) redirect(data.url);
}

export async function requestPasswordReset(email: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getSiteUrl()}/auth/update-password`,
  });

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function updatePassword(password: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
