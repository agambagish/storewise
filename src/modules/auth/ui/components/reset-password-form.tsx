"use client";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
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

const schema = z
  .object({
    newPassword: signUpSchema.shape.password,
    confirmNewPassword: z.string().min(1, "Please confirm new password"),
  })
  .refine((values) => values.newPassword === values.confirmNewPassword, {
    message: "Please make sure both passwords match",
    path: ["confirmNewPassword"],
  });

interface Props {
  token: string;
}

export function ResetPasswordForm({ token }: Props) {
  const router = useRouter();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof schema>) {
    await authClient.resetPassword(
      {
        newPassword: values.newPassword,
        token,
      },
      {
        onSuccess: () => {
          form.reset();
          toast.success("Password has been reset", {
            description: "You can now sign in",
          });
          setTimeout(() => router.push("/sign-in"), 2_000);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  }

  const disabled = form.formState.isSubmitting;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Reset Password</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Set a new password for your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
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
              className="w-full"
              disabled={disabled || !form.formState.isValid}
            >
              {disabled && <Spinner />}
              Reset password
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
