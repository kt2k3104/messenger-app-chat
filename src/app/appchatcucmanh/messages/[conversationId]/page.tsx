"use client";

import { HStack, VStack, useColorModeValue } from "@chakra-ui/react";
import HeaderConversation from "./components/HeaderConversation";
import SidebarRight from "./components/SidebarRight";
import ChatContent from "./components/ChatContent";
import useLogic, { LogicState } from "~/hooks/useLogic";
import BoxSearchMessage from "./components/BoxSearchMessage";
import { useEffect } from "react";
import useConversations, { ConversationsState } from "~/hooks/useConversations";
import { IParams } from "~/app/messenger/conversations/[conversationId]/page";

const ConversationBody = ({ params }: { params: IParams }) => {
  const isShowBoxSearchMessage = useLogic(
    (state: LogicState) => state.isShowBoxSearchMessage
  );
  const setIsShowBoxSearchMessage = useLogic(
    (state: LogicState) => state.setIsShowBoxSearchMessage
  );
  const currConversation = useConversations(
    (state: ConversationsState) => state.currConversation
  );
  const setCurrConversation = useConversations(
    (state: ConversationsState) => state.setCurrConversation
  );
  const conversations = useConversations(
    (state: ConversationsState) => state.conversations
  );

  useEffect(() => {
    if (
      !conversations.some(
        (conversation) => conversation._id === params.conversationId
      )
    ) {
      window.location.href = "/appchatcucmanh/";
    }
  }, [params, conversations]);

  useEffect(() => {
    setIsShowBoxSearchMessage(false);
    if (currConversation?._id !== params.conversationId) {
      setCurrConversation(
        conversations.filter((c) => c._id === params.conversationId)[0]
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.conversationId, currConversation]);

  const bg = useColorModeValue("#e5e5e5", "#212427");

  return (
    <HStack h="100%" flex="1" gap="0">
      <VStack h="100%" flex="1" gap="0">
        <HStack
          w="100%"
          h="90px"
          bgColor={bg}
          borderTopLeftRadius="16px"
          borderTopRightRadius="16px"
          alignItems="center"
          justifyContent="space-between"
          p="16px 26px"
        >
          <HeaderConversation />
        </HStack>
        {isShowBoxSearchMessage && <BoxSearchMessage />}
        <VStack
          h="calc(100% - 90px)"
          w="100%"
          bg="#272b2e"
          borderBottomRightRadius="16px"
          position="relative"
          p="0 20px 20px 28px"
        >
          <ChatContent conversationId={params.conversationId} />
        </VStack>
      </VStack>
      <SidebarRight />
    </HStack>
  );
};

export default ConversationBody;
