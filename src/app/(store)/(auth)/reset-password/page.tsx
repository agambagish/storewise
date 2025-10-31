import type { Metadata } from "next";

import { CircleAlert } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { ResetPasswordForm } from "@/modules/auth/ui/components/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password",
};

interface Props {
  searchParams: Promise<{ token: string }>;
}

export default async function ({ searchParams }: Props) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <Alert
        className="w-full max-w-md border-destructive"
        variant="destructive"
      >
        <CircleAlert />
        <AlertDescription>Token is missing</AlertDescription>
      </Alert>
    );
  }

  return <ResetPasswordForm token={token} />;
}
