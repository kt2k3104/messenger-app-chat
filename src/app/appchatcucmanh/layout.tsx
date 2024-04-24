"use client";

import {
  Box,
  Button,
  HStack,
  Spinner,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import SideBar from "./Sidebar";
import useUserInfo, { UserInfoState } from "~/hooks/useUserInfo";
import usePusher, { PusherState } from "~/hooks/usePusher";
import useLogic, { LogicState } from "~/hooks/useLogic";
import requestApi from "~/utils/api";
import useConversations, { ConversationsState } from "~/hooks/useConversations";

enum FriendTag {
  ADD_FRIEND = "add-friend",
  ACCEPT_FRIEND_REQUEST = "accept-friend-request",
  REMOVE_FRIEND = "remove-friend",
  CANCEL_FRIEND_REQUEST = "cancel-friend-request",
}

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoaddingConversations, setIsLoaddingConversations] = useState(true);

  const pusherClient = usePusher((state: PusherState) => state.pusherClient);
  const userId = useUserInfo((state: UserInfoState) => state.userInfo?._id);
  const friendRequests = useUserInfo(
    (state: UserInfoState) => state.friendRequests
  );
  const addFriendRequest = useUserInfo(
    (state: UserInfoState) => state.addFriendRequest
  );
  const removeFriendRequest = useUserInfo(
    (state: UserInfoState) => state.removeFriendRequest
  );
  const addFriend = useUserInfo((state: UserInfoState) => state.addFriend);
  const removeFriend = useUserInfo(
    (state: UserInfoState) => state.removeFriend
  );
  const notSeenMessages = useLogic(
    (state: LogicState) => state.notSeenMessages
  );
  const setNotSeenMessage = useLogic(
    (state: LogicState) => state.setNotSeenMessage
  );
  const conversations = useConversations(
    (state: ConversationsState) => state.conversations
  );

  const { colorMode, toggleColorMode } = useColorMode();
  const bgBody = useColorModeValue("#adb5bd", "#36393d");
  const bg = useColorModeValue("#fff", "#1c1e21");

  useEffect(() => {
    if (conversations.length > 0) {
      setIsLoaddingConversations(false);
    }
  }, [conversations]);

  useEffect(() => {
    if (!pusherClient || !userId) return;
    const channel = pusherClient.subscribe(userId);

    channel.bind("friend:request", (data: any) => {
      console.log(data);
      if (data.tag === FriendTag.ADD_FRIEND) {
        addFriendRequest(data.userInfo);
      }
      if (data.tag === FriendTag.CANCEL_FRIEND_REQUEST) {
        removeFriendRequest(data.friendId);
      }
      if (data.tag === FriendTag.ACCEPT_FRIEND_REQUEST) {
        addFriend(data.newFriend);
      }
      if (data.tag === FriendTag.REMOVE_FRIEND) {
        removeFriend(data.friendId);
      }
    });

    return () => {
      pusherClient.unsubscribe(userId);
      channel.unbind_all();
    };
  }, [
    pusherClient,
    userId,
    friendRequests,
    addFriendRequest,
    removeFriendRequest,
    addFriend,
    removeFriend,
  ]);

  useEffect(() => {
    const callApiGetNotSeenMessages = async () => {
      const res: any = await requestApi(
        "conversations/not-seen/message",
        "GET",
        {}
      );
      setNotSeenMessage(res.data.metadata);
    };
    callApiGetNotSeenMessages();
  }, [setNotSeenMessage]);

  useEffect(() => {
    if (colorMode === "light") {
      toggleColorMode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      w="100vw"
      h="100vh"
      p="20px"
      bgColor={bgBody}
      position="relative"
      gap="0"
      overflow="hidden"
    >
      <HStack
        w="100%"
        h="100%"
        borderRadius="20px"
        bgColor={bg}
        gap="0"
        overflow="hidden"
        justifyContent={isLoaddingConversations ? "center" : ""}
      >
        {isLoaddingConversations ? (
          <Spinner />
        ) : (
          <>
            <SideBar />
            {children}
          </>
        )}
      </HStack>
      <Button
        position="absolute"
        top="5px"
        left="5px"
        w="5px"
        h="5px"
        borderRadius="50%"
        bgColor={colorMode === "light" ? "#000" : "#fff"}
        onClick={toggleColorMode}
      >
        toggle
      </Button>
    </Box>
  );
}
