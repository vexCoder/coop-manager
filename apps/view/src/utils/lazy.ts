import { lazy as ReactLazy } from "react";

export const lazyDefault = <T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>
): T => {
  return ReactLazy(() => factory()) as unknown as T;
};
