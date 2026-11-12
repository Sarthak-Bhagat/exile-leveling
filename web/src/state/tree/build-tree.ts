import type { RouteData } from "common";
import { persistentAtom } from "..";
import { DEFAULT_POB } from "../pob/default";

const BUILD_PASSIVE_TREES_VERSION = 0;
export const buildTreesSelector = persistentAtom<RouteData.BuildTree[] | null>(
  "build-trees",
  DEFAULT_POB?.buildTrees ?? null,
  BUILD_PASSIVE_TREES_VERSION,
);
