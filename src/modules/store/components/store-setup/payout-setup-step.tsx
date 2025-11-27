import type { Control } from "react-hook-form";

import { FormInput } from "@/components/form/form-input";

import type { StoreSetupSchema } from "../../schema/store-setup-schema";

interface Props {
  control: Control<StoreSetupSchema>;
}

export function PayoutSetupStep({ control }: Props) {
  return (
    <>
      <FormInput
        control={control}
        name="accountNumber"
        label="Bank Account Number"
        placeholder="0110040500000013"
      />
      <FormInput
        control={control}
        name="ifsc"
        label="IFSC"
        placeholder="HDFC0001111"
      />
      <FormInput
        control={control}
        name="accountHoldersName"
        label="Account Holder's Name"
        placeholder="John Doe"
      />
    </>
  );
}
