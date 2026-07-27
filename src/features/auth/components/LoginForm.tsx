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

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm({ nextUrl }: { nextUrl?: string }) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginValues) => {
    try {
      const { signInWithEmail } = await import("../api/actions");
      const targetUrl = nextUrl || "/dashboard";
      const res = await signInWithEmail(data.email, data.password, targetUrl);
      
      if (res.error) {
        toast.error(res.error);
        return;
      }
      
      toast.success("Successfully logged in!");
      window.location.href = targetUrl;
    } catch (error: any) {
      toast.error(error.message || "Invalid email or password");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-pink-100/30 shadow-[0_8px_30px_rgba(236,72,153,0.08)]">
      <div className="space-y-2 text-center lg:text-left">
        <h2 className="text-3xl font-playfair font-bold text-slate-900 tracking-tight">Welcome back</h2>
        <p className="text-slate-600 text-sm">Enter your credentials to continue your story.</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700">Email address</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="you@example.com" 
              autoComplete="email"
              disabled={form.formState.isSubmitting}
              aria-invalid={!!form.formState.errors.email}
              {...form.register("email")}
              className="border-pink-100 focus-visible:ring-pink-500"
            />
            {form.formState.errors.email && (
              <p className="text-xs text-pink-600 font-medium" role="alert">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-slate-700">Password</Label>
              <Link href="/auth/forgot-password" className="text-xs text-pink-600 hover:text-pink-700 transition-colors font-medium" tabIndex={-1}>
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                autoComplete="current-password"
                disabled={form.formState.isSubmitting}
                aria-invalid={!!form.formState.errors.password}
                {...form.register("password")}
                className="pr-12 border-pink-100 focus-visible:ring-pink-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-pink-600 transition-colors p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {form.formState.errors.password && (
              <p className="text-xs text-pink-600 font-medium" role="alert">{form.formState.errors.password.message}</p>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full font-semibold rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.97] transition-all" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
          ) : null}
          Sign In
        </Button>
      </form>

      <p className="text-center text-sm text-slate-600">
        Don't have an account?{" "}
        <Link href="/auth/signup" className="text-pink-600 font-semibold hover:text-pink-700 transition-colors">
          Create one
        </Link>
      </p>
    </div>
  );
}
