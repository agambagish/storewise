import { useEffect, useRef, useState } from "react";

import { toast } from "sonner";

import { LoadingButton } from "@/components/loading-button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth/client";

interface Props {
  email: string;
  mode: "sign-up" | "sign-in";
}

export function VerifyEmail({ email, mode }: Props) {
  const [timeToNextResend, setTimeToNextResend] = useState(
    mode === "sign-up" ? 59 : 0,
  );

  const interval = useRef<NodeJS.Timeout | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: _
  useEffect(() => {
    if (mode === "sign-up") {
      startCountdown(59);
    }

    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, [mode]);

  function startCountdown(time = 59) {
    if (interval.current) clearInterval(interval.current);
    setTimeToNextResend(time);

    interval.current = setInterval(() => {
      setTimeToNextResend((t) => {
        const newT = t - 1;
        if (newT <= 0) {
          clearInterval(interval.current!);
          return 0;
        }
        return newT;
      });
    }, 1000);
  }

  async function resend() {
    await authClient.sendVerificationEmail(
      { email },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onError: (ctx) => {
          setIsLoading(false);
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          setIsLoading(false);
          toast.success(
            "A fresh verification link is on its way to your inbox.",
          );
        },
      },
    );
  }

  const description =
    mode === "sign-up"
      ? "A verification link has been sent to your email. Please follow the link to confirm your account."
      : "Your account has not been verified yet. Please check your inbox for the verification email.";

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Verify your email</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <LoadingButton
          className="w-full"
          variant="outline"
          disabled={timeToNextResend > 0 || isLoading}
          loading={isLoading}
          onClick={async () => {
            await resend();
            startCountdown();
          }}
        >
          Resend Verification Email{" "}
          {timeToNextResend > 0 && `(${timeToNextResend})`}
        </LoadingButton>
      </CardFooter>
    </Card>
  );
}
