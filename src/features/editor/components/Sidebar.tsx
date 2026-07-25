"use client";

import { useEditorStore, BlockType } from "../store/editor";
import { Button } from "@/components/ui/button";
import { Type, Image as ImageIcon, Quote, Video, Music, SplitSquareHorizontal } from "lucide-react";

export function EditorSidebar() {
  const { addBlock } = useEditorStore();

  const handleAdd = (type: BlockType) => {
    addBlock({
      id: crypto.randomUUID(),
      type,
      content: "",
      metadata: type === "spacer" ? { height: "medium" } : {}
    });
  };

  return (
    <div className="p-6 flex flex-col h-full bg-transparent">
      <div className="mb-8">
        <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Story Blocks</h3>
        <p className="text-xs text-muted-foreground/60 mt-1">Click to add elements to your canvas.</p>
      </div>
      
      <div className="space-y-3">
        <Button variant="outline" className="w-full justify-start h-12 bg-card border-border/40 hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all rounded-xl shadow-sm hover:shadow-md" onClick={() => handleAdd("text")}>
          <Type className="w-4 h-4 mr-3" /> Text Block
        </Button>
        <Button variant="outline" className="w-full justify-start h-12 bg-card border-border/40 hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all rounded-xl shadow-sm hover:shadow-md" onClick={() => handleAdd("image")}>
          <ImageIcon className="w-4 h-4 mr-3" /> Image Upload
        </Button>
        <Button variant="outline" className="w-full justify-start h-12 bg-card border-border/40 hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all rounded-xl shadow-sm hover:shadow-md" onClick={() => handleAdd("video")}>
          <Video className="w-4 h-4 mr-3" /> Video Clip
        </Button>
        <Button variant="outline" className="w-full justify-start h-12 bg-card border-border/40 hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all rounded-xl shadow-sm hover:shadow-md" onClick={() => handleAdd("music")}>
          <Music className="w-4 h-4 mr-3" /> Background Music
        </Button>
        <Button variant="outline" className="w-full justify-start h-12 bg-card border-border/40 hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all rounded-xl shadow-sm hover:shadow-md" onClick={() => handleAdd("quote")}>
          <Quote className="w-4 h-4 mr-3" /> Emotional Quote
        </Button>
        <Button variant="outline" className="w-full justify-start h-12 bg-card border-border/40 hover:border-primary/50 hover:bg-primary/5 hover:text-primary transition-all rounded-xl shadow-sm hover:shadow-md" onClick={() => handleAdd("spacer")}>
          <SplitSquareHorizontal className="w-4 h-4 mr-3" /> Spacer / Divider
        </Button>
      </div>
    </div>
  );
}
