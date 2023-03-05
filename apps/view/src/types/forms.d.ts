declare namespace FormTypes {
  type SizeVariant = "xs" | "sm" | "md" | "lg";

  type InputProps<T extends {} = {}, Element = HTMLInputElement> = Omit<
    React.InputHTMLAttributes<Element>,
    "size" | "onChange"
  > &
    BaseFieldProps &
    CommonFieldProps &
    T;

  type BaseFieldProps = {
    label?: string;
    labelFor?: string;
    className?: string;
    error?: string;
  };

  type CommonFieldProps = {
    size?: SizeVariant;
  }

  type Option = {
    value: string;
    label: string | React.ReactNode;
  }
}
