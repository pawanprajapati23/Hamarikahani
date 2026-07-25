import { ForgotPasswordForm } from "@/features/auth/components/ForgotPasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your HamariKahani password.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
