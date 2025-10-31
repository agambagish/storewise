"use client";

import { useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import type { ControllerRenderProps, FieldValues } from "react-hook-form";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

interface Props<T extends FieldValues> {
  field: ControllerRenderProps<T>;
  placeholder?: string;
  disabled?: boolean;
}

export function PasswordInput<T extends FieldValues>({
  field,
  placeholder,
  disabled,
}: Props<T>) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <InputGroup>
      <InputGroupInput
        type={isVisible ? "text" : "password"}
        placeholder={placeholder}
        disabled={disabled}
        {...field}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-xs"
          type="button"
          onClick={toggleVisibility}
          disabled={disabled}
        >
          {isVisible ? <EyeOff /> : <Eye />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
