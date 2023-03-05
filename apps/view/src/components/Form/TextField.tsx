import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { Field } from "./Field";

export type TextFieldProps = FormTypes.InputProps<{
  value?: string;
  onChange?: (value: string) => void;
}>;

export const TextField = ({
  label,
  labelFor,
  className,
  error,
  name,
  id,
  size = "sm",
  value,
  onChange,
  ...inputProps
}: TextFieldProps) => {
  const { register } = useFormContext() || {};

  return (
    <Field
      error={error}
      className={className}
      labelFor={labelFor}
      label={label}
    >
      <input
        id={labelFor || id}
        {...(value && { value })}
        {...(onChange && { onChange })}
        className={clsx(
          "input",
          error && "input-error",
          size === "xs" && "input-xs",
          size === "sm" && "input-sm",
          size === "md" && "input-md",
          size === "lg" && "input-lg"
        )}
        {...inputProps}
        {...(register && register(name || TextField.name))}
      />
    </Field>
  );
};
