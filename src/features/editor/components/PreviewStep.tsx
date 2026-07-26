"use client";

import { useEditorStore } from "../store/editor";
import { PublicStoryRenderer } from "../../story/components/PublicStoryRenderer";

export function PreviewStep() {
  const { title, blocks, themeId } = useEditorStore();
  
  return (
    <div className="w-full max-w-[400px] sm:max-w-[500px] mx-auto min-h-[85vh] h-[800px] shadow-2xl rounded-[3rem] overflow-hidden border-[8px] border-foreground/10 animate-in fade-in slide-in-from-bottom-8 relative bg-background">
      <div className="absolute inset-0 overflow-y-auto no-scrollbar">
        <PublicStoryRenderer 
          title={title || "Untitled Story"} 
          blocks={blocks} 
          themeId={themeId} 
          slug="preview-mode" 
        />
      </div>
    </div>
  );
}
