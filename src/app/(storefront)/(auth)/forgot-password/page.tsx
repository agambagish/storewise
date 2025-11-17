import type { Metadata } from "next";

import { ForgotPassword } from "@/modules/auth/components/forgot-password";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default function () {
  return <ForgotPassword />;
}
