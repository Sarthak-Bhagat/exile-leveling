import { persistentAtom } from ".";
import { DEFAULT_POB } from "./pob/default";
import type { RouteData } from "common";

const GEM_LINKS_VERSION = 0;

export const gemLinksSelector = persistentAtom<RouteData.GemLinkGroup[]>(
  "gem-links",
  DEFAULT_POB?.gemLinks ?? [],
  GEM_LINKS_VERSION,
);
