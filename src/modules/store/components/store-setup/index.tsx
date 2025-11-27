"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { LoadingButton } from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { getErrorMessage } from "@/lib/data-access/utils";

import { STORE_SETUP_STEPS } from "../../lib/constants";
import type { StoreSetupSchema } from "../../schema/store-setup-schema";
import { storeSetupSchema } from "../../schema/store-setup-schema";
import { createStore } from "../../server/mutations";
import { AccountVerificationStep } from "./account-verification-step";
import { PayoutSetupStep } from "./payout-setup-step";
import { PreviewSubmitStep } from "./preview-submit-step";
import { StoreDetailsStep } from "./store-details-step";

export function StoreSetup() {
  const [currentStep, setCurrentStep] = useState(1);
  const currentStepData = STORE_SETUP_STEPS[currentStep - 1];
  const router = useRouter();

  const form = useForm<StoreSetupSchema>({
    resolver: zodResolver(storeSetupSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: null,
      accountNumber: "",
      ifsc: "",
      accountHoldersName: "",
      accountType: "INDIVIDUAL",
      pan: "",
      gst: null,
    },
  });

  const accountType = form.watch("accountType");
  const gst = form.watch("gst");

  async function onNext() {
    if (currentStepData.id === 2 && accountType === "BUSINESS" && !gst) {
      form.setError("gst", {
        message: "GST is required for Business accounts",
        type: "custom",
      });

      return;
    }

    const isValid = await form.trigger(currentStepData.fields, {
      shouldFocus: true,
    });

    if (!isValid) return;
    setCurrentStep((val) => val + 1);
  }

  function onBack() {
    setCurrentStep((val) => val - 1);
  }

  async function onSubmit(values: StoreSetupSchema) {
    const res = await createStore(values);

    if (!res.success) {
      toast.error(getErrorMessage(res.error));
    }

    if (res.success) {
      router.refresh();
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      onNext();
    }
  }

  const { isSubmitting } = form.formState;

  return (
    <div className="flex flex-1 justify-center py-6 md:p-12 md:pr-0">
      <div className="w-full">
        <div className="mb-8">
          <h2 className="font-bold text-3xl text-foreground">
            {currentStepData.title}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {currentStepData.description}
          </p>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} onKeyDown={onKeyDown}>
          <FieldGroup>
            {currentStep === 1 && <StoreDetailsStep control={form.control} />}
            {currentStep === 2 && (
              <AccountVerificationStep control={form.control} />
            )}
            {currentStep === 3 && <PayoutSetupStep control={form.control} />}
            {currentStep === 4 && (
              <PreviewSubmitStep getValues={form.getValues} />
            )}
            <Field className="flex-row">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Back
                </Button>
              )}
              <LoadingButton
                type="button"
                className="flex-1"
                onClick={async () => {
                  if (currentStep < STORE_SETUP_STEPS.length) {
                    await onNext();
                  } else {
                    form.handleSubmit(onSubmit)();
                  }
                }}
                disabled={isSubmitting}
                loading={isSubmitting}
              >
                {currentStep < STORE_SETUP_STEPS.length ? "Next" : "Submit"}
              </LoadingButton>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
