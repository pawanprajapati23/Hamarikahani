"use client";

import { useEditorStore } from "../store/editor";
import { EditorLayout } from "./EditorLayout";
import { SetupStep } from "./SetupStep";
import { ContentStep } from "./ContentStep";
import { PreviewStep } from "./PreviewStep";
import { EditorSidebar } from "./Sidebar";
import { CheckoutModal } from "@/features/checkout/components/CheckoutModal";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function EditorContainer() {
  const { step } = useEditorStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <EditorLayout sidebar={step === "CONTENT" ? <EditorSidebar /> : undefined}>
      {step === "SETUP" && <SetupStep />}
      {step === "CONTENT" && <ContentStep />}
      {step === "PREVIEW" && (
        <div className="relative">
          <PreviewStep />
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <Button size="lg" className="rounded-full shadow-2xl h-14 px-8 text-lg font-bold animate-bounce" onClick={() => setIsCheckoutOpen(true)}>
              Publish & Share Story
            </Button>
          </div>
          <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
        </div>
      )}
    </EditorLayout>
  );
}
