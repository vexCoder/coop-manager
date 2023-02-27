import { useAppDispatch } from "@hooks/redux";
import { Toast as ToastState, toastSlice } from "@slices/toast";
import {
  IconCircleCheck,
  IconExclamationCircle,
  IconInfoCircle,
  IconAlertTriangle,
} from "@tabler/icons-react";
import { useEffectOnce } from "react-use";
import { motion } from "framer-motion";
import clsx from "clsx";

type Props = {
  toast: ToastState;
  order: number;
};

export const Toast = ({ toast, order }: Props) => {
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(toastSlice.actions.remove(toast.id));
  };

  useEffectOnce(() => {
    if (!toast.timeout) return () => {};

    const timeout = setTimeout(() => {
      handleRemove();
    }, toast.timeout ?? 5000);

    return () => clearTimeout(timeout);
  });

  return (
    <motion.div
      className={clsx(
        "alert flex max-h-[60px] max-w-[75%] flex-row items-center justify-start p-2 px-4 shadow-lg",
        toast.type === "success" && "alert-success",
        toast.type === "error" && "alert-error",
        toast.type === "info" && "alert-info",
        toast.type === "warning" && "alert-warning"
      )}
      onClick={handleRemove}
      style={{ position: "fixed", bottom: 10 + order * 60 }}
      initial={{ right: -500 }}
      animate={{ right: 10, bottom: 10 + order * 60 }}
      exit={{ right: -500 }}
    >
      <div>
        {toast.type === "success" && <IconCircleCheck />}
        {toast.type === "error" && <IconExclamationCircle />}
        {toast.type === "info" && <IconInfoCircle />}
        {toast.type === "warning" && <IconAlertTriangle />}
        <div>
          <h6 className="text-sm font-bold">{toast.title}</h6>
          <p className="text-xs leading-none">{toast.description}</p>
        </div>
      </div>
    </motion.div>
  );
};
