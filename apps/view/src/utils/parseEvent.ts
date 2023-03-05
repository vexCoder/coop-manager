import { names, codes } from "keycode";

type NamesMap = typeof names;

type KeyNames = keyof typeof codes;

type ParsedData = {
  key?: KeyNames;
};

type ParsedEvent = (
  | (React.KeyboardEvent & { reason: "key" })
  | (React.MouseEvent & { reason: "click" })
  | (React.BaseSyntheticEvent & { reason: "other" })
) & { data: ParsedData };

export const parseEvent = <E extends React.BaseSyntheticEvent>(
  evt: E
): ParsedEvent => {
  const cbEvent = evt as unknown as ParsedEvent;
  let reason: "key" | "click" | "other" = "other";
  cbEvent.data = {};
  if (
    evt.type === "keydown" &&
    (("key" in evt && evt.key !== undefined) ||
      ("keyCode" in evt && evt.keyCode !== undefined))
  ) {
    const key = (
      "key" in evt ? evt.key : names[evt.keyCode as keyof NamesMap]
    ) as KeyNames;

    reason = "key";

    (cbEvent as ParsedEvent).data.key = key;
  } else if (evt.type === "click") {
    reason = "click";
  } else {
    reason = "other";
  }

  (cbEvent as ParsedEvent).reason = reason;

  return cbEvent as ParsedEvent;
};
