"use client";
import PusherClient from "pusher-js";
import { NEXT_PUBLIC_API_URL } from "~/const";

export const initPusherClient = (accessToken: string, userId: string) => {
  return new PusherClient("7e50edbcfc264bcd43a1", {
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
};
