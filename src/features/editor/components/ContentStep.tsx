"use client";

import { useEffect, useState } from "react";
import { useEditorStore } from "../store/editor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PublicStoryRenderer } from "../../story/components/PublicStoryRenderer";

export function ContentStep() {
  const { blocks, addBlock, updateBlock, themeId, category } = useEditorStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Auto-initialize template block if empty based on category
    if (blocks.length === 0) {
      if (category === "Birthday") {
        addBlock({
          id: crypto.randomUUID(),
          type: "birthday_template",
          content: "",
          metadata: {
            birthdayName: "My Friend",
            birthdayAge: "",
            customMessage: "Wishing you a lifetime of happiness, joy, and endless surprises! Have a wonderful day!",
            giftGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjUzYzZhMzBiMmQ5MGI2YTkzMzE2YmY2MTI2MzcxYzcxZmE1ZGU3ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26BRv0ThflsHCqDrG/giphy.gif",
            cakeGif: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTNjOWUzNGMwMDRkNWJjZGRiZjZhNDZmNjUyZWEzMmQyMTA1NWFmZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LMB3W50H8y5GOO1hg/giphy.gif",
            cardColor: "bg-fuchsia-600",
          }
        });
      } else {
        // Default to Valentine for "Love" or others
        addBlock({
          id: crypto.randomUUID(),
          type: "valentine_template",
          content: "",
          metadata: {
            partnerName: "My Love",
            questionText: "Will you be my Valentine?",
            yesButtonText: "Yes!",
            noButtonText: "No",
            successMessage: "Yayy! I love you! ❤️",
            gifUrl1: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTV5Nzd5cndxdDFxYm8zYXdxZ2hxdHQyYTV2amc5MTJhMnNhZWxyciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LnjD7MN2RtpEIAtSls/giphy.gif",
            gifUrl2: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z0MmlkNjIzbWNxdjF3aGRyZjNha2l0Z3J4NDV5dDRyZHhtMnhqMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif"
          }
        });
      }
    }
  }, [blocks.length, addBlock, category]);

  if (!mounted || blocks.length === 0) return null;

  const templateBlock = blocks[0];
  const meta = templateBlock.metadata || {};

  const handleUpdate = (field: string, value: string) => {
    updateBlock(templateBlock.id, "", {
      ...meta,
      [field]: value
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full">
      {/* Left: Template Settings Form */}
      <div className="w-full lg:w-1/3 space-y-8 bg-card border border-border/50 rounded-3xl p-6 shadow-md overflow-y-auto">
        <div>
          <h2 className="text-2xl font-playfair font-bold text-foreground">Customize Template</h2>
          <p className="text-sm text-muted-foreground mt-1">Fill in the details to create your interactive page.</p>
        </div>

        {templateBlock.type === "valentine_template" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Partner's Name</Label>
              <Input 
                value={meta.partnerName || ""} 
                onChange={e => handleUpdate("partnerName", e.target.value)} 
                placeholder="e.g. Sarah"
              />
            </div>
            <div className="space-y-2">
              <Label>Main Question</Label>
              <Input 
                value={meta.questionText || ""} 
                onChange={e => handleUpdate("questionText", e.target.value)} 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Yes Button Text</Label>
                <Input 
                  value={meta.yesButtonText || ""} 
                  onChange={e => handleUpdate("yesButtonText", e.target.value)} 
                />
              </div>
              <div className="space-y-2">
                <Label>No Button Text</Label>
                <Input 
                  value={meta.noButtonText || ""} 
                  onChange={e => handleUpdate("noButtonText", e.target.value)} 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Success Message</Label>
              <Input 
                value={meta.successMessage || ""} 
                onChange={e => handleUpdate("successMessage", e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label>Intro GIF URL</Label>
              <Input 
                value={meta.gifUrl1 || ""} 
                onChange={e => handleUpdate("gifUrl1", e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label>Success GIF URL</Label>
              <Input 
                value={meta.gifUrl2 || ""} 
                onChange={e => handleUpdate("gifUrl2", e.target.value)} 
              />
            </div>
          </div>
        )}

        {templateBlock.type === "birthday_template" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Birthday Person's Name</Label>
              <Input 
                value={meta.birthdayName || ""} 
                onChange={e => handleUpdate("birthdayName", e.target.value)} 
                placeholder="e.g. Alex"
              />
            </div>
            <div className="space-y-2">
              <Label>Age (Optional)</Label>
              <Input 
                value={meta.birthdayAge || ""} 
                onChange={e => handleUpdate("birthdayAge", e.target.value)} 
                placeholder="e.g. 21"
              />
            </div>
            <div className="space-y-2">
              <Label>Custom Birthday Message</Label>
              <Textarea 
                value={meta.customMessage || ""} 
                onChange={e => handleUpdate("customMessage", e.target.value)} 
                placeholder="Write your wishes here..."
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label>Theme Color (Tailwind class)</Label>
              <Input 
                value={meta.cardColor || ""} 
                onChange={e => handleUpdate("cardColor", e.target.value)} 
                placeholder="e.g. bg-rose-500, bg-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label>Gift Box GIF URL</Label>
              <Input 
                value={meta.giftGif || ""} 
                onChange={e => handleUpdate("giftGif", e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <Label>Cake/Surprise GIF URL</Label>
              <Input 
                value={meta.cakeGif || ""} 
                onChange={e => handleUpdate("cakeGif", e.target.value)} 
              />
            </div>
          </div>
        )}
      </div>

      {/* Right: Live Preview Mobile Frame */}
      <div className="w-full lg:w-2/3 flex items-center justify-center bg-foreground/5 rounded-3xl border border-border/40 p-4 lg:p-12 overflow-hidden">
        <div className="w-full max-w-[400px] h-[800px] max-h-[85vh] bg-background rounded-[3rem] shadow-2xl border-[8px] border-foreground/10 overflow-hidden relative">
          <PublicStoryRenderer blocks={[templateBlock]} themeId={themeId} />
        </div>
      </div>
    </div>
  );
}
