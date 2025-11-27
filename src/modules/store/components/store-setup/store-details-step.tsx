import type { Control } from "react-hook-form";

import { FormInput } from "@/components/form/form-input";
import { FormTextarea } from "@/components/form/form-textarea";

import type { StoreSetupSchema } from "../../schema/store-setup-schema";

interface Props {
  control: Control<StoreSetupSchema>;
}

export function StoreDetailsStep({ control }: Props) {
  return (
    <>
      <FormInput
        control={control}
        name="name"
        label="Name"
        placeholder="Sparkles"
        autoFocus
      />
      <FormTextarea
        control={control}
        name="description"
        label="Description"
        placeholder="Your go-to destination for high-quality digital assets."
      />
    </>
  );
}
