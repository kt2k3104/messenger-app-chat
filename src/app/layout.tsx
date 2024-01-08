"use client";

import { Providers } from "./providers";
import { useEffect } from "react";
import useUserInfo, { UserInfoState } from "~/hooks/useUserInfo";
import requestApi from "~/utils/api";
import useConversations, { ConversationsState } from "~/hooks/useConversations";
import { useRouter } from "next/navigation";
import InitPusher from "./components/InitPusher";
import ActiveStatus from "./messenger/conversations/components/ActiveStatus";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const setFriends = useUserInfo((state: UserInfoState) => state.setFriends);
  const setFriendRequests = useUserInfo(
    (state: UserInfoState) => state.setFriendRequests
  );
  const setStrangeUsers = useUserInfo(
    (state: UserInfoState) => state.setStrangeUsers
  );
  const setUserInfo = useUserInfo((state: UserInfoState) => state.setUserInfo);
  const setConversation = useConversations(
    (state: ConversationsState) => state.setConversations
  );
  const setCurrConversation = useConversations(
    (state: ConversationsState) => state.setCurrConversation
  );

  const router = useRouter();

  useEffect(() => {
    const initLogin = async () => {
      try {
        const access_token = localStorage.getItem("accessToken");
        const userId = localStorage.getItem("userId");
        if (access_token && userId) {
          const { data: usersData } = await requestApi("users/me", "GET", null);
          setUserInfo({
            firstName: usersData.metadata.firstName,
            lastName: usersData.metadata.lastName,
            avatar: usersData.metadata.avatar,
            _id: usersData.metadata._id,
            displayName: usersData.metadata.displayName,
            email: usersData.metadata.email,
          });
          setFriends(usersData.metadata.friends);
          setFriendRequests(usersData.metadata.friendRequests);
          setStrangeUsers(usersData.metadata.strangers);
          const { data: conversationsData } = await requestApi(
            "conversations",
            "GET",
            null
          );
          setConversation(conversationsData.metadata);
          conversationsData.metadata[0] &&
            setCurrConversation(conversationsData.metadata[0]);

          router.push(
            "/messenger/conversations/" + conversationsData.metadata[0]._id
          );
        }
      } catch (error) {
        console.log(error);
        localStorage.removeItem("accessToken");
      }
    };
    initLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    document.title = "Messenger";
  }, []);
  return (
    <html lang="en">
      <body>
        <InitPusher />
        <ActiveStatus />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
