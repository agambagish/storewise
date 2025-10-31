import type { Metadata } from "next";

import { ForgotPasswordForm } from "@/modules/auth/ui/components/forgot-password-form";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default function () {
  return <ForgotPasswordForm />;
}
