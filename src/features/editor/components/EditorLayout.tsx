"use client";

import { ReactNode, useState, useEffect } from "react";
import { useEditorStore } from "../store/editor";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, Loader2, LayoutPanelLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { saveStoryDraft } from "../api/actions";

export function EditorLayout({ children, sidebar }: { children: ReactNode, sidebar?: ReactNode }) {
  const { 
    step, setStep, category, themeId, title, blocks, storyId, setStoryId,
    hasUnsavedChanges, setHasUnsavedChanges, lastSavedAt, setLastSavedAt
  } = useEditorStore();
  
  const [isSaving, setIsSaving] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Core Auto-Save Engine
  useEffect(() => {
    // Only auto-save if we have unsaved changes and the foundational data (category, title) exists
    if (!hasUnsavedChanges || !category || !title) return;

    const autoSaveTimer = setTimeout(async () => {
      try {
        setIsSaving(true);
        const res = await saveStoryDraft({
          storyId,
          category,
          themeId: themeId || "00000000-0000-0000-0000-000000000000",
          title,
          blocks,
        });
        if (res.id && !storyId) setStoryId(res.id);
        
        setHasUnsavedChanges(false);
        setLastSavedAt(Date.now());
      } catch (e) {
        console.error("Auto-save failed", e);
      } finally {
        setIsSaving(false);
      }
    }, 2500); // Wait 2.5 seconds after user stops typing to trigger DB save

    return () => clearTimeout(autoSaveTimer);
  }, [hasUnsavedChanges, category, themeId, title, blocks, storyId, setHasUnsavedChanges, setLastSavedAt, setStoryId]);

  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(interval);
  }, []);

  const formatSaveTime = (time: number | null) => {
    if (!time) return "";
    const diff = Math.floor((now - time) / 1000);
    if (diff < 60) return "Saved just now";
    return `Saved ${Math.floor(diff / 60)}m ago`;
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-secondary/20">
      {/* Universal Topbar */}
      <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-border/40 bg-background/80 backdrop-blur-xl z-20">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <Link href="/dashboard"><ArrowLeft className="w-5 h-5" /></Link>
          </Button>
          <span className="font-semibold text-sm hidden sm:inline-block">
            {step === "SETUP" ? "Story Setup" : step === "CONTENT" ? "Canvas Editor" : "Live Preview Mode"}
          </span>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4">
          {step === "CONTENT" && (
            <Button variant="outline" size="icon" className="lg:hidden rounded-full" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <LayoutPanelLeft className="w-5 h-5" />
            </Button>
          )}
          
          <div className="hidden sm:flex items-center text-xs text-muted-foreground mr-2 font-medium">
            {isSaving ? (
              <span className="flex items-center text-primary"><Loader2 className="w-3 h-3 mr-1.5 animate-spin" /> Saving...</span>
            ) : hasUnsavedChanges ? (
              <span className="flex items-center text-amber-500">Unsaved changes</span>
            ) : lastSavedAt ? (
              <span className="flex items-center text-emerald-500"><CheckCircle2 className="w-3 h-3 mr-1.5" /> {formatSaveTime(lastSavedAt)}</span>
            ) : null}
          </div>
          
          {step === "SETUP" && (
            <Button onClick={() => setStep("CONTENT")} disabled={!category || !themeId || !title} className="rounded-full">
              Continue to Editor
            </Button>
          )}
          {step === "CONTENT" && (
            <Button onClick={() => setStep("PREVIEW")} className="rounded-full">
              Preview Story
            </Button>
          )}
          {step === "PREVIEW" && (
            <Button onClick={() => setStep("CONTENT")} variant="outline" className="rounded-full">
              Back to Editor
            </Button>
          )}
        </div>
      </header>

      {/* Workspace */}
      <div className="flex flex-1 overflow-hidden relative">
        {step === "CONTENT" && sidebar && (
          <aside className={`
            absolute lg:relative z-10 w-72 lg:w-80 h-full bg-secondary/30 border-r border-border/40 flex flex-col transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}>
            {sidebar}
          </aside>
        )}

        <main className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12 relative" onClick={() => setSidebarOpen(false)}>
          {children}
        </main>
      </div>
    </div>
  );
}
