"use client";

import { useState } from "react";

import { LoadingButton } from "@/components/loading-button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface Props<T> extends React.ComponentProps<typeof Button> {
  action: () => Promise<T>;
  onSuccess?: (result: T) => void;
  onError?: (error: unknown) => void;
  requireConfirmation?: boolean;
  confirmationDescription?: React.ReactNode;
}

export function ActionButton<T>({
  action,
  onSuccess,
  onError,
  requireConfirmation,
  confirmationDescription = "This action can't be undone.",
  ...props
}: Props<T>) {
  const [isLoading, setIsLoading] = useState(false);

  async function onClick() {
    setIsLoading(true);
    try {
      const res = await action();
      onSuccess?.(res);
    } catch (err) {
      onError?.(err);
    } finally {
      setIsLoading(false);
    }
  }

  if (requireConfirmation) {
    return (
      <AlertDialog open={isLoading ? true : undefined}>
        <AlertDialogTrigger asChild>
          <Button {...props} />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmationDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isLoading}
              onClick={onClick}
              asChild
              autoFocus
            >
              <LoadingButton disabled={isLoading} loading={isLoading}>
                Confirm
              </LoadingButton>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <LoadingButton
      onClick={onClick}
      disabled={isLoading}
      loading={isLoading}
      {...props}
    />
  );
}
