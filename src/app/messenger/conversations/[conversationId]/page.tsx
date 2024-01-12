"use client";

import { HStack, VStack } from "@chakra-ui/react";
import HeaderConversation from "./HeaderConversation";
import SidebarRight from "./SidebarRight";
import ChatContent from "./ChatContent";
import useLogic, { LogicState } from "~/hooks/useLogic";
import BoxSearchMessage from "./BoxSearchMessage";
import { useEffect } from "react";

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
  useEffect(() => {
    setIsShowBoxSearchMessage(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.conversationId]);
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
