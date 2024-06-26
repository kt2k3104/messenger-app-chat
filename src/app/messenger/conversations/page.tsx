"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useConversations, { ConversationsState } from "~/hooks/useConversations";

const MessengerPage = () => {
  const conversations = useConversations(
    (state: ConversationsState) => state.conversations
  );

  const router = useRouter();

  useEffect(() => {
    if (conversations.length > 0) {
      router.push(`/messenger/conversations/${conversations[0]._id}`);
    }
  }, [conversations, router]);
};

export default MessengerPage;
