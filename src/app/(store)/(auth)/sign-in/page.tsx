import type { Metadata } from "next";

import { SignInForm } from "@/modules/auth/ui/components/sign-in-form";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function () {
  return <SignInForm />;
}
