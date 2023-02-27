import {
  IconArrowLeft,
  IconArrowRight,
  IconMaximize,
  IconMinus,
  IconX,
} from "@tabler/icons-react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};
export const Title = ({}: Props) => {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleForward = useCallback(() => {
    navigate(1);
  }, [navigate]);

  return (
    <div className="sticky top-0 z-50 flex items-center justify-end gap-2 border-b border-b-base-200 bg-base-100 py-1 pr-1 pl-2">
      <button
        className="btn-ghost btn-square btn-xs btn"
        type="button"
        onClick={handleBack}
      >
        <IconArrowLeft className="h-4 w-4" />
      </button>
      <button
        className="btn-ghost btn-square btn-xs btn"
        type="button"
        onClick={handleForward}
      >
        <IconArrowRight className="h-4 w-4" />
      </button>
      <p className="flex-grow text-xs">{document.title}</p>
      <button className="btn-ghost btn-square btn-xs btn" type="button">
        <IconMinus className="h-4 w-4" />
      </button>
      <button className="btn-ghost btn-square btn-xs btn" type="button">
        <IconMaximize className="h-4 w-4" />
      </button>
      <button
        className="btn-ghost btn-square btn-xs btn text-error"
        type="button"
      >
        <IconX className="h-4 w-4" />
      </button>
    </div>
  );
};
