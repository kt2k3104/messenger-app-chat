"use client";

import { HStack, VStack } from "@chakra-ui/react";
import HeaderConversation from "./HeaderConversation";
import SidebarRight from "./SidebarRight";
import ChatContent from "./ChatContent";
import useLogic, { LogicState } from "~/hooks/useLogic";
import BoxSearchMessage from "./BoxSearchMessage";
import { useEffect } from "react";
import useConversations, { ConversationsState } from "~/hooks/useConversations";
import { Conversation } from "~/hooks/useUserInfo";

export interface IParams {
  conversationId: string;
}

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
    setIsShowBoxSearchMessage(false);
    if (currConversation?._id !== params.conversationId) {
      setCurrConversation(
        conversations.filter((c) => c._id === params.conversationId)[0]
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.conversationId, currConversation]);
  return (
    <HStack h="100vh" w="100%" gap="0">
      <VStack h="100vh" flex="1" gap="0">
        <HeaderConversation />
        {isShowBoxSearchMessage && <BoxSearchMessage />}
        <ChatContent conversationId={params.conversationId} />
      </VStack>
      <SidebarRight />
    </HStack>
  );
};

export default ConversationBody;
