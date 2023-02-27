import { memo } from "react";
import comparator from "fast-deep-equal/react";

type MemoizedComponent<T extends {}> = (p: T) => JSX.Element;

export const fastMemo = <T extends {}>(fn: MemoizedComponent<T>) => {
  return memo(fn, comparator);
};
