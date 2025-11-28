import type { FieldValues } from "react-hook-form";

import type { BaseProps } from "@/components/form/form-base";
import { FormBase } from "@/components/form/form-base";
import { Input } from "@/components/ui/input";

export function FormInput<T extends FieldValues>(props: BaseProps<T>) {
  return (
    <FormBase {...props}>
      {(field) => (
        <Input
          autoComplete="nope"
          spellCheck="false"
          {...field}
          value={field.value ?? ""}
        />
      )}
    </FormBase>
  );
}
