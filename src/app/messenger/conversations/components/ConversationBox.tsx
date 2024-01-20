"use client";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { TfiMoreAlt } from "react-icons/tfi";

import useConversations, { ConversationsState } from "~/hooks/useConversations";
import useLogic, { LogicState } from "~/hooks/useLogic";
import useUserInfo, { Conversation, UserInfoState } from "~/hooks/useUserInfo";
import ThumbConversation from "./ThumbConversation";
import { useMemo } from "react";

export const convertTime = (created_at: string) => {
  const createdAtDate: Date = new Date(created_at);
  const currentTime: Date = new Date();
  const timeDifference = Number(currentTime) - Number(createdAtDate) + 4000;
  const secondsDifference = Math.floor(timeDifference / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);
  const hoursDifference = Math.floor(minutesDifference / 60);
  const daysDifference = Math.floor(hoursDifference / 24);

  if (secondsDifference < 10) return "Vừa xong";
  if (secondsDifference >= 10 && secondsDifference < 60)
    return `${secondsDifference} giây`;
  if (minutesDifference < 60) return `${minutesDifference} phút`;
  if (hoursDifference < 24) return `${hoursDifference} giờ`;
  if (daysDifference >= 1) return `${daysDifference} ngày`;
};

function ConversationBox({ conversation }: { conversation: Conversation }) {
  const setCurrConversation = useConversations(
    (state: ConversationsState) => state.setCurrConversation
  );
  const isShowBoxNewConversation = useLogic(
    (state: LogicState) => state.isShowBoxNewConversation
  );
  const setIsShowBoxNewConversation = useLogic(
    (state: LogicState) => state.setIsShowBoxNewConversation
  );
  const waitingForAddedToGroup = useLogic(
    (state: LogicState) => state.waitingForAddedToGroup
  );
  const currConversation = useConversations(
    (state: ConversationsState) => state.currConversation
  );
  const userId = useUserInfo((state: UserInfoState) => state.userInfo)?._id;
  const lastMessage = conversation.messages[conversation.messages.length - 1];

  const checkSeenMessage = useMemo(() => {
    if (!lastMessage) return false;

    if (lastMessage.sender._id === userId) return true;

    return (
      lastMessage.seenUsers.findIndex((user) => user._id === userId) !== -1
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMessage]);

  return (
    <Link
      style={{ width: "100%" }}
      href={`/messenger/conversations/${conversation._id}`}
      passHref
      key={conversation._id}
      onClick={() => {
        setCurrConversation(conversation);
        if (isShowBoxNewConversation && waitingForAddedToGroup.length === 0)
          setIsShowBoxNewConversation(false);
      }}
    >
      <HStack
        alignItems="center"
        justifyContent="flex-start"
        _hover={{
          bgColor: "bgLightActive.100",
        }}
        bgColor={
          conversation._id === currConversation?._id
            ? "bgLightActive.100"
            : "transparent"
        }
        p="10px"
        mr="6px"
        borderRadius="10px"
        role="group"
      >
        <ThumbConversation conversation={conversation} size="md" />
        <VStack alignItems="center" gap="0">
          <Text
            display={{ base: "none", lg: "inline" }}
            fontWeight="500"
            mr="auto"
          >
            {conversation.isGroup
              ? conversation.name
              : conversation.members[0]._id === userId
              ? conversation.members[1]?.displayName
              : conversation.members[0].displayName}
          </Text>
          {conversation.messages.length > 0 && (
            <HStack
              display={{ base: "none", lg: "flex" }}
              color="textSecond.100"
              fontWeight={checkSeenMessage ? "400" : "bold"}
              fontSize="1.2rem"
              maxH="180px"
              mr="auto"
            >
              <Text
                fontSize="1.2rem"
                maxW="160px"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {conversation.messages[conversation.messages.length - 1].sender
                  ._id === userId
                  ? "Bạn"
                  : conversation.messages[conversation.messages.length - 1]
                      .sender.firstName}
                :{" "}
                {
                  conversation.messages[conversation.messages.length - 1]
                    .content
                }
              </Text>
              <Text fontSize="1.2rem">
                ·
                {convertTime(
                  conversation.messages[conversation.messages.length - 1]
                    .createdAt
                )}
              </Text>
            </HStack>
          )}
        </VStack>
        <Button
          w="32px"
          h="32px"
          borderRadius="50%"
          boxShadow="0 0 0 1px rgba(0,0,0,0.1)"
          ml="auto"
          alignItems="center"
          display="none"
          _groupHover={{
            display: { base: "none", lg: "flex" },
          }}
          fontSize="24px"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <TfiMoreAlt />
        </Button>
      </HStack>
    </Link>
  );
}

export default ConversationBox;
