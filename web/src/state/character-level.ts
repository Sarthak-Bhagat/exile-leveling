import { persistentAtom } from ".";
import { atom } from "jotai";

const CHARACTER_LEVEL_VERSION = 0;
const characterLevelAtom = persistentAtom<number | null>(
  "character-level",
  null,
  CHARACTER_LEVEL_VERSION,
);

const CHARACTER_NAME_VERSION = 0;
const characterNameAtom = persistentAtom<string>(
  "character-name",
  "",
  CHARACTER_NAME_VERSION,
);

// A new character reaching level 2 becomes the followed character, since others
// cannot be partied with before then. Otherwise only names starting with
// characterNameAtom are followed, any if it is empty
const characterLevelUpAtom = atom(null, (get, set, value: string) => {
  const matches =
    /^\S+ \S+ \d+ \S+ \[INFO Client \d+\] : (\S+) \(\S+\) is now level (\d+)$/.exec(
      value,
    );
  if (matches === null) return;

  const [, name, level] = matches;
  if (level === "2") set(characterNameAtom, name);
  else if (!name.startsWith(get(characterNameAtom).trim())) return;

  set(characterLevelAtom, Number(level));
});

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

export {
  characterLevelAtom,
  characterLevelUpAtom,
  characterNameAtom,
  levelTreeIndex,
};
