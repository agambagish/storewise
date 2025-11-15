import { useState } from "react";

import { VerifyEmail } from "@/modules/auth/components/verify-email";

export function useVerifyEmail(mode: "sign-up" | "sign-in") {
  const [email, setEmail] = useState<string | null>(null);
  const [showVerifyEmailComponent, setShowVerifyEmailComponent] =
    useState(false);

  function triggerVerification(email: string) {
    setEmail(email);
    setShowVerifyEmailComponent(true);
  }

  function renderVerificationComponentIfNeeded() {
    if (!showVerifyEmailComponent || email === null) return null;
    return <VerifyEmail email={email} mode={mode} />;
  }

  return {
    showVerifyEmailComponent,
    triggerVerification,
    renderVerificationComponentIfNeeded,
  };
}
