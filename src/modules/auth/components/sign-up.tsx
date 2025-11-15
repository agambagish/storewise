"use client";

import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormEmail } from "@/components/form/form-email";
import { FormInput } from "@/components/form/form-input";
import { FormPassword } from "@/components/form/form-password";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth/client";

import type { SignUpSchema } from "../schema/sign-up-schema";
import { signUpSchema } from "../schema/sign-up-schema";

export function SignUp() {
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
        // TODO: Show verification
      },
    });
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Create your account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
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
              <Button type="submit" disabled={isSubmitting || !isValid}>
                {isSubmitting && <Spinner />}
                Create Account
              </Button>
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
