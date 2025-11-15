"use client";

import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormEmail } from "@/components/form/form-email";
import { FormInput } from "@/components/form/form-input";
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

import type { SignUpSchema } from "../schema/auth-schema";
import { signUpSchema } from "../schema/auth-schema";

export function SignUp() {
  const {
    showVerifyEmailComponent,
    triggerVerification,
    renderVerificationComponentIfNeeded,
  } = useVerifyEmail("sign-up");

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: SignUpSchema) {
    await authClient.signUp.email(values, {
      onError: (ctx) => {
        toast.error(ctx.error.message);
      },
      onSuccess: () => {
        form.reset();
        toast.success("You're all set!", {
          description: "Your account has been created successfully.",
        });
        triggerVerification(values.email);
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
        <CardTitle className="text-xl">Create your account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormInput
              control={form.control}
              name="name"
              label="Name"
              placeholder="John Doe"
              disabled={isSubmitting}
              autoFocus
            />
            <FormEmail
              control={form.control}
              name="email"
              label="Email"
              placeholder="johndoe@example.com"
              disabled={isSubmitting}
            />
            <FormPassword
              control={form.control}
              name="password"
              label="Password"
              placeholder="*****"
              disabled={isSubmitting}
            />
            <FormPassword
              control={form.control}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="*****"
              disabled={isSubmitting}
            />
            <Field>
              <LoadingButton
                type="submit"
                disabled={isSubmitting || !isValid}
                loading={isSubmitting}
              >
                Create Account
              </LoadingButton>
              <FieldDescription className="text-center">
                Already have an account? <Link href="/sign-in">Sign in</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
