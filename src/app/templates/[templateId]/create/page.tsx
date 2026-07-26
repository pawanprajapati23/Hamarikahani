import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { TEMPLATES } from "@/config/templates";
import { TemplateFormManager } from "./TemplateFormManager";

export default async function CreateTemplatePage({ params }: { params: Promise<{ templateId: string }> }) {
  const { templateId } = await params;
  
  const templateConfig = TEMPLATES.find(t => t.id === `${templateId}_template` || t.id.startsWith(templateId));
  if (!templateConfig) {
    redirect("/");
  }

  // 1. Check Auth
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/auth/login?next=/templates/${templateId}/create`);
  }

  // 2. Render Template Form Manager
  return (
    <div className="min-h-screen bg-background">
      <TemplateFormManager templateId={templateId} templateConfig={templateConfig} userId={user.id} />
    </div>
  );
}
