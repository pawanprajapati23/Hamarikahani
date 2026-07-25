"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const signupSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignupValues = z.infer<typeof signupSchema>;

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: "", email: "", password: "" },
  });

  const onSubmit = async (data: SignupValues) => {
    try {
      const { signUpWithEmail } = await import("../api/actions");
      const res = await signUpWithEmail(data.email, data.password, data.fullName);
      
      if (res.error) {
        toast.error(res.error);
        return;
      }
      
      if (res.requiresEmailConfirmation) {
        toast.success("Account created! Please check your email to verify.");
      } else {
        toast.success("Account created successfully!");
        window.location.href = "/dashboard";
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to create account");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 text-center lg:text-left">
        <h2 className="text-3xl font-playfair font-bold text-foreground tracking-tight">Create account</h2>
        <p className="text-muted-foreground text-sm">Join HamariKahani to craft unforgettable moments.</p>
      </div>

      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 bg-foreground text-background py-3.5 rounded-full font-medium transition-transform active:scale-[0.98]"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Sign up with Google
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-foreground/10" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input 
              id="fullName" 
              placeholder="John Doe" 
              autoComplete="name"
              disabled={form.formState.isSubmitting}
              aria-invalid={!!form.formState.errors.fullName}
              {...form.register("fullName")}
            />
            {form.formState.errors.fullName && (
              <p className="text-xs text-error font-medium" role="alert">{form.formState.errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="you@example.com" 
              autoComplete="email"
              disabled={form.formState.isSubmitting}
              aria-invalid={!!form.formState.errors.email}
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-xs text-error font-medium" role="alert">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                autoComplete="new-password"
                disabled={form.formState.isSubmitting}
                aria-invalid={!!form.formState.errors.password}
                {...form.register("password")}
                className="pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {form.formState.errors.password && (
              <p className="text-xs text-error font-medium" role="alert">{form.formState.errors.password.message}</p>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full font-semibold" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
          ) : null}
          Create Account
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-foreground font-semibold hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}
