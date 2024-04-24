"use client";

import { HStack, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useConversations, { ConversationsState } from "~/hooks/useConversations";

const MessagesPage = () => {
  const conversations = useConversations(
    (state: ConversationsState) => state.conversations
  );

  const router = useRouter();

  useEffect(() => {
    if (conversations.length > 0) {
      router.push(`/appchatcucmanh/messages/${conversations[0]._id}`);
    }
  }, [conversations, router]);

  return (
    <HStack h="100%" flex="1" gap="0" justifyContent="center">
      <Spinner />
    </HStack>
  );
};

export default MessagesPage;
