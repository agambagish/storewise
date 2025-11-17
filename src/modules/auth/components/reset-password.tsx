"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { FormPassword } from "@/components/form/form-password";
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

import { signUpSchema } from "../schema/auth-schema";

const schema = z
  .object({
    newPassword: signUpSchema.shape.password,
    confirmNewPassword: signUpSchema.shape.confirmPassword,
  })
  .refine((v) => v.newPassword === v.confirmNewPassword, {
    message: "Make sure both passwords match",
    path: ["confirmNewPassword"],
  });

type Schema = z.infer<typeof schema>;

export function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  async function onSubmit(values: Schema) {
    if (!token) {
      toast.error("Password reset token is missing.", {
        description: "Please request a new reset link to continue.",
      });

      return;
    }

    await authClient.resetPassword(
      {
        newPassword: values.newPassword,
        token,
      },
      {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          form.reset();
          toast.success("Your password has been updated.");
          router.push("/");
        },
      },
    );
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">
          {!token ? "Password reset token is missing" : "Reset Password"}
        </CardTitle>
        <CardDescription>
          {!token
            ? "Please request a new reset link to continue"
            : "Set a new password for your account"}
        </CardDescription>
      </CardHeader>
      {!!token && (
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <FormPassword
                control={form.control}
                name="newPassword"
                label="New Password"
                placeholder="*****"
                disabled={isSubmitting}
              />
              <FormPassword
                control={form.control}
                name="confirmNewPassword"
                label="Confirm New Password"
                placeholder="*****"
                disabled={isSubmitting}
              />
              <Field>
                <LoadingButton
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  loading={isSubmitting}
                >
                  Reset password
                </LoadingButton>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      )}
    </Card>
  );
}
