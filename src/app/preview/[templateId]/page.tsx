import { PublicStoryRenderer } from "@/features/story/components/PublicStoryRenderer";
import { MOCK_TEMPLATE_BLOCKS } from "@/config/mock-blocks";
import { TEMPLATES } from "@/config/templates";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, PenTool } from "lucide-react";

export default async function PreviewPage({ params }: { params: Promise<{ templateId: string }> }) {
  const { templateId } = await params;
  
  const templateConfig = TEMPLATES.find(t => t.id === `${templateId}_template` || t.id.startsWith(templateId));
  const block = MOCK_TEMPLATE_BLOCKS[templateId];

  if (!block || !templateConfig) {
    return notFound();
  }

  return (
    <div className="relative min-h-screen bg-background">
      {/* Floating Preview Header */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4 pointer-events-none">
        <div className="max-w-3xl mx-auto flex items-center justify-between pointer-events-auto bg-background/80 backdrop-blur-xl border border-border/50 rounded-full px-6 py-3 shadow-lg">
          <Button variant="ghost" className="rounded-full gap-2" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4" /> Back
            </Link>
          </Button>
          <div className="font-semibold text-sm hidden sm:block text-foreground">
            {templateConfig.name} - Live Preview
          </div>
          <Button className="rounded-full gap-2" asChild>
            <Link href={templateConfig.createUrl}>
              <PenTool className="w-4 h-4" /> Use Template
            </Link>
          </Button>
        </div>
      </div>

      {/* The Template */}
      <div className="pt-24 min-h-screen pb-12">
        <PublicStoryRenderer 
          title={""} 
          blocks={[block]} 
          themeId="theme-light" 
          slug="preview" 
        />
      </div>
    </div>
  );
}
