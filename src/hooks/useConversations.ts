import { create } from "zustand";
import { Conversation } from "./useUserInfo";

export interface ConversationsState {
  conversations: Conversation[];
  currConversation: Conversation | null;
  setCurrConversation: (conversation: Conversation) => void;
  setConversations: (conversations: Conversation[]) => void;
  updateConversations: (conversations: Conversation[]) => void;
  pushConversation: (conversation: Conversation) => void;
}

const useConversations = create<ConversationsState>((set) => ({
  conversations: [],
  currConversation: null,
  setCurrConversation: (conversation: Conversation) =>
    set({ currConversation: conversation }),
  setConversations: (conversations: Conversation[]) =>
    set({ conversations: conversations }),
  updateConversations: (data: any) => {
    set((state: ConversationsState) => ({
      conversations: state.conversations.map((conversation) => {
        if (conversation._id === data.conversationId && data.tag === "seen") {
          console.log("conv", conversation);
          console.log("message", data.lastMessage);
          conversation.messages[conversation.messages.length - 1] =
            data.lastMessage;
          return {
            ...conversation,
            messages: conversation.messages,
          };
        }
        return conversation;
      }),
      // if (data.tag === "seen") {
      //   conversations: state.conversations.map((conversation) => {
      //     if (conversation._id === data.conversationId) {
      //       conversation.messages = conversation.messages.map((message) => {
      //         if (message._id === data.lastMessage._id) {
      //           return data.lastMessage;
      //         }
      //         return message;
      //       });
      //     }
      //     return conversation;
      //   }),
      // }
      // }
    }));
  },
  pushConversation: (conversation: Conversation) =>
    set((state: ConversationsState) => ({
      conversations: [...state.conversations, conversation],
    })),
}));

export default useConversations;
