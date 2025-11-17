"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormEmail } from "@/components/form/form-email";
import { FormPassword } from "@/components/form/form-password";
import { LoadingButton } from "@/components/loading-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { useVerifyEmail } from "@/hooks/use-verify-email";
import { authClient } from "@/lib/auth/client";

import type { SignInSchema } from "../schema/auth-schema";
import { signInSchema } from "../schema/auth-schema";

export function SignIn() {
  const router = useRouter();

  const {
    showVerifyEmailComponent,
    triggerVerification,
    renderVerificationComponentIfNeeded,
  } = useVerifyEmail("sign-in");

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignInSchema) {
    await authClient.signIn.email(values, {
      onError: (ctx) => {
        toast.error(ctx.error.message);
        if (ctx.error.status === 403) {
          triggerVerification(values.email);
        }
      },
      onSuccess: () => {
        form.reset();
        toast.success("Welcome back!", {
          description: "You've signed in successfully.",
        });
        router.push("/");
      },
    });
  }

  const { isSubmitting, isValid } = form.formState;

  if (showVerifyEmailComponent) {
    return renderVerificationComponentIfNeeded();
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>
          Enter your email below to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormEmail
              control={form.control}
              name="email"
              label="Email"
              placeholder="johndoe@example.com"
              disabled={isSubmitting}
              autoFocus
            />
            <FormPassword
              control={form.control}
              name="password"
              label="Password"
              placeholder="*****"
              disabled={isSubmitting}
              forgotPassword
            />
            <Field>
              <LoadingButton
                type="submit"
                disabled={isSubmitting || !isValid}
                loading={isSubmitting}
              >
                Sign in
              </LoadingButton>
              <FieldDescription className="text-center">
                Don&apos;t have an account? <Link href="/sign-up">Sign up</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
