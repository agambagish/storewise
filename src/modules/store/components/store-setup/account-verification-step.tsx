import type { Control } from "react-hook-form";
import { useWatch } from "react-hook-form";

import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { SelectItem } from "@/components/ui/select";
import { stores } from "@/db/schema";

import type { StoreSetupSchema } from "../../schema/store-setup-schema";

interface Props {
  control: Control<StoreSetupSchema>;
}

export function AccountVerificationStep({ control }: Props) {
  const accountType = useWatch({
    control,
    name: "accountType",
  });

  return (
    <>
      <FormSelect
        control={control}
        name="accountType"
        label="Account Type"
        placeholder="Select Account Type"
      >
        {stores.accountType.enumValues.map((val) => (
          <SelectItem key={val} value={val}>
            {val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()}
          </SelectItem>
        ))}
      </FormSelect>
      <FormInput
        control={control}
        name="pan"
        label="PAN"
        placeholder="ABCDE1234X"
        autoFocus
      />
      {accountType === "BUSINESS" && (
        <FormInput
          control={control}
          name="gst"
          label="GST"
          placeholder="01AAABC2345C1ZZ"
        />
      )}
    </>
  );
}
