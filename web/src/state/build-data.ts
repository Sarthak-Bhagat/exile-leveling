import { persistentAtom } from ".";
import { DEFAULT_POB } from "./pob/default";
import type { RouteData } from "common";

const BUILD_DATA_VERSION = 3;

export const buildDataSelector = persistentAtom<RouteData.BuildData>(
  "build-data",
  DEFAULT_POB?.buildData ?? {
    characterClass: "None",
    bandit: "Alira",
    leagueStart: true,
    library: true,
  },
  BUILD_DATA_VERSION,
);
