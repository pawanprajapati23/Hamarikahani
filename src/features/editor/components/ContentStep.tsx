"use client";

import { useEditorStore } from "../store/editor";
import { BlockEditorItem } from "./BlockEditorItem";
import { Reorder, AnimatePresence, motion } from "framer-motion";

export function ContentStep() {
  const { blocks, reorderBlocks } = useEditorStore();

  return (
    <div className="max-w-3xl mx-auto min-h-[60vh] h-full flex flex-col items-center rounded-3xl p-2 sm:p-6 text-center">
      {blocks.length === 0 ? (
        <div className="space-y-4 max-w-sm border-2 border-dashed border-foreground/10 rounded-3xl p-12 bg-card animate-in fade-in zoom-in-95 my-auto">
          <h3 className="text-2xl font-playfair font-bold text-foreground">Your canvas is empty</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Select a tool from the sidebar to start adding text, images, videos, or emotional quotes to your story.
          </p>
        </div>
      ) : (
        <div className="w-full pb-32">
          {/* Framer Motion Drag and Drop Engine */}
          <Reorder.Group 
            axis="y" 
            values={blocks} 
            onReorder={reorderBlocks} 
            className="flex flex-col gap-6 w-full"
          >
            <AnimatePresence mode="popLayout">
              {blocks.map((block, index) => (
                <Reorder.Item 
                  key={block.id} 
                  value={block} 
                  className="w-full outline-none focus-visible:outline-none"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
                >
                  {/* The drag listener is bound inside the item via dragControls if needed, but Reorder handles it by default on the whole element. We will rely on default Reorder behavior. */}
                  <BlockEditorItem block={block} index={index} />
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>
        </div>
      )}
    </div>
  );
}
