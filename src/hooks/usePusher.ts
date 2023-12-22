import { create } from "zustand";
import PusherClient from "pusher-js";

export interface PusherState {
  pusherClient: PusherClient | null;
  setPusherClient: (accessToken: string, userId: string) => void;
}

const usePusher = create<PusherState>((set) => ({
  pusherClient: null,
  setPusherClient: (accessToken: string, userId: string) => {
    const pusherClient = new PusherClient(
      process.env.NEXT_PUBLIC_PUSHER_KEY as string,
      {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
        channelAuthorization: {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "x-client-id": userId,
          },
          endpoint: `${process.env.NEXT_PUBLIC_API_URL}auth/pusher`,
          transport: "ajax",
        },
      }
    );
    return set({ pusherClient });
  },
}));

export default usePusher;
