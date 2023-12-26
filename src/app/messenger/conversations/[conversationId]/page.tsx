"use client";

import { HStack, VStack } from "@chakra-ui/react";
import HeaderConversation from "./HeaderConversation";
import SidebarRight from "./SidebarRight";
import ChatContent from "./ChatContent";

export interface IParams {
  conversationId: string;
}

const ConversationBody = ({ params }: { params: IParams }) => {
  return (
    <HStack h="100vh" w="100%" gap="0">
      <VStack h="100%" flex="1" gap="0">
        <HeaderConversation />
        <ChatContent conversationId={params.conversationId} />
      </VStack>
      <SidebarRight />
    </HStack>
  );
};

export default ConversationBody;
