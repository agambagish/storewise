import type { Metadata } from "next";

import { SignUp } from "@/modules/auth/components/sign-up";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function () {
  return <SignUp />;
}
