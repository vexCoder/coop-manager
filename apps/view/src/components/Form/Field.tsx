import clsx from "clsx";

type FieldProps = {
  children: React.ReactNode;
  label?: string;
  labelFor?: string;
  className?: string;
  error?: string;
};

export const Field = ({
  children,
  label,
  labelFor,
  className,
  error,
}: FieldProps) => {
  return (
    <div className={clsx(className, "form-control w-full")}>
      {label && (
        <label className="label" htmlFor={labelFor}>
          <span className="label-text">{label}</span>
        </label>
      )}
      {children}
      {error && <p className="my-0 mt-4 text-error">{error}</p>}
    </div>
  );
};
