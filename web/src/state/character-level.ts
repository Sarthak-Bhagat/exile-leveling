import { persistentAtom } from ".";

const CHARACTER_LEVEL_VERSION = 0;
const characterLevelAtom = persistentAtom<number | null>(
  "character-level",
  null,
  CHARACTER_LEVEL_VERSION,
);

// First tree whose name level is at or above the character level, else the last one
function levelTreeIndex(treeNames: string[], level: number): number | null {
  let index: number | null = null;
  for (let i = 0; i < treeNames.length; i++) {
    const matches = /lvl\s*(\d+)/i.exec(treeNames[i]);
    if (matches === null) continue;

    index = i;
    if (Number(matches[1]) >= level) break;
  }

  return index;
}

export { characterLevelAtom, levelTreeIndex };
