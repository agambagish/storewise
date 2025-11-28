import type { FieldValues } from "react-hook-form";

import type { BaseProps } from "@/components/form/form-base";
import { FormBase } from "@/components/form/form-base";
import { Textarea } from "@/components/ui/textarea";

export function FormTextarea<T extends FieldValues>(props: BaseProps<T>) {
  return (
    <FormBase {...props}>
      {(field) => (
        <Textarea
          autoComplete="nope"
          spellCheck="false"
          className="resize-none"
          {...field}
          value={field.value ?? ""}
        />
      )}
    </FormBase>
  );
}
