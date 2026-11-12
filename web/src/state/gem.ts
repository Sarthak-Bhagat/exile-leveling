import { RESET } from "jotai/utils";
import { gemProgressFamily } from "./gem-progress";
import type { RouteData } from "common";
import { atom } from "jotai";
import { persistentAtom } from ".";
import { DEFAULT_POB } from "./pob/default";

const REQUIRED_GEMS_VERSION = 0;

const requiredGemsAtom = persistentAtom<RouteData.RequiredGem[]>(
  "required-gems",
  DEFAULT_POB?.requiredGems ?? [],
  REQUIRED_GEMS_VERSION,
);

export const requiredGemsSelector = atom(
  (get) => {
    return get(requiredGemsAtom);
  },
  (_get, set, newValue: RouteData.RequiredGem[] | typeof RESET) => {
    set(requiredGemsAtom, newValue);

    if (newValue === RESET) {
      set(gemProgressFamily.clear);
    }
  },
);
