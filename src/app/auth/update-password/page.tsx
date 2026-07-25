import { UpdatePasswordForm } from "@/features/auth/components/UpdatePasswordForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Update Password",
  description: "Set your new password.",
};

export default function UpdatePasswordPage() {
  return <UpdatePasswordForm />;
}
