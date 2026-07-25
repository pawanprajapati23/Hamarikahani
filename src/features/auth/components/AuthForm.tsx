"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { signInWithEmail, signInWithGoogle } from "../api/actions";
import { cn } from "@/utils/cn";
import { Loader2, Mail } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const emailSchema = z.string().email("Please enter a valid email address");

export function AuthForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect_to") || "/dashboard";

  const [email, setEmail] = useState("");
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [emailError, setEmailError] = useState("");

  const handleGoogleLogin = async () => {
    setIsLoadingGoogle(true);
    try {
      await signInWithGoogle(redirectTo);
    } catch (error) {
      toast.error("Failed to initialize Google login.");
      setIsLoadingGoogle(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setEmailError(parsed.error.errors[0].message);
      return;
    }

    setIsLoadingEmail(true);
    const res = await signInWithEmail(email, redirectTo);
    
    if (res?.error) {
      toast.error(res.error);
    } else {
      setIsEmailSent(true);
      toast.success("Magic link sent to your email!");
    }
    setIsLoadingEmail(false);
  };

  if (isEmailSent) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 text-center p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
          <Mail className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-playfair font-bold text-foreground">Check your inbox</h3>
        <p className="text-muted-foreground">
          We've sent a magic link to <span className="font-medium text-foreground">{email}</span>.
        </p>
        <button 
          onClick={() => setIsEmailSent(false)}
          className="text-sm text-primary hover:underline mt-4"
        >
          Try another email
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-playfair font-bold text-foreground">Welcome</h2>
        <p className="text-muted-foreground text-sm">Sign in or create an account to continue.</p>
      </div>

      <button
        onClick={handleGoogleLogin}
        disabled={isLoadingGoogle || isLoadingEmail}
        className="w-full flex items-center justify-center gap-3 bg-foreground text-background py-3.5 rounded-full font-medium transition-transform active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
      >
        {isLoadingGoogle ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
        )}
        Continue with Google
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-foreground/10" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      <form onSubmit={handleEmailLogin} className="space-y-4">
        <div className="space-y-2">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoadingEmail || isLoadingGoogle}
            className={cn(
              "w-full px-4 py-3.5 rounded-xl bg-background border transition-all duration-200 outline-none",
              "focus:ring-2 focus:ring-primary/50 focus:border-primary",
              emailError ? "border-error focus:ring-error/50 focus:border-error" : "border-foreground/20"
            )}
            autoComplete="email"
            required
          />
          {emailError && <p className="text-sm text-error px-1">{emailError}</p>}
        </div>
        
        <button
          type="submit"
          disabled={isLoadingEmail || isLoadingGoogle}
          className="w-full flex items-center justify-center bg-primary text-primary-foreground py-3.5 rounded-full font-medium transition-transform active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
        >
          {isLoadingEmail ? <Loader2 className="w-5 h-5 animate-spin" /> : "Continue with Email"}
        </button>
      </form>
    </div>
  );
}
