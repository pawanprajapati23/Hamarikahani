"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, ArrowLeft, KeyRound, Lock } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requestPasswordReset, verifyPasswordResetOTP } from "../api/actions";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const resetSchema = z.object({
  otp: z.string().min(6, "Code must be at least 6 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function ForgotPasswordForm() {
  const [step, setStep] = useState<"EMAIL" | "OTP">("EMAIL");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const resetForm = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: { otp: "", password: "" },
  });

  const onEmailSubmit = async (data: z.infer<typeof emailSchema>) => {
    const res = await requestPasswordReset(data.email);
    if (res?.error) {
      toast.error(res.error);
    } else {
      setEmail(data.email);
      setStep("OTP");
      toast.success("Security code sent to your email.");
    }
  };

  const onResetSubmit = async (data: z.infer<typeof resetSchema>) => {
    const res = await verifyPasswordResetOTP(email, data.otp, data.password);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Password reset successfully! Please login with your new password.");
      router.push("/auth/login");
    }
  };

  if (step === "OTP") {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-4">
          <button 
            type="button"
            onClick={() => setStep("EMAIL")}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Change email
          </button>
          <div className="space-y-2">
            <h2 className="text-3xl font-playfair font-bold text-foreground tracking-tight">Enter Code</h2>
            <p className="text-muted-foreground text-sm">We sent a 6-digit code to <span className="font-medium text-foreground">{email}</span></p>
          </div>
        </div>

        <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="otp">6-Digit Code</Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                id="otp" 
                type="text" 
                placeholder="000000" 
                className="pl-9"
                disabled={resetForm.formState.isSubmitting}
                {...resetForm.register("otp")}
              />
            </div>
            {resetForm.formState.errors.otp && (
              <p className="text-xs text-error font-medium" role="alert">{resetForm.formState.errors.otp.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                className="pl-9"
                disabled={resetForm.formState.isSubmitting}
                {...resetForm.register("password")}
              />
            </div>
            {resetForm.formState.errors.password && (
              <p className="text-xs text-error font-medium" role="alert">{resetForm.formState.errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full font-semibold" disabled={resetForm.formState.isSubmitting}>
            {resetForm.formState.isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
            Reset Password
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <Link href="/auth/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to login
        </Link>
        <div className="space-y-2">
          <h2 className="text-3xl font-playfair font-bold text-foreground tracking-tight">Reset password</h2>
          <p className="text-muted-foreground text-sm">Enter your email and we'll send you a code to reset your password.</p>
        </div>
      </div>

      <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="you@example.com" 
            disabled={emailForm.formState.isSubmitting}
            aria-invalid={!!emailForm.formState.errors.email}
            {...emailForm.register("email")}
          />
          {emailForm.formState.errors.email && (
            <p className="text-xs text-error font-medium" role="alert">{emailForm.formState.errors.email.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full font-semibold" disabled={emailForm.formState.isSubmitting}>
          {emailForm.formState.isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
          Send Reset Code
        </Button>
      </form>
    </div>
  );
}
