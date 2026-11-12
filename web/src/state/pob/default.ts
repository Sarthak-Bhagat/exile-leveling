import defaultBuild from "./default-build.txt?raw";
import { processPob } from "./process";

export const DEFAULT_POB_CODE = defaultBuild.trim();

export const DEFAULT_POB = processPob(DEFAULT_POB_CODE);
