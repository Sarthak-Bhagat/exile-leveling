import { characterNameAtom } from "../../state/character-level";
import { formStyles } from "../../styles";
import { SplitRow } from "../SplitRow";
import styles from "./styles.module.css";
import classNames from "classnames";
import type { RouteData } from "common";
import { useAtom } from "jotai";

interface BuildInfoFormProps {
  buildData: RouteData.BuildData;
  onSubmit: (buildData: RouteData.BuildData) => void;
}

export function BuildInfoForm({ buildData, onSubmit }: BuildInfoFormProps) {
  const [characterName, setCharacterName] = useAtom(characterNameAtom);

  return (
    <div className={classNames(styles.form)}>
      <SplitRow
        left={<div className={classNames(styles.label)}>Class</div>}
        right={
          <div className={classNames(styles.value)}>
            {buildData.characterClass}
          </div>
        }
      />
      <SplitRow
        left={<div className={classNames(styles.label)}>Bandits</div>}
        right={
          <div className={classNames(styles.value)}>
            {buildData.bandit == "None" ? "Kill All" : buildData.bandit}
          </div>
        }
      />
      <SplitRow
        left={<div className={classNames(styles.label)}>League Start</div>}
        right={
          <div className={classNames(styles.value)}>
            <input
              type="checkbox"
              checked={buildData.leagueStart}
              onChange={(evt) => {
                onSubmit({
                  ...buildData,
                  leagueStart: evt.target.checked,
                });
              }}
              aria-label="League Start"
            />
          </div>
        }
      />
      <SplitRow
        left={<div className={classNames(styles.label)}>Library</div>}
        right={
          <div className={classNames(styles.value)}>
            <input
              type="checkbox"
              checked={buildData.library}
              onChange={(evt) => {
                onSubmit({
                  ...buildData,
                  library: evt.target.checked,
                });
              }}
              aria-label="Library"
            />
          </div>
        }
      />
      <SplitRow
        left={<div className={classNames(styles.label)}>Character</div>}
        right={
          <div className={classNames(styles.value)}>
            <input
              className={classNames(formStyles.formInput)}
              value={characterName}
              placeholder="Any"
              title="Level ups move the tree and gems only for names starting with this. Set by a new character reaching level 2"
              onChange={(evt) => setCharacterName(evt.target.value)}
              aria-label="Character"
            />
          </div>
        }
      />
    </div>
  );
}
