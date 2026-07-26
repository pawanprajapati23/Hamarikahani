"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy, Share2 } from "lucide-react";
import { toast } from "sonner";

export function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2 rounded-full">
      {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
      Copy Link
    </Button>
  );
}

export function ShareButton({ url, title }: { url: string, title: string }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: "Check out this beautiful surprise I made for you! ❤️",
          url,
        });
      } catch (e) {
        console.error("Error sharing:", e);
      }
    } else {
      toast.error("Sharing is not supported on this device. Please copy the link instead.");
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={handleShare} className="gap-2 rounded-full">
      <Share2 className="w-4 h-4" />
      Share
    </Button>
  );
}
