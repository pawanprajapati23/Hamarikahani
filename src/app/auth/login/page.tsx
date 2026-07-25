import { LoginForm } from "@/features/auth/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome Back",
  description: "Sign in to HamariKahani to continue your story.",
};

export default function LoginPage() {
  return <LoginForm />;
}
