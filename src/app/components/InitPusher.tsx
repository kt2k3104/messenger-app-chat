"use client";

import { useEffect } from "react";
import usePusher, { PusherState } from "~/hooks/usePusher";

function InitPusher() {
  const setPusherClient = usePusher(
    (state: PusherState) => state.setPusherClient
  );
  useEffect(() => {
    if (typeof window !== "undefined") {
      const access_token = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("userId");

      if (!access_token || !userId) return;

      setPusherClient(access_token, userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default InitPusher;
