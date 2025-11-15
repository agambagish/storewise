import type { FieldValues } from "react-hook-form";

import type { BaseProps } from "@/components/form/form-base";
import { FormBase } from "@/components/form/form-base";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props<T extends FieldValues> extends BaseProps<T> {
  children: React.ReactNode;
}

export function FormSelect<T extends FieldValues>({
  children,
  ...props
}: Props<T>) {
  return (
    <FormBase {...props}>
      {({ onChange, onBlur, placeholder, ...field }) => (
        <Select onValueChange={onChange} {...field}>
          <SelectTrigger
            id={field.id}
            aria-invalid={field["aria-invalid"]}
            onBlur={onBlur}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>{children}</SelectContent>
        </Select>
      )}
    </FormBase>
  );
}
