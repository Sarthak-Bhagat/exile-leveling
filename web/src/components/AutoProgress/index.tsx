import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { characterLevelAtom } from "../../state/character-level";
import { activeEdgeAtom } from "../../state/route";
import { type Id, toast } from "react-toastify";
import useWebSocket, { ReadyState } from "react-use-websocket-lite";
import React from "react";

const AUTO_PROGRESS_URL = "ws://localhost:6754";

export function useAutoProgress() {
  const write = useSetAtom(activeEdgeAtom);
  const setCharacterLevel = useSetAtom(characterLevelAtom);
  const { readyState } = useWebSocket({
    url: AUTO_PROGRESS_URL,
    shouldReconnect: true,
    reconnectInterval: 1000,
    onMessage(event) {
      if (typeof event.data === "string") {
        write(event.data);

        const matches =
          /^\S+ \S+ \d+ \S+ \[INFO Client \d+\] : \S+ \(\S+\) is now level (\d+)$/.exec(
            event.data,
          );
        if (matches !== null) setCharacterLevel(Number(matches[1]));
      }
    },
  });

  const toastId = React.useRef<Id | null>(null);

  useEffect(() => {
    if (readyState == ReadyState.CONNECTING) {
      if (toastId.current === null || !toast.isActive(toastId.current)) {
        toastId.current = toast("");
      }

      toast.update(toastId.current, {
        render: "Setup Auto-Progress",
        type: "info",
        onClick: () => {
          window.open(
            "https://github.com/HeartofPhos/exile-log-api/releases",
            "_blank",
          );
        },
        style: { cursor: "pointer" },
        autoClose: false,
        closeOnClick: false,
        closeButton: null,
      });
    } else {
      if (toastId.current === null || !toast.isActive(toastId.current)) {
        toastId.current = toast("");
      }

      toast.update(toastId.current, {
        render: "Auto-Progress Connected",
        type: "success",
        onClick: null,
        autoClose: null,
        closeOnClick: null,
        closeButton: null,
      });
    }
  }, [readyState]);
}
