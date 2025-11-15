import type { Metadata } from "next";

import { SignIn } from "@/modules/auth/components/sign-in";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function () {
  return <SignIn />;
}
