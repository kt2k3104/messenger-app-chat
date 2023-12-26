"use client";
import {
  Box,
  Button,
  HStack,
  Img,
  Input,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { TfiMoreAlt } from "react-icons/tfi";
import { IoMdClose } from "react-icons/io";

import CustomIcons from "~/app/components/Icon";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import useConversations, { ConversationsState } from "~/hooks/useConversations";
import useUserInfo, { Conversation, UserInfoState } from "~/hooks/useUserInfo";
import usePusher, { PusherState } from "~/hooks/usePusher";
import useLogic, { LogicState } from "~/hooks/useLogic";
import ThumbConversation from "./ThumbConversation";
import { set } from "react-hook-form";

function Sidebar() {
  const conversations = useConversations(
    (state: ConversationsState) => state.conversations
  );
  const pushConversation = useConversations(
    (state: ConversationsState) => state.pushConversation
  );
  const updateConversation = useConversations(
    (state: ConversationsState) => state.updateConversations
  );
  const userId = useUserInfo((state: UserInfoState) => state.basicUserInfo)
    ?._id;
  const setCurrConversation = useConversations(
    (state: ConversationsState) => state.setCurrConversation
  );
  const currConversation = useConversations(
    (state: ConversationsState) => state.currConversation
  );
  const waitingForAddedToGroup = useLogic(
    (state: LogicState) => state.waitingForAddedToGroup
  );
  const isShowBoxNewConversation = useLogic(
    (state: LogicState) => state.isShowBoxNewConversation
  );
  const setIsShowBoxNewConversation = useLogic(
    (state: LogicState) => state.setIsShowBoxNewConversation
  );
  const setWaitingForAddedToGroup = useLogic(
    (state: LogicState) => state.setWaitingForAddedToGroup
  );

  const pusherClient = usePusher((state: PusherState) => state.pusherClient);

  const router = useRouter();
  const bgButton = useColorModeValue("#f5f5f5", "#ffffff1a");

  const convertTime = (created_at: string) => {
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

  useEffect(() => {
    if (!pusherClient || !userId) return;
    pusherClient.subscribe(userId);

    pusherClient.bind("conversation:new", (data: Conversation) => {
      pushConversation(data);
    });
    pusherClient.bind("conversation:update", (data: any) => {
      console.log("DATA", data);
      updateConversation(data);
    });
    return () => {
      pusherClient?.unsubscribe(userId);
      pusherClient?.unbind("conversation:new");
      pusherClient?.unbind("conversation:update");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, pusherClient]);

  return (
    <VStack p="0 6px">
      <HStack
        display={{ base: "none", lg: "flex" }}
        w="100%"
        h="49px"
        justifyContent="space-between"
      >
        <Text
          fontSize="24px"
          fontWeight="700"
          lineHeight="28px"
          ml="18px"
          mt="5px"
        >
          Đoạn chat
        </Text>
        <Button
          borderRadius="50%"
          w="36px"
          h="36px"
          mt="6px"
          mr="10px"
          bgColor={bgButton}
          onClick={() => {
            router.push("/messenger/conversations/new");
            setIsShowBoxNewConversation(true);
            setCurrConversation(null);
          }}
        >
          <CustomIcons.icon_add_conversation />
        </Button>
      </HStack>
      <HStack
        as="form"
        w={{ base: "55px", lg: "320px" }}
        h="36px"
        m={{ base: "7px 16px 12px", lg: "0 16px 12px" }}
        pl={{ base: "8px", lg: "15px" }}
        justifyContent="center"
        bgColor="bgLightActive.100"
        borderRadius="999px"
      >
        <CustomIcons.icon_search />
        <Input
          w="290px"
          bgColor="transparent"
          outline="none"
          border="none"
          p="0px"
          fontSize="1.4rem"
          display={{ base: "none", lg: "inline" }}
          _placeholder={{
            fontWeight: 300,
            fontSize: "1.5rem",
          }}
          placeholder="Tìm kiếm trên Messenger"
        />
        <Input
          w="18px"
          bgColor="transparent"
          outline="none"
          border="none"
          p="0px"
          fontSize="1.4rem"
          display={{ base: "inline", lg: "none" }}
          _placeholder={{
            fontWeight: 300,
            fontSize: "1.5rem",
          }}
          placeholder=""
        />
      </HStack>
      {isShowBoxNewConversation && (
        <HStack
          alignItems="center"
          justifyContent="flex-start"
          _hover={{
            bgColor: "bgLightActive.100",
          }}
          bgColor={!currConversation ? "bgLightActive.100" : "transparent"}
          p="10px"
          mr="6px"
          borderRadius="10px"
          role="group"
          w="100%"
          cursor="pointer"
          onClick={() => {
            router.push("/messenger/conversations/new");
            setCurrConversation(null);
          }}
        >
          {waitingForAddedToGroup.length < 2 && (
            <Img
              src={
                waitingForAddedToGroup[0]?.avatar
                  ? waitingForAddedToGroup[0]?.avatar
                  : "/images/no-image.png"
              }
              alt="avt"
              w="48px"
              h="48px"
              borderRadius="50%"
              mr="5px"
            />
          )}
          {waitingForAddedToGroup.length > 1 && (
            <Box w="48px" h="48px" mr="5px" position="relative">
              <Img
                src={
                  waitingForAddedToGroup[0].avatar
                    ? waitingForAddedToGroup[0].avatar
                    : "/images/no-image.png"
                }
                alt="avt"
                w="32px"
                h="32px"
                borderRadius="50%"
                position="absolute"
                bottom="0"
                left="0"
              />
              <Img
                src={
                  waitingForAddedToGroup[1].avatar
                    ? waitingForAddedToGroup[1].avatar
                    : "/images/no-image.png"
                }
                alt="avt"
                w="32px"
                h="32px"
                borderRadius="50%"
                position="absolute"
                top="0"
                right="0"
                zIndex="0"
              />
            </Box>
          )}
          <Text
            fontWeight="500"
            mr="auto"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            flex="1"
          >
            Tin nhắn mới{" "}
            {waitingForAddedToGroup.length > 0 &&
              `đến ${waitingForAddedToGroup[0].displayName}`}
            {waitingForAddedToGroup.length > 1 &&
              waitingForAddedToGroup.map((user, index) => {
                if (index === 0) return;
                if (index === 1 && waitingForAddedToGroup.length === 2)
                  return ` và ${user.displayName}`;
                return `, ${user.displayName}`;
              })}
          </Text>
          <Button
            w="24px"
            h="24px"
            borderRadius="50%"
            boxShadow="0 0 0 1px rgba(0,0,0,0.1)"
            ml="auto"
            alignItems="center"
            display="none"
            _groupHover={{
              display: "flex",
            }}
            fontSize="16px"
            p="0"
            bgColor="transparent"
            onClick={(e) => {
              e.stopPropagation();
              setWaitingForAddedToGroup([]);
              setIsShowBoxNewConversation(false);
              if (currConversation) {
                router.push(`/messenger/conversations/${currConversation._id}`);
              } else {
                setCurrConversation(conversations[0]);
                router.push(
                  `/messenger/conversations/${conversations[0]?._id}`
                );
              }
            }}
          >
            <IoMdClose />
          </Button>
        </HStack>
      )}
      {conversations &&
        conversations?.map((conversation) => {
          return (
            <Link
              style={{ width: "100%" }}
              href={`/messenger/conversations/${conversation._id}`}
              passHref
              key={conversation._id}
              onClick={() => {
                setCurrConversation(conversation);
                if (
                  isShowBoxNewConversation &&
                  waitingForAddedToGroup.length === 0
                )
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
                    <Text
                      display={{ base: "none", lg: "inline" }}
                      color="textSecond.100"
                      fontWeight="300"
                      fontSize="1.2rem"
                      maxH="180px"
                      mr="auto"
                    >
                      {conversation.messages[conversation.messages.length - 1]
                        .sender._id === userId
                        ? "Bạn: "
                        : conversation.messages[
                            conversation.messages.length - 1
                          ].sender.firstName}
                      :{" "}
                      {
                        conversation.messages[conversation.messages.length - 1]
                          .content
                      }{" "}
                      ·{" "}
                      {convertTime(
                        conversation.messages[conversation.messages.length - 1]
                          .createdAt
                      )}
                    </Text>
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
        })}
      {conversations?.length === 0 && !isShowBoxNewConversation && (
        <Text>Không có cuộc trò chuyện nào</Text>
      )}
    </VStack>
  );
}

export default Sidebar;
