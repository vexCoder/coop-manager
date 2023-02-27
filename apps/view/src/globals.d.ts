// add global declarations here
import { ExtendWindow } from "@coop/window/types/preload";

declare global {
  interface Window extends ExtendWindow {}
}

export {}