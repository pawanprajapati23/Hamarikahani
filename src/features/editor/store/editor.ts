import { create } from "zustand";
import { persist } from "zustand/middleware";

export type EditorStep = "SETUP" | "CONTENT" | "PREVIEW";
export type BlockType = "text" | "image" | "video" | "music" | "quote" | "spacer" | "valentine_template" | "birthday_template";

export interface EditorBlock {
  id: string;
  type: BlockType;
  content: string;
  metadata?: Record<string, any>;
}

interface EditorState {
  step: EditorStep;
  storyId: string | null;
  category: string;
  themeId: string;
  title: string;
  blocks: EditorBlock[];
  hasUnsavedChanges: boolean;
  lastSavedAt: number | null;
  
  // Actions
  setStep: (step: EditorStep) => void;
  setCategory: (category: string) => void;
  setThemeId: (themeId: string) => void;
  setTitle: (title: string) => void;
  addBlock: (block: EditorBlock) => void;
  updateBlock: (id: string, content: string, metadata?: Record<string, any>) => void;
  removeBlock: (id: string) => void;
  duplicateBlock: (id: string) => void;
  reorderBlocks: (blocks: EditorBlock[]) => void;
  setStoryId: (id: string) => void;
  setHasUnsavedChanges: (val: boolean) => void;
  setLastSavedAt: (time: number) => void;
}

export const useEditorStore = create<EditorState>()(
  persist(
    (set) => ({
      step: "SETUP",
      storyId: null,
      category: "",
      themeId: "",
      title: "",
      blocks: [],
      hasUnsavedChanges: false,
      lastSavedAt: null,

      setStep: (step) => set({ step }),
      setCategory: (category) => set({ category, hasUnsavedChanges: true }),
      setThemeId: (themeId) => set({ themeId, hasUnsavedChanges: true }),
      setTitle: (title) => set({ title, hasUnsavedChanges: true }),
      addBlock: (block) => set((state) => ({ blocks: [...state.blocks, block], hasUnsavedChanges: true })),
      updateBlock: (id, content, metadata) => set((state) => ({
        blocks: state.blocks.map(b => b.id === id ? { ...b, content, metadata: metadata || b.metadata } : b),
        hasUnsavedChanges: true
      })),
      removeBlock: (id) => set((state) => ({
        blocks: state.blocks.filter(b => b.id !== id),
        hasUnsavedChanges: true
      })),
      duplicateBlock: (id) => set((state) => {
        const blockToCopy = state.blocks.find(b => b.id === id);
        if (!blockToCopy) return state;
        const newBlock = { ...blockToCopy, id: crypto.randomUUID() };
        const index = state.blocks.findIndex(b => b.id === id);
        const newBlocks = [...state.blocks];
        newBlocks.splice(index + 1, 0, newBlock);
        return { blocks: newBlocks, hasUnsavedChanges: true };
      }),
      reorderBlocks: (blocks) => set({ blocks, hasUnsavedChanges: true }),
      setStoryId: (id) => set({ storyId: id }),
      setHasUnsavedChanges: (val) => set({ hasUnsavedChanges: val }),
      setLastSavedAt: (time) => set({ lastSavedAt: time }),
    }),
    {
      name: "hamarikahani-editor-draft", // This natively handles Draft Recovery after Refresh instantly
    }
  )
);
