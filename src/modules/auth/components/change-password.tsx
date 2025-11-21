"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { FormCheckbox } from "@/components/form/form-checkbox";
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
    currentPassword: z.string().nonempty("Current password can't be empty"),
    newPassword: signUpSchema.shape.password,
    confirmNewPassword: signUpSchema.shape.confirmPassword,
    revokeOtherSessions: z.boolean().optional(),
  })
  .refine((v) => v.newPassword === v.confirmNewPassword, {
    message: "Make sure both passwords match",
    path: ["confirmNewPassword"],
  });

type Schema = z.infer<typeof schema>;

export function ChangePassword() {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      revokeOtherSessions: false,
    },
  });

  async function onSubmit(values: Schema) {
    await authClient.changePassword(values, {
      onError: (ctx) => {
        toast.error(ctx.error.message);
      },
      onSuccess: () => {
        form.reset();
        toast.success("Your password has been changed.");
      },
    });
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change password</CardTitle>
        <CardDescription>
          Update your password to keep your account secure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormPassword
              control={form.control}
              name="currentPassword"
              label="Current Password"
              placeholder="*****"
              disabled={isSubmitting}
            />
            <div className="grid grid-cols-2 gap-7">
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
            </div>
            <FormCheckbox
              control={form.control}
              name="revokeOtherSessions"
              label="Signout from all other devices"
              disabled={isSubmitting}
            />
            <Field>
              <LoadingButton
                type="submit"
                disabled={isSubmitting || !isValid}
                loading={isSubmitting}
              >
                Save changes
              </LoadingButton>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
