import { requireAuth } from "@/features/auth/utils/server-auth";
import { EditorContainer } from "@/features/editor/components/EditorContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Story | HamariKahani",
  description: "Craft your digital surprise.",
};

export default async function CreateStoryPage() {
  // Middleware already protects /create, but requireAuth ensures strict server validation
  await requireAuth(true);

  return <EditorContainer />;
}
