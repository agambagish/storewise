"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { signInSchema } from "@/db/schema/users";
import { authClient } from "@/lib/auth-client";

const schema = signInSchema.pick({ email: true });

export function ForgotPasswordForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  async function handleSubmit(values: z.infer<typeof schema>) {
    await authClient.requestPasswordReset(
      {
        email: values.email,
        redirectTo: "/reset-password",
      },
      {
        onSuccess: () => {
          toast.info("If this email exists, a reset link has been sent.");
          form.reset();
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
        <CardTitle className="text-lg md:text-xl">Forgot Password?</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your email address to receive a password reset link
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <InputGroup>
                      <InputGroupInput
                        type="email"
                        placeholder="johndoe@example.com"
                        disabled={disabled}
                        {...field}
                      />
                      <InputGroupAddon>
                        <Mail />
                      </InputGroupAddon>
                    </InputGroup>
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
              Send reset link
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
