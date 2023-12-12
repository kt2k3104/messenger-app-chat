"use client";

import PusherClient from "pusher-js";

const accessToken = localStorage.getItem("accessToken") || "";
const userId = localStorage.getItem("userId") || "";

export const pusherClient = new PusherClient("7e50edbcfc264bcd43a1", {
  cluster: "ap1",
  channelAuthorization: {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "x-client-id": `${userId}`,
    },
    endpoint: "http://localhost:9900/api/v1/auth/pusher",
    transport: "ajax",
  },
});
