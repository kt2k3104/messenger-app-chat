import PusherClient from "pusher-js";

export const pusherClient = new PusherClient("7e50edbcfc264bcd43a1", {
  cluster: "ap1",
  channelAuthorization: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "x-client-id": localStorage.getItem("userId"),
    },
    endpoint: "http://localhost:9900/api/v1/auth/pusher",
    transport: "ajax",
  },
});
