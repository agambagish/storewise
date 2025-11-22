"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";

import { FormPassword } from "@/components/form/form-password";
import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { authClient } from "@/lib/auth/client";

import { signInSchema } from "../../schema/auth-schema";
import { revalidate } from "../../server/mutations";

const schema = signInSchema.pick({ password: true });
type Schema = z.infer<typeof schema>;

export function DeleteAccountDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      password: "",
    },
  });

  const { isSubmitting, isValid, isDirty } = form.formState;

  async function onSubmit(values: Schema) {
    await authClient.deleteUser(
      { password: values.password },
      {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: async () => {
          toast.success("Your account has been deleted.");
          await revalidate("/account/danger");
          setOpen(false);
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete your account</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete your account</DialogTitle>
          <DialogDescription>
            Enter your password to permanently remove your account. This action
            is irreversible.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormPassword
              control={form.control}
              name="password"
              label="Password"
              placeholder="*****"
              disabled={isSubmitting}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <LoadingButton
                type="submit"
                disabled={isSubmitting || !isValid || !isDirty}
                loading={isSubmitting}
                variant="destructive"
              >
                Confirm
              </LoadingButton>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
