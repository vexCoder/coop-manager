import { ErrorFallback } from "@components/Utils";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@utils/queryClient";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@utils/store";
import { ToastProvider } from "./Toast";

export type MainProviderProps = {
  children: ReactChildren;
};

export const MainProvider = ({ children }: MainProviderProps) => {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <ToastProvider>
              <HashRouter>{children}</HashRouter>
            </ToastProvider>
          </ErrorBoundary>
        </QueryClientProvider>
      </Provider>
    </Suspense>
  );
};
