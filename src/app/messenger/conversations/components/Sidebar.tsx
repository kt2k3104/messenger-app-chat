"use client";
import { Box, VStack, keyframes } from "@chakra-ui/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useUserInfo, { Conversation, UserInfoState } from "~/hooks/useUserInfo";
import requestApi from "~/utils/api";
import { pusherClient } from "~/utils/pusher";

function Sidebar() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const userId = useUserInfo((state: UserInfoState) => state.basicUserInfo)
    ?._id;

  useEffect(() => {
    const getAllConversations = async () => {
      const { data } = await requestApi("conversations", "GET", null);
      setConversations(data.metadata);
    };
    getAllConversations();
  }, [userId]);

  useEffect(() => {
    if (!pusherClient || !userId) return;

    pusherClient.subscribe("6576bf7eab2daeb2de76e5c7");

    pusherClient.bind("conversation:new", (data: any) => {
      setConversations((conversations) => [...conversations, data]);
    });

    return () => {
      pusherClient.unsubscribe("6576bf7eab2daeb2de76e5c7");
      pusherClient.unbind("conversation:new");
    };
  }, [userId]);

  return (
    <VStack>
      {conversations &&
        conversations?.map((conversation) => {
          return (
            <Link
              href={`/messenger/conversations/${conversation._id}`}
              passHref
              key={conversation._id}
            >
              {conversation.name}
            </Link>
          );
        })}
    </VStack>
  );
}

export default Sidebar;
