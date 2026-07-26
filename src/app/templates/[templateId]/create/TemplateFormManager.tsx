"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Link as LinkIcon, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { PublicStoryRenderer } from "@/features/story/components/PublicStoryRenderer";
import { CheckoutModal } from "@/features/checkout/components/CheckoutModal";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

import { BirthdayForm } from "@/features/editor/components/forms/BirthdayForm";
import { ValentineForm } from "@/features/editor/components/forms/ValentineForm";
import { AnniversaryForm } from "@/features/editor/components/forms/AnniversaryForm";
import { SorryForm } from "@/features/editor/components/forms/SorryForm";
import { MissYouForm } from "@/features/editor/components/forms/MissYouForm";

// Mocks for now until we build the real forms
import { MOCK_TEMPLATE_BLOCKS } from "@/config/mock-blocks";

export function TemplateFormManager({ templateId, templateConfig, userId }: { templateId: string, templateConfig: any, userId: string }) {
  const [step, setStep] = useState<"FORM" | "URL" | "CHECKOUT">("FORM");
  
  // State for the template data
  const [formData, setFormData] = useState(MOCK_TEMPLATE_BLOCKS[templateId]?.metadata || {});
  
  // State for Custom URL
  const [customSlug, setCustomSlug] = useState("");
  const [slugStatus, setSlugStatus] = useState<"IDLE" | "CHECKING" | "AVAILABLE" | "TAKEN">("IDLE");
  
  // State for Checkout
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [storyId, setStoryId] = useState<string | null>(null);

  // Derive the block for live preview
  const previewBlock = {
    id: `live-${templateId}`,
    type: `${templateId}_template`,
    content: "",
    metadata: formData
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "");
    setCustomSlug(val);
    setSlugStatus("IDLE");
  };

  const checkSlugAvailability = async () => {
    if (!customSlug || customSlug.length < 3) {
      toast.error("URL must be at least 3 characters");
      return;
    }
    setSlugStatus("CHECKING");
    
    // Check in DB
    const supabase = createClient();
    const { data, error } = await supabase
      .from("stories")
      .select("id")
      .eq("slug", customSlug)
      .single();
      
    if (data) {
      setSlugStatus("TAKEN");
    } else {
      setSlugStatus("AVAILABLE");
    }
  };

  const handleContinueToCheckout = async () => {
    if (slugStatus !== "AVAILABLE") {
      toast.error("Please choose an available URL first");
      return;
    }

    try {
      // 1. Create a Draft Story in DB
      const supabase = createClient();
      const { data: story, error } = await supabase
        .from("stories")
        .insert({
          user_id: userId,
          title: templateConfig.name,
          slug: customSlug,
          category: templateConfig.category,
          theme_id: "theme-light",
          content: [previewBlock],
          status: "DRAFT"
        })
        .select()
        .single();

      if (error) throw error;

      setStoryId(story.id);
      setIsCheckoutOpen(true);
    } catch (e: any) {
      toast.error(e.message || "Failed to create draft");
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Topbar */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-border/40 bg-background/80 backdrop-blur-xl z-20">
        <Button variant="ghost" size="icon" className="rounded-full" asChild>
          <Link href="/"><ArrowLeft className="w-5 h-5" /></Link>
        </Button>
        <div className="font-semibold text-sm">
          {step === "FORM" ? "Customize Template" : step === "URL" ? "Claim Custom Link" : "Checkout"}
        </div>
        <div>
          {step === "FORM" && (
            <Button onClick={() => setStep("URL")} className="rounded-full gap-2">
              Next Step <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel: Steps */}
        <div className="w-full lg:w-1/3 bg-card border-r border-border/50 p-6 sm:p-8 overflow-y-auto">
          
          {step === "FORM" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-playfair font-bold">Edit Details</h2>
              
              <div className="space-y-4">
                {templateId === "birthday" && (
                  <BirthdayForm formData={formData} onChange={setFormData} />
                )}
                {templateId === "valentine" && (
                  <ValentineForm formData={formData} onChange={setFormData} />
                )}
                {templateId === "anniversary" && (
                  <AnniversaryForm formData={formData} onChange={setFormData} />
                )}
                {templateId === "sorry" && (
                  <SorryForm formData={formData} onChange={setFormData} />
                )}
                {templateId === "miss_you" && (
                  <MissYouForm formData={formData} onChange={setFormData} />
                )}
                {templateId !== "birthday" && templateId !== "valentine" && templateId !== "anniversary" && templateId !== "sorry" && templateId !== "miss_you" && (
                  <div className="p-8 text-center bg-foreground/5 rounded-2xl border border-foreground/10 border-dashed">
                    <p className="text-muted-foreground font-medium">Coming soon! This template is currently in development.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === "URL" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-playfair font-bold">Claim Your Link</h2>
                <p className="text-sm text-muted-foreground">Choose a unique URL to share with your loved one.</p>
              </div>

              <div className="space-y-4">
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-muted-foreground text-sm font-medium">hamarikahani.in/s/</span>
                  <Input 
                    value={customSlug}
                    onChange={handleSlugChange}
                    placeholder="my-love"
                    className="pl-[140px] h-12 text-lg font-medium"
                  />
                </div>
                
                <div className="flex justify-between items-center">
                  <Button variant="secondary" onClick={checkSlugAvailability} disabled={slugStatus === "CHECKING" || customSlug.length < 3}>
                    {slugStatus === "CHECKING" ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Check Availability"}
                  </Button>
                  
                  {slugStatus === "AVAILABLE" && <span className="flex items-center text-emerald-500 text-sm font-bold"><CheckCircle2 className="w-4 h-4 mr-1" /> Available!</span>}
                  {slugStatus === "TAKEN" && <span className="flex items-center text-rose-500 text-sm font-bold"><XCircle className="w-4 h-4 mr-1" /> Taken</span>}
                </div>
              </div>

              <div className="pt-8 border-t border-border/50">
                <Button 
                  onClick={handleContinueToCheckout} 
                  className="w-full h-12 text-lg rounded-full"
                  disabled={slugStatus !== "AVAILABLE"}
                >
                  Pay ₹1 & Publish
                </Button>
              </div>
            </div>
          )}

        </div>

        {/* Right Panel: Live Preview */}
        <div className="hidden lg:flex w-2/3 items-center justify-center bg-foreground/5 p-12">
          <div className="w-full max-w-[400px] h-[800px] max-h-[85vh] bg-background rounded-[3rem] shadow-2xl border-[8px] border-foreground/10 overflow-hidden relative">
            <PublicStoryRenderer blocks={[previewBlock]} themeId="theme-light" />
          </div>
        </div>
      </div>

      {isCheckoutOpen && storyId && (
        <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} storyId={storyId} customSlug={customSlug} />
      )}
    </div>
  );
}
