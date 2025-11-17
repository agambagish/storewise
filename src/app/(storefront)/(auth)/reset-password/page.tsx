import { Suspense } from "react";
import type { Metadata } from "next";

import { ResetPassword } from "@/modules/auth/components/reset-password";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function () {
  return (
    <Suspense>
      <ResetPassword />
    </Suspense>
  );
}
