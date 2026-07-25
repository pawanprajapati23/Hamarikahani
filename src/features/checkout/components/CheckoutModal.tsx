"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2, ShieldCheck, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEditorStore } from "@/features/editor/store/editor";
import { publishStory } from "@/features/editor/api/actions";
import { PRICING } from "@/config/pricing";

export function CheckoutModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [step, setStep] = useState<"SLUG" | "PAYMENT" | "SUCCESS">("SLUG");
  const [slug, setSlug] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const { storyId } = useEditorStore();

  const handleSlugCheck = async () => {
    if (!slug) return toast.error("Please enter a custom link name.");
    setIsProcessing(true);
    // Mock API delay for slug availability check
    setTimeout(() => {
      setIsProcessing(false);
      setStep("PAYMENT");
    }, 1000);
  };

  const handleRazorpayCheckout = async () => {
    setIsProcessing(true);
    
    try {
      const { createOrder, verifyPayment } = await import("../api/actions");
      const orderRes = await createOrder(); // Amount pulls from config

      
      if (!orderRes.success || !orderRes.orderId) {
        toast.error(orderRes.error || "Failed to create order");
        setIsProcessing(false);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        const options = {
          key: orderRes.keyId,
          amount: orderRes.amount,
          currency: "INR",
          name: "HamariKahani",
          description: "Premium Story Access",
          order_id: orderRes.orderId,
          handler: async function (response: any) {
            setIsProcessing(true);
            const verifyRes = await verifyPayment(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature,
              storyId,
              slug
            );
            if (verifyRes.success) {
              setStep("SUCCESS");
              toast.success("Payment verified! Story Published.");
            } else {
              toast.error(verifyRes.error || "Verification failed");
            }
            setIsProcessing(false);
          },
          prefill: {
            name: "Premium User",
            email: "user@example.com"
          },
          theme: {
            color: "#3b82f6" // blue-500
          }
        };
        
        const rzp = new (window as any).Razorpay(options);
        rzp.on('payment.failed', function (response: any){
          toast.error("Payment failed. Please try again.");
        });
        rzp.open();
        setIsProcessing(false);
      };
      
      script.onerror = () => {
        toast.error("Failed to load Razorpay SDK. Check your internet connection.");
        setIsProcessing(false);
      };
      
      document.body.appendChild(script);
    } catch (error) {
      toast.error("Something went wrong");
      setIsProcessing(false);
    }
  };

  const handleViewStory = () => {
    onClose();
    router.push(`/s/${slug}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-card border-foreground/10 rounded-[2rem]">
        {/* Decorative Header */}
        <div className="bg-primary/5 p-8 text-center border-b border-foreground/5 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
          <DialogHeader>
            <DialogTitle className="text-2xl font-playfair font-bold text-foreground">
              {step === "SLUG" && "Claim Your Link"}
              {step === "PAYMENT" && "Secure Checkout"}
              {step === "SUCCESS" && "Story Published!"}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mt-2">
              {step === "SLUG" && "Choose a unique, permanent URL for your story."}
              {step === "PAYMENT" && "One-time payment for lifetime hosting. No subscriptions."}
              {step === "SUCCESS" && "Your digital surprise is live and ready to be shared."}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-8">
          {step === "SLUG" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Custom Story URL</label>
                <div className="flex items-center rounded-xl border border-foreground/20 bg-background overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all">
                  <span className="pl-4 text-muted-foreground bg-background whitespace-nowrap text-sm">
                    hamarikahani.in/s/
                  </span>
                  <Input 
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    placeholder="sarah-25th"
                    className="border-0 bg-transparent focus-visible:ring-0 px-2 py-6 text-foreground font-medium"
                  />
                </div>
                <p className="text-xs text-muted-foreground">Only lowercase letters, numbers, and hyphens.</p>
              </div>
              <Button className="w-full rounded-xl h-12 text-base font-semibold" onClick={handleSlugCheck} disabled={isProcessing}>
                {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify Availability"}
              </Button>
            </div>
          )}

          {step === "PAYMENT" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-background border border-foreground/10 rounded-xl">
                <div>
                  <h4 className="font-semibold text-foreground">Lifetime Hosting</h4>
                  <p className="text-sm text-muted-foreground">Premium Story Access</p>
                </div>
                <div className="text-xl font-bold text-foreground">₹{PRICING.STORY_PUBLISH_DISPLAY_INR}</div>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                256-bit encrypted secure checkout via Razorpay
              </div>

              <Button className="w-full rounded-xl h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/20" onClick={handleRazorpayCheckout} disabled={isProcessing}>
                {isProcessing ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" /> Pay ₹{PRICING.STORY_PUBLISH_DISPLAY_INR} & Publish
                  </>
                )}
              </Button>
            </div>
          )}

          {step === "SUCCESS" && (
            <div className="text-center space-y-6 py-4">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Your story is live at:</p>
                <a href={`/s/${slug}`} className="font-medium text-primary hover:underline text-lg">
                  hamarikahani.in/s/{slug}
                </a>
              </div>
              <Button className="w-full rounded-xl h-12 text-base font-semibold" onClick={handleViewStory}>
                View Live Story
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
