// "use client";
import { create } from "zustand";
import PusherClient from "pusher-js";
import { NEXT_PUBLIC_API_URL } from "~/const";

export interface PusherState {
  pusherClient: PusherClient | null;
  setPusherClient: (accessToken: string, userId: string) => void;
}

const usePusher = create<PusherState>((set) => ({
  pusherClient: null,
  setPusherClient: (accessToken: string, userId: string) => {
    const pusher = new PusherClient("7e50edbcfc264bcd43a1", {
      cluster: "ap1",
      channelAuthorization: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "x-client-id": userId,
        },
        // endpoint: `${process.env.NEXT_PUBLIC_API_URL}auth/pusher`,
        endpoint: `${NEXT_PUBLIC_API_URL}auth/pusher`,
        transport: "ajax",
      },
    });

    set({ pusherClient: pusher });
  },
}));
export default usePusher;
