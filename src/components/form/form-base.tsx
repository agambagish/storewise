import type {
  Control,
  ControllerProps,
  FieldValues,
  Path,
} from "react-hook-form";
import { Controller } from "react-hook-form";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

export interface BaseProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
}

interface Props<T extends FieldValues> extends BaseProps<T> {
  horizontal?: boolean;
  controlFirst?: boolean;
  children: (
    field: Parameters<ControllerProps<T>["render"]>[number]["field"] & {
      "aria-invalid": boolean;
      id: string;
      placeholder?: string;
      disabled?: boolean;
      readOnly?: boolean;
      autoFocus?: boolean;
    },
  ) => React.ReactNode;
}

export function FormBase<T extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder,
  disabled,
  readOnly,
  autoFocus,
  horizontal,
  controlFirst,
  children,
}: Props<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const labelElement = (
          <>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            {description && <FieldDescription>{description}</FieldDescription>}
          </>
        );

        const control = children({
          ...field,
          id: field.name,
          "aria-invalid": fieldState.invalid,
          placeholder,
          disabled,
          readOnly,
          autoFocus,
        });

        const errorElement = fieldState.invalid && (
          <FieldError errors={[fieldState.error]} />
        );

        return (
          <Field
            data-invalid={fieldState.invalid}
            orientation={horizontal ? "horizontal" : undefined}
          >
            {controlFirst ? (
              <>
                {control}
                <FieldContent>
                  {labelElement}
                  {errorElement}
                </FieldContent>
              </>
            ) : (
              <>
                <FieldContent>{labelElement}</FieldContent>
                {control}
                {errorElement}
              </>
            )}
          </Field>
        );
      }}
    />
  );
}
