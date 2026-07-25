"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, KeyRound, Mail } from "lucide-react";
import { sendAdminOTP, verifyAdminOTP } from "../api/actions";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"EMAIL" | "OTP">("EMAIL");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    
    try {
      const res = await sendAdminOTP(email);
      if (res.success) {
        toast.success("Security code sent. Check your email.");
        setStep("OTP");
      } else {
        toast.error(res.error);
      }
    } catch (err: any) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || !email) return;
    setLoading(true);
    
    try {
      const res = await verifyAdminOTP(email, otp);
      if (res.success) {
        toast.success("Identity verified. Welcome.");
        router.push("/admin");
      } else {
        toast.error(res.error);
      }
    } catch (err: any) {
      toast.error("Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  if (step === "OTP") {
    return (
      <form onSubmit={handleVerifyOTP} className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Secure OTP Code</label>
          <div className="relative">
            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              type="text" 
              placeholder="Enter 6-digit code" 
              className="pl-10 h-12"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              disabled={loading}
              autoFocus
            />
          </div>
          <p className="text-xs text-muted-foreground text-center pt-2">
            Code sent to {email}. <button type="button" className="text-primary hover:underline" onClick={() => setStep("EMAIL")}>Change</button>
          </p>
        </div>
        <Button type="submit" className="w-full h-12 font-semibold bg-primary" disabled={loading || otp.length < 6}>
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify Identity"}
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSendOTP} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Authorized Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input 
            type="email" 
            placeholder="admin@example.com" 
            className="pl-10 h-12"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
      </div>
      <Button type="submit" className="w-full h-12 font-semibold bg-foreground text-background hover:bg-foreground/90" disabled={loading || !email}>
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Request Secure Access"}
      </Button>
    </form>
  );
}
