"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Edit3 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";

import { FormInput } from "@/components/form/form-input";
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

import { signUpSchema } from "../../schema/auth-schema";
import { revalidate } from "../../server/mutations";

const schema = signUpSchema.pick({ name: true });
type Schema = z.infer<typeof schema>;

interface Props {
  name: string;
}

export function EditNameDialog({ name }: Props) {
  const [open, setOpen] = useState(false);

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name,
    },
  });

  const { isSubmitting, isValid, isDirty } = form.formState;

  async function onSubmit(values: Schema) {
    if (!isDirty) {
      toast.info("Nothing to change.");
      return;
    }

    await authClient.updateUser(
      { name: values.name },
      {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: async () => {
          toast.success("Name has been updated.");
          await revalidate("/account");
          form.reset({ name: values.name });
          setOpen(false);
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon-sm" variant="ghost">
          <Edit3 className="text-muted-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit name</DialogTitle>
          <DialogDescription>
            Change or update the current name to a new one.
          </DialogDescription>
        </DialogHeader>
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
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <LoadingButton
                type="submit"
                disabled={isSubmitting || !isValid || !isDirty}
                loading={isSubmitting}
              >
                Save changes
              </LoadingButton>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
