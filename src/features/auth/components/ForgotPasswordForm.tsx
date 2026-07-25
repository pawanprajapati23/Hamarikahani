"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requestPasswordReset } from "../api/actions";

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export function ForgotPasswordForm() {
  const [isSent, setIsSent] = useState(false);
  const form = useForm<z.infer<typeof forgotSchema>>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: z.infer<typeof forgotSchema>) => {
    const res = await requestPasswordReset(data.email);
    if (res?.error) {
      toast.error(res.error);
    } else {
      setIsSent(true);
      toast.success("Reset link sent!");
    }
  };

  if (isSent) {
    return (
      <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="text-3xl font-playfair font-bold text-foreground">Check your inbox</h2>
        <p className="text-muted-foreground">
          We sent a password reset link to <span className="font-medium text-foreground">{form.getValues().email}</span>.
        </p>
        <Button onClick={() => setIsSent(false)} variant="outline" className="w-full mt-4">
          Try another email
        </Button>
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
          <p className="text-muted-foreground text-sm">Enter your email and we'll send you a link to reset your password.</p>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="you@example.com" 
            disabled={form.formState.isSubmitting}
            aria-invalid={!!form.formState.errors.email}
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="text-xs text-error font-medium" role="alert">{form.formState.errors.email.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full font-semibold" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
          Send Reset Link
        </Button>
      </form>
    </div>
  );
}
