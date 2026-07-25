import { SignupForm } from "@/features/auth/components/SignupForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Join HamariKahani and craft unforgettable surprises.",
};

export default function SignupPage() {
  return <SignupForm />;
}
