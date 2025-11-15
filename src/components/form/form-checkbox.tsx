import type { FieldValues } from "react-hook-form";

import type { BaseProps } from "@/components/form/form-base";
import { FormBase } from "@/components/form/form-base";
import { Checkbox } from "@/components/ui/checkbox";

export function FormCheckbox<T extends FieldValues>(
  props: Omit<BaseProps<T>, "placeholder">,
) {
  return (
    <FormBase {...props} horizontal controlFirst>
      {({ onChange, value, ...field }) => (
        <Checkbox checked={value} onCheckedChange={onChange} {...field} />
      )}
    </FormBase>
  );
}
