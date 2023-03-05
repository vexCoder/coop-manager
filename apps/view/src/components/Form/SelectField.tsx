import { parseEvent } from "@utils/parseEvent";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { useClickAway, useToggle } from "react-use";
import { Field } from "./Field";

type Option<T = string> = { label: React.ReactNode; value: T };

type SelectFieldProps<T = string> = FormTypes.InputProps<{
  options: Option[];
  onChange?: (value: T) => void;
  value?: T | T[];
}>;

export const SelectField = <T,>({
  label,
  labelFor,
  className,
  error,
  name,
  id,
  options,
  onChange,
  value,
  size = "sm",
  ...inputProps
}: SelectFieldProps<T>) => {
  const { register, setValue, watch } = useFormContext() || {};
  const [open, toggle] = useToggle(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickAway(ref, () => {
    if (open) toggle(false);
  });

  const fieldValue = watch?.(name || SelectField.name) || value;

  const handleToggle = useCallback(
    (_evt: React.BaseSyntheticEvent) => {
      const evt = parseEvent(_evt);

      if (evt.data.key === "enter" || evt.reason === "click") {
        toggle();
      }
    },
    [toggle]
  );

  const handleSelect = useCallback(
    (val: string) => {
      return (_evt: React.BaseSyntheticEvent) => {
        const evt = parseEvent(_evt);
        if (evt.data.key === "enter" || evt.reason === "click") {
          setValue(name || SelectField.name, val);
          toggle();
        }
      };
    },
    [setValue, toggle, name]
  );

  const valueLabel = options.find((o) => o.value === fieldValue)?.label;

  return (
    <Field
      error={error}
      className={className}
      labelFor={labelFor}
      label={label}
      ref={ref}
    >
      <input
        type="hidden"
        {...(register && register(name || SelectField.name))}
      />
      <div
        tabIndex={0}
        className={clsx(
          "input relative z-10 cursor-pointer",
          size === "xs" && "input-xs",
          size === "sm" && "input-sm",
          size === "md" && "input-md",
          size === "lg" && "input-lg"
        )}
        onClick={handleToggle}
        onKeyDown={handleToggle}
        role="button"
        {...inputProps}
      >
        {valueLabel}
      </div>
      <AnimatePresence>
        {open && (
          <motion.ul
            className="absolute top-[100%] z-50 mt-2 flex w-full origin-center flex-col gap-2 overflow-hidden rounded-md border border-base-300 bg-base-100 text-sm shadow-md"
            initial={{ opacity: 0, y: -5, z: 0 }}
            animate={{ opacity: 1, y: 0, z: 50 }}
            exit={{ opacity: 0, y: -20, z: 0 }}
            transition={{
              opacity: { duration: 0.15 },
              y: { duration: 0.3, ease: "easeInOut" },
              z: { duration: 0.05 },
            }}
          >
            {options.map((option) => (
              <li key={option.value}>
                <div
                  className="cursor-pointer p-2 transition-colors hover:bg-base-200"
                  tabIndex={0}
                  role="button"
                  onClick={handleSelect(option.value)}
                  onKeyDown={handleSelect(option.value)}
                >
                  {option.label}
                </div>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </Field>
  );
};
