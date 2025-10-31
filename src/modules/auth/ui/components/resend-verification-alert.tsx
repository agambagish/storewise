"use client";

import { useState } from "react";

import { AlertCircle } from "lucide-react";
import { toast } from "sonner";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";

interface Props {
  email: string;
}

export function ResendVerificationAlert({ email }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleClick() {
    await authClient.sendVerificationEmail(
      {
        email,
        callbackURL: "/email-verified",
      },
      {
        onRequest: () => setIsLoading(true),
        onSuccess: () => {
          toast.success("Verification email sent successfully");
          setIsLoading(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
          setIsLoading(false);
        },
      },
    );
  }

  return (
    <Alert>
      {isLoading ? <Spinner /> : <AlertCircle />}
      <AlertDescription className="flex items-center justify-between">
        <span className="text-sm">
          Haven&apos;t received the verification email?
        </span>
        <Button
          disabled={isLoading}
          variant="link"
          size="sm"
          className="h-auto p-0"
          onClick={handleClick}
        >
          Resend
        </Button>
      </AlertDescription>
    </Alert>
  );
}
