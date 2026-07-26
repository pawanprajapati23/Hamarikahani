"use client";

import { useState } from "react";
import { Music, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackgroundMusic({ url }: { url: string }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!url) return null;

  // Simple parser to embed Spotify or YouTube
  const getEmbedUrl = (url: string) => {
    if (url.includes("spotify.com/track")) {
      const trackId = url.split("track/")[1]?.split("?")[0];
      if (trackId) return `https://open.spotify.com/embed/track/${trackId}?utm_source=generator`;
    }
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.includes("v=") ? url.split("v=")[1]?.split("&")[0] : url.split("youtu.be/")[1]?.split("?")[0];
      if (videoId) return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    return null;
  };

  const embedUrl = getEmbedUrl(url);

  if (!embedUrl) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <a href={url} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-background/80 backdrop-blur-md px-4 py-2 rounded-full border border-border shadow-lg text-sm font-medium hover:bg-background transition-colors">
          <Music className="w-4 h-4 text-primary" /> Play Dedicated Track
        </a>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {!isOpen ? (
        <Button 
          variant="outline" 
          className="rounded-full bg-background/80 backdrop-blur-md shadow-lg border-border gap-2"
          onClick={() => setIsOpen(true)}
        >
          <Music className="w-4 h-4 text-primary" /> Play Dedicated Track
        </Button>
      ) : (
        <div className="bg-background rounded-2xl p-2 shadow-2xl border border-border/50 relative max-w-sm animate-in fade-in slide-in-from-bottom-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute -top-3 -right-3 rounded-full bg-background border border-border shadow-sm h-6 w-6 z-10 hover:bg-secondary"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-3 h-3" />
          </Button>
          <div className="overflow-hidden rounded-xl bg-muted">
            <iframe 
              src={embedUrl} 
              width="300" 
              height={url.includes("spotify") ? "80" : "150"} 
              frameBorder="0" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
