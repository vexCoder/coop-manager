import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { usePopper } from "react-popper";

type Props = {
  children: React.ReactNode;
  title?: string;
};
export const Tooltip = ({ children, title }: Props) => {
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>();
  const [refElement, setRefElement] = useState<HTMLSpanElement | null>();
  const [arrowElement, setArrowRef] = useState<HTMLSpanElement | null>();
  const { styles, attributes } = usePopper(refElement, popperElement, {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
      {
        name: "arrow",
        options: {
          element: arrowElement,
        },
      },
    ],
  });
  const [open, toggle] = useState(false);

  return (
    <>
      <span
        ref={(v) => setRefElement(v)}
        onMouseEnter={() => toggle(true)}
        onMouseLeave={() => toggle(false)}
      >
        {children}
      </span>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={(v) => setPopperElement(v)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.1,
            }}
            style={styles.popper}
            {...attributes.popper}
          >
            <div
              className="arrow"
              ref={(v) => setArrowRef(v)}
              data-popper-arrow
            />
            <p className="text rounded-md border border-base-300 bg-base-100 px-2 py-1 text-xs">
              {title}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
