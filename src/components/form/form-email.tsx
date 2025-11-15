import { Mail } from "lucide-react";
import type { FieldValues } from "react-hook-form";

import type { BaseProps } from "@/components/form/form-base";
import { FormBase } from "@/components/form/form-base";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export function FormEmail<T extends FieldValues>(props: BaseProps<T>) {
  return (
    <FormBase {...props}>
      {(field) => (
        <InputGroup>
          <InputGroupInput
            autoComplete="nope"
            spellCheck="false"
            type="email"
            {...field}
          />
          <InputGroupAddon>
            <Mail />
          </InputGroupAddon>
        </InputGroup>
      )}
    </FormBase>
  );
}
