import { useCallback, useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import type { FieldValues } from "react-hook-form";

import type { BaseProps } from "@/components/form/form-base";
import { FormBase } from "@/components/form/form-base";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

export function FormPassword<T extends FieldValues>(
  props: BaseProps<T> & {
    forgotPassword?: boolean;
  },
) {
  const [isVisible, setIsVisible] = useState(false);

  const toggle = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  return (
    <FormBase {...props}>
      {(field) => (
        <InputGroup>
          <InputGroupInput type={isVisible ? "text" : "password"} {...field} />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-xs"
              type="button"
              onClick={toggle}
              disabled={field.disabled}
            >
              {isVisible ? <EyeOff /> : <Eye />}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      )}
    </FormBase>
  );
}
