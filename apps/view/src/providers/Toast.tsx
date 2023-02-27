import { Toast } from "@components/Utils";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { toastSlice, ToastType } from "@slices/toast";
import { AnimatePresence } from "framer-motion";
import { useCallback } from "react";

type ToastProviderProps = {
  children: React.ReactNode;
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const { toasts } = useAppSelector((state) => state.toast);

  return (
    <>
      <AnimatePresence>
        {toasts.map((v, i) => (
          <Toast key={v.id} toast={v} order={i} />
        ))}
      </AnimatePresence>
      {children}
    </>
  );
};

export const useToast = () => {
  const dispatch = useAppDispatch();
  type ToastParams = {
    title: string;
    description: string;
    timeout?: number;
  };
  const makePush = useCallback(
    (type: ToastType) =>
      ({ description, title, timeout }: ToastParams) =>
        dispatch(
          toastSlice.actions.push({ description, title, type, timeout })
        ),
    [dispatch]
  );

  return {
    success: makePush("success"),
    error: makePush("error"),
    info: makePush("info"),
    warning: makePush("warning"),
  };
};
