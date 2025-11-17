"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";

import { FormEmail } from "@/components/form/form-email";
import { LoadingButton } from "@/components/loading-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { authClient } from "@/lib/auth/client";

import { signInSchema } from "../schema/auth-schema";

const schema = signInSchema.pick({ email: true });
type Schema = z.infer<typeof schema>;

export function ForgotPassword() {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: Schema) {
    await authClient.requestPasswordReset(
      {
        email: values.email,
        redirectTo: "/reset-password",
      },
      {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          form.reset();
          toast.success(
            "If an account is associated with this email, a password reset link has been sent.",
          );
        },
      },
    );
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Forgot Password?</CardTitle>
        <CardDescription>
          Enter your email below to receive a password reset link
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
            <Field>
              <LoadingButton
                type="submit"
                disabled={isSubmitting || !isValid}
                loading={isSubmitting}
              >
                Send reset link
              </LoadingButton>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
