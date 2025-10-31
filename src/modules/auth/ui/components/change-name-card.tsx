"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { signUpSchema } from "@/db/schema/users";
import { authClient } from "@/lib/auth-client";
import { orpc } from "@/orpc/client";

interface Props {
  name: string;
}

const schema = signUpSchema.pick({ name: true });

export function ChangeNameCard({ name }: Props) {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name,
    },
  });

  async function handleSubmit(values: z.infer<typeof schema>) {
    if (!form.formState.isDirty) {
      toast.error("There is no changes");
      return;
    }

    await authClient.updateUser(
      {
        name: values.name,
      },
      {
        onSuccess: () => {
          toast.success("Name updated successfully");
          queryClient.invalidateQueries(orpc.auth.me.queryOptions());
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  }

  const disabled = form.formState.isSubmitting;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Name</CardTitle>
        <CardDescription>Update your display name</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      disabled={disabled}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={
                disabled || !form.formState.isValid || !form.formState.isDirty
              }
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
