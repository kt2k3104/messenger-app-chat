"use client";

import {
  Box,
  Button,
  HStack,
  Input,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import _ from "lodash";
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { GrFilter } from "react-icons/gr";
import { IoEllipsisVertical } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";

import useConversations, { ConversationsState } from "~/hooks/useConversations";
import useLogic, { LogicState } from "~/hooks/useLogic";
import usePusher, { PusherState } from "~/hooks/usePusher";
import useUserInfo, { Conversation, UserInfoState } from "~/hooks/useUserInfo";
import ConversationBox from "./ConversationBox";

function SideBar() {
  let conversations = useConversations(
    (state: ConversationsState) => state.conversations
  );
  if (conversations)
    conversations = _.orderBy(conversations, ["lastMessageAt"], ["desc"]);
  const pusherClient = usePusher((state: PusherState) => state.pusherClient);
  const userId = useUserInfo((state: UserInfoState) => state.userInfo?._id);
  const pushConversation = useConversations(
    (state: ConversationsState) => state.pushConversation
  );
  const updateConversation = useConversations(
    (state: ConversationsState) => state.updateConversations
  );
  const updateCurrConversation = useConversations(
    (state: ConversationsState) => state.updateCurrConversation
  );
  const notSeenMessages = useLogic(
    (state: LogicState) => state.notSeenMessages
  );
  const AddNotSeenMessage = useLogic(
    (state: LogicState) => state.AddNotSeenMessage
  );
  const RemoveNotSeenMessage = useLogic(
    (state: LogicState) => state.RemoveNotSeenMessage
  );
  const isShowBoxNewConversation = useLogic(
    (state: LogicState) => state.isShowBoxNewConversation
  );
  const setIsShowBoxNewConversation = useLogic(
    (state: LogicState) => state.setIsShowBoxNewConversation
  );

  const bg = useColorModeValue("#e5e5e5", "#212427");
  const bgInput = useColorModeValue("#fff", "#1c1e21");

  useEffect(() => {
    if (!pusherClient || !userId) return;
    pusherClient.subscribe(userId);

    pusherClient.bind("conversation:new", (data: Conversation) => {
      pushConversation(data);
    });
    pusherClient.bind("conversation:update", (data: any) => {
      console.log(data);
      updateConversation(data);
      updateCurrConversation(data);
      if (
        !notSeenMessages.find((id) => id === data.conversationId) &&
        data.lastMessage.sender._id !== userId
      ) {
        AddNotSeenMessage(data.conversationId);
      }
      if (data.tag === "seen") {
        RemoveNotSeenMessage(data.conversationId);
      }
    });
    return () => {
      pusherClient?.unsubscribe(userId);
      pusherClient?.unbind("conversation:new");
      pusherClient?.unbind("conversation:update");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, pusherClient, notSeenMessages]);

  return (
    <Tabs w="360px" h="100%" position="relative" variant="unstyled">
      <TabList h="30px" mt="15px">
        <Tab fontSize="1rem">CHATS</Tab>
        <Tab fontSize="1rem">GROUP CHAT</Tab>
        <Tab fontSize="1rem">CONTACTS</Tab>
      </TabList>
      <TabIndicator
        mt="-1.5px"
        height="1px"
        bg="#db4663"
        pl="10px"
        borderRadius="1px"
      />
      <TabPanels
        bgColor={bg}
        borderTopLeftRadius="16px"
        borderBottomLeftRadius="16px"
        h="calc(100% - 60px)"
        mt="15px"
      >
        <TabPanel p="0" h="100%">
          <HStack p="15px 20px" justifyContent="space-between">
            <HStack gap="10px">
              <Text>All Messages</Text>
              <Button borderRadius="999px">{conversations.length}</Button>
              <Box
                fontSize="1.2rem"
                opacity=".5"
                _hover={{ opacity: 1, cursor: "pointer" }}
              >
                <FaAngleDown />
              </Box>
            </HStack>
            <HStack gap="10px">
              <Button
                w="36px"
                h="36px"
                borderRadius="50%"
                bgColor="transparent"
                p="0"
                fontSize="1.6rem"
                opacity=".5"
                // _hover={{
                //   opacity: 1,
                // }}
              >
                <GrFilter />
              </Button>
              <Button
                w="36px"
                h="36px"
                borderRadius="50%"
                bgColor="transparent"
                p="0"
                fontSize="1.6rem"
                opacity=".5"
                // _hover={{
                //   opacity: 1,
                // }}
              >
                <IoEllipsisVertical />
              </Button>
            </HStack>
          </HStack>
          <HStack
            as="form"
            h="40px"
            m="0 20px 2px"
            borderRadius="10px"
            p="5px 15px 5px 5px"
            bgColor={bgInput}
          >
            <Input
              border="none"
              _focusVisible={{
                outline: "none",
              }}
              placeholder="Search"
              _placeholder={{
                fontSize: "1.2rem",
              }}
              fontSize="1.2rem"
            />
            <FiSearch />
          </HStack>
          <Box
            h="calc(100% - 108px)"
            overflow="auto"
            sx={{
              "&::-webkit-scrollbar": {
                width: "0px",
              },
              "&::-webkit-scrollbar-track": {
                width: "0px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#1c1e21",
                borderRadius: "24px",
              },

              ":last-child": {
                borderBottomLeftRadius: "16px",
              },
            }}
          >
            {conversations &&
              conversations?.map((conversation) => {
                return (
                  <ConversationBox
                    key={conversation._id}
                    conversation={conversation}
                  />
                );
              })}
            {conversations?.length === 0 && !isShowBoxNewConversation && (
              <Text>Không có cuộc trò chuyện nào</Text>
            )}
          </Box>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <p>No contacts</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default SideBar;
