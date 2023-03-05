import { Tooltip } from "@components/Utils/Tooltip/Tooltip";
import { IconAlertCircle } from "@tabler/icons-react";
import clsx from "clsx";
import { forwardRef } from "react";

export type FieldComponentProps = {
  children: React.ReactNode | React.ReactNode[];
} & FormTypes.BaseFieldProps;

export const Field = forwardRef<HTMLDivElement, FieldComponentProps>(
  ({ children, label, labelFor, className, error }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          className,
          "form-control relative w-full min-w-0",
          error && "error"
        )}
      >
        {label && (
          <label className="label px-0 py-1" htmlFor={labelFor}>
            <span
              className={clsx(
                "label-text text-base-content line-clamp-1",
                error && "text-error"
              )}
            >
              {label}
            </span>
            {error && (
              <Tooltip title={error}>
                <IconAlertCircle className="h-4 w-4 cursor-pointer text-xs text-error" />
              </Tooltip>
            )}
          </label>
        )}
        {children}
      </div>
    );
  }
);
