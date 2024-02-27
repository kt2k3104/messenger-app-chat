// "use client";
import PusherClient from "pusher-js";
import { NEXT_PUBLIC_PUSHER_CLUSTER, NEXT_PUBLIC_PUSHER_KEY } from "~/app/env";

export const pusherClient = new PusherClient(
  // process.env.NEXT_PUBLIC_PUSHER_KEY as string,
  NEXT_PUBLIC_PUSHER_KEY as string,
  {
    cluster: NEXT_PUBLIC_PUSHER_CLUSTER as string,
    // cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
    // channelAuthorization: {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //     "x-client-id": userId,
    //   },
    //   // endpoint: `${process.env.NEXT_PUBLIC_API_URL}auth/pusher`,
    //   endpoint: `${NEXT_PUBLIC_API_URL}auth/pusher`,
    // transport: "ajax",
    // },
  }
);

// const initPusherCLient = (accessToken: string, userId: string) => {
//   return new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
//     cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
//     channelAuthorization: {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "x-client-id": userId,
//       },
//       endpoint: `${process.env.NEXT_PUBLIC_API_URL}auth/pusher`,
//       transport: "ajax",
//     },
//   });
// };
// export default initPusherCLient;
