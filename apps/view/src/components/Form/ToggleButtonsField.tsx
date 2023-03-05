import { parseEvent } from "@utils/parseEvent";
import clsx from "clsx";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { Field } from "./Field";

type ToggleButtonsProps<T = string | number> = FormTypes.InputProps<{
  options?: FormTypes.Option[];
  onChange?: (value: T) => void;
  value?: T | T[];
}>;

export const ToggleButtonsField = ({
  label,
  labelFor,
  className,
  error,
  name,
  options = [],
  size = "sm",
  onChange,
  value,
  ...inputProps
}: ToggleButtonsProps) => {
  const { register, setValue, watch } = useFormContext() || {};

  const registerProps = register?.(name || ToggleButtonsField.name);

  const fieldValue = watch?.(name || ToggleButtonsField.name) || value;

  const handleChange = useCallback(
    (val: string) => {
      return (_evt: React.BaseSyntheticEvent) => {
        const evt = parseEvent(_evt);
        if (evt.data.key === "enter" || evt.reason === "click") {
          setValue(name || ToggleButtonsField.name, val);
        }
      };
    },
    [name, setValue]
  );

  return (
    <Field
      error={error}
      className={className}
      labelFor={labelFor}
      label={label}
    >
      <div
        className={clsx(
          "input flex px-0",
          size === "xs" && "input-xs",
          size === "sm" && "input-sm",
          size === "md" && "input-md",
          size === "lg" && "input-lg"
        )}
      >
        {options.map((option) => {
          const isSelected = Array.isArray(fieldValue)
            ? fieldValue.includes(option.value)
            : fieldValue === option.value;

          return (
            <div
              tabIndex={0}
              role="button"
              className={clsx(
                "flex-1 cursor-pointer text-center",
                "[&:not(:last-child)]:border-r [&:not(:last-child)]:border-base-300",
                isSelected && "bg-base-200"
              )}
              key={option.value}
              {...inputProps}
              {...registerProps}
              onClick={handleChange(option.value)}
              onKeyDown={handleChange(option.value)}
            >
              {option.label}
            </div>
          );
        })}
      </div>
    </Field>
  );
};
