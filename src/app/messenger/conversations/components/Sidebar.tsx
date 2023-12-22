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
import { useEffect, useState } from "react";

import useConversations, { ConversationsState } from "~/hooks/useConversations";
import useUserInfo, { Conversation, UserInfoState } from "~/hooks/useUserInfo";
// import initPusherCLient from "~/utils/pusher";
// import { pusherClient } from "~/utils/pusher";
import usePusher, { PusherState } from "~/hooks/usePusher";

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
  const pusherClient = usePusher((state: PusherState) => state.pusherClient);
  const [isShowBoxNewConversation, setIsShowBoxNewConversation] =
    useState<Boolean>(false);
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
    // let pusherClient: any = null;
    // const accessToken = localStorage.getItem("accessToken") || "";
    // if (accessToken && userId) {
    //   pusherClient = initPusherCLient(accessToken, userId);
    // } else return;

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

  // useEffect(() => {
  //   // let pusherClient: any = null;
  //   // const accessToken = localStorage.getItem("accessToken") || "";
  //   // if (accessToken && userId) {
  //   //   pusherClient = initPusherCLient(accessToken, userId);
  //   // } else return;

  //   if (!pusherClient || !userId) return;
  //   pusherClient.subscribe(userId);

  //   pusherClient.bind("conversation:new", (data: Conversation) => {
  //     pushConversation(data);
  //   });

  //   return () => {
  //     pusherClient?.unsubscribe(userId);
  //     pusherClient?.unbind("conversation:new");
  //   };
  // }, [userId, pusherClient]);

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
          bgColor="bgLightActive.100"
          p="10px"
          mr="6px"
          borderRadius="10px"
          role="group"
          w="100%"
        >
          <Img
            src="/images/no-image.png"
            alt="avt"
            w="48px"
            h="48px"
            borderRadius="50%"
            mr="5px"
          />
          <VStack alignItems="center" gap="0">
            <Text fontWeight="500" mr="auto">
              Tin nhắn mới
            </Text>
          </VStack>
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
              setIsShowBoxNewConversation(false);
              if (currConversation) {
                router.push(
                  `/messenger/conversations/${currConversation?._id}`
                );
              } else router.push("/messenger/conversations");
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
                if (isShowBoxNewConversation)
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
                  conversation._id === currConversation?._id &&
                  !isShowBoxNewConversation
                    ? "bgLightActive.100"
                    : "transparent"
                }
                p="10px"
                mr="6px"
                borderRadius="10px"
                role="group"
              >
                <Img
                  src={
                    conversation.thumb
                      ? conversation.thumb
                      : "/images/no-image.png"
                  }
                  alt="avt"
                  w="48px"
                  h="48px"
                  borderRadius="50%"
                  mr="5px"
                />
                <VStack alignItems="center" gap="0">
                  <Text
                    display={{ base: "none", lg: "inline" }}
                    fontWeight="500"
                    mr="auto"
                  >
                    {conversation.isGroup
                      ? conversation.name
                      : conversation.members[0]._id === userId
                      ? conversation.members[1].displayName
                      : conversation.members[0].displayName}
                  </Text>
                  {conversation.messages.length > 0 && (
                    <Text
                      display={{ base: "none", lg: "inline" }}
                      color="textSecond.100"
                      fontWeight="300"
                      fontSize="1.2rem"
                      maxH="180px"
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
