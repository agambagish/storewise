"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { signUpSchema } from "@/db/schema/users";
import { authClient } from "@/lib/auth-client";
import { orpc } from "@/orpc/client";

const schema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: signUpSchema.shape.password,
    confirmNewPassword: z.string().min(1, "Please confirm new password"),
    revokeOtherSessions: z.boolean().optional(),
  })
  .superRefine((values, ctx) => {
    if (values.newPassword !== values.confirmNewPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Please make sure both new passwords match",
        path: ["confirmNewPassword"],
      });
    }

    if (values.newPassword === values.currentPassword) {
      ctx.addIssue({
        code: "custom",
        message: "New password must be different from current password",
        path: ["newPassword"],
      });
    }
  });

export function ChangePasswordCard() {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof schema>) {
    await authClient.changePassword(values, {
      onSuccess: () => {
        toast.success("Password updated successfully");
        queryClient.invalidateQueries(orpc.auth.me.queryOptions());
        form.reset();
      },
      onError: (ctx) => {
        toast.error(ctx.error.message);
      },
    });
  }

  const disabled = form.formState.isSubmitting;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>Update your account password</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      field={field}
                      placeholder="Current Password"
                      disabled={disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      field={field}
                      placeholder="New Password"
                      disabled={disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      field={field}
                      placeholder="Confirm New Password"
                      disabled={disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={disabled || !form.formState.isValid}
            >
              {disabled && <Spinner />}
              Save changes
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
