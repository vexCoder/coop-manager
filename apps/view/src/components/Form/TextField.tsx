import clsx from "clsx";
import { UseFormRegisterReturn } from "react-hook-form";
import { Field } from "./Field";

type TextFieldProps<T extends string> = {
  label?: string;
  labelFor?: string;
  placeholder?: string;
  className?: string;
  registration: UseFormRegisterReturn<T>;
  error?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

export const TextField = <T extends string>({
  label,
  placeholder,
  labelFor,
  className,
  registration,
  error,
  inputProps,
}: TextFieldProps<T>) => {
  return (
    <Field
      error={error}
      className={className}
      labelFor={labelFor}
      label={label}
    >
      <input
        className={clsx("rounded-md", "input-bordered input", labelFor)}
        placeholder={placeholder}
        {...inputProps}
        {...registration}
      />
    </Field>
  );
};
