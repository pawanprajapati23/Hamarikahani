"use client";

import { useState } from "react";
import { EditorBlock, useEditorStore } from "../store/editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Image as ImageIcon, Video, Music, Type, Quote, SplitSquareHorizontal, UploadCloud, Copy, GripVertical } from "lucide-react";
import { toast } from "sonner";

export function BlockEditorItem({ block, index }: { block: EditorBlock, index: number }) {
  const { updateBlock, removeBlock, duplicateBlock } = useEditorStore();
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const renderIcon = () => {
    switch (block.type) {
      case "text": return <Type className="w-5 h-5 text-blue-500" aria-hidden="true" />;
      case "image": return <ImageIcon className="w-5 h-5 text-emerald-500" aria-hidden="true" />;
      case "video": return <Video className="w-5 h-5 text-rose-500" aria-hidden="true" />;
      case "music": return <Music className="w-5 h-5 text-purple-500" aria-hidden="true" />;
      case "quote": return <Quote className="w-5 h-5 text-amber-500" aria-hidden="true" />;
      case "spacer": return <SplitSquareHorizontal className="w-5 h-5 text-slate-500" aria-hidden="true" />;
    }
  };

  const handleCloudinaryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    toast.info("Uploading to Cloudinary...");
    setTimeout(() => {
      const url = URL.createObjectURL(file);
      updateBlock(block.id, url);
      toast.success("Media uploaded securely!");
    }, 1500);
  };

  const handleDelete = () => {
    if (isConfirmingDelete) {
      removeBlock(block.id);
    } else {
      setIsConfirmingDelete(true);
      setTimeout(() => setIsConfirmingDelete(false), 3000); // Reset confirmation after 3s
    }
  };

  return (
    <div className="group relative bg-card border border-foreground/10 rounded-2xl p-4 sm:p-6 text-left shadow-sm hover:shadow-lg hover:border-primary/30 transition-all focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20">
      
      {/* Block Header with Actions */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-foreground/5">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground/5 cursor-grab active:cursor-grabbing text-foreground/50 hover:bg-primary/10 hover:text-primary transition-colors">
            <GripVertical className="w-5 h-5" aria-label="Drag to reorder" />
          </span>
          <span className="text-xs sm:text-sm uppercase tracking-widest font-bold text-foreground">
            {block.type} Block
          </span>
        </div>
        
        <div className="flex items-center gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => duplicateBlock(block.id)}
            className="text-muted-foreground hover:text-primary hover:bg-primary/10"
            aria-label={`Duplicate ${block.type} block`}
          >
            <Copy className="w-4 h-4" aria-hidden="true" />
          </Button>
          
          <Button 
            variant={isConfirmingDelete ? "destructive" : "ghost"} 
            size={isConfirmingDelete ? "sm" : "icon"}
            onClick={handleDelete}
            className={`text-muted-foreground transition-all ${isConfirmingDelete ? "text-white" : "hover:text-error hover:bg-error/10"}`}
            aria-label={`Delete ${block.type} block`}
          >
            {isConfirmingDelete ? "Sure?" : <Trash2 className="w-4 h-4" aria-hidden="true" />}
          </Button>
        </div>
      </div>

      {/* Block Content Editor UI */}
      <div className="space-y-4 cursor-text" onPointerDown={(e) => e.stopPropagation()}>
        {/* We stop pointer propagation on inputs so dragging the card body doesn't trigger drag while typing */}
        
        {block.type === "text" && (
          <textarea
            className="w-full bg-background border border-foreground/10 rounded-xl p-4 min-h-[140px] focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
            placeholder="Write your heartfelt message here..."
            value={block.content}
            onChange={(e) => updateBlock(block.id, e.target.value)}
          />
        )}

        {block.type === "quote" && (
          <div className="space-y-4">
            <textarea
              className="w-full bg-background border border-foreground/10 rounded-xl p-6 min-h-[120px] text-lg sm:text-xl font-playfair italic focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
              placeholder='"Love is composed of a single soul inhabiting two bodies."'
              value={block.content}
              onChange={(e) => updateBlock(block.id, e.target.value)}
            />
            <Input 
              placeholder="Author (e.g. Aristotle)"
              value={block.metadata?.author || ""}
              onChange={(e) => updateBlock(block.id, block.content, { ...block.metadata, author: e.target.value })}
            />
          </div>
        )}

        {(block.type === "image" || block.type === "video") && (
          <div>
            {block.content ? (
              <div className="relative rounded-xl overflow-hidden border border-foreground/10 bg-foreground/5">
                {block.type === "image" ? (
                  <img src={block.content} alt="User upload preview" className="w-full h-auto max-h-[400px] object-cover" />
                ) : (
                  <video src={block.content} controls className="w-full max-h-[400px] object-cover bg-black" />
                )}
                <div className="absolute top-3 right-3">
                  <Button variant="secondary" size="sm" onClick={() => updateBlock(block.id, "")} className="shadow-lg">
                    Replace
                  </Button>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-foreground/20 rounded-xl cursor-pointer hover:bg-foreground/5 hover:border-primary/50 transition-colors focus-within:ring-2 focus-within:ring-primary">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="w-10 h-10 text-muted-foreground mb-3" aria-hidden="true" />
                  <p className="text-sm text-foreground font-medium mb-1">Click to upload via Cloudinary</p>
                  <p className="text-xs text-muted-foreground uppercase">{block.type === "image" ? "SVG, PNG, JPG or GIF (MAX. 5MB)" : "MP4, WEBM (MAX. 50MB)"}</p>
                </div>
                <input type="file" className="sr-only" accept={block.type === "image" ? "image/*" : "video/*"} onChange={handleCloudinaryUpload} aria-label={`Upload ${block.type}`} />
              </label>
            )}
          </div>
        )}

        {block.type === "music" && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Set the emotional tone. Paste a YouTube or Spotify URL.</p>
            <Input 
              placeholder="e.g. https://open.spotify.com/track/..."
              value={block.content}
              onChange={(e) => updateBlock(block.id, e.target.value)}
            />
          </div>
        )}

        {block.type === "spacer" && (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground">Spacing Height:</span>
            <select
              className="bg-background border border-foreground/10 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
              value={block.metadata?.height || "medium"}
              onChange={(e) => updateBlock(block.id, block.content, { height: e.target.value })}
              aria-label="Select spacer height"
            >
              <option value="small">Small (32px)</option>
              <option value="medium">Medium (64px)</option>
              <option value="large">Large (128px)</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
