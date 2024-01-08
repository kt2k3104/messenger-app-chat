import { create } from "zustand";
import { Conversation } from "./useUserInfo";

export interface ConversationsState {
  conversations: Conversation[];
  currConversation: Conversation | null;
  setCurrConversation: (conversation: Conversation | null) => void;
  updateCurrConversation: (conversation: Conversation) => void;
  setConversations: (conversations: Conversation[]) => void;
  updateConversations: (conversations: Conversation[]) => void;
  pushConversation: (conversation: Conversation) => void;
}
export enum ConversationTag {
  SEEN = "seen",
  NEW_MESSAGE = "new-message",
  UPDATE_THUMB = "update-thumb",
  UPDATE_INFO = "update-info",
  ADD_MEMBERS = "add-members",
  REMOVE_MEMBERS = "remove-members",
  LEAVE_CONVERSATION = "leave-conversation",
  IS_LEAVE_CONVERSATION = "is-leave-conversation",
  UPDATE_ADMINS = "update-admins",
}

const useConversations = create<ConversationsState>((set) => ({
  conversations: [],
  currConversation: null,
  setCurrConversation: (conversation: Conversation | null) =>
    set({ currConversation: conversation }),
  setConversations: (conversations: Conversation[]) =>
    set({ conversations: conversations }),
  updateCurrConversation: (data: any) => {
    set((state: ConversationsState) => {
      if (
        data.tag === ConversationTag.ADD_MEMBERS ||
        data.tag === ConversationTag.REMOVE_MEMBERS ||
        data.tag === ConversationTag.LEAVE_CONVERSATION
      ) {
        return {
          currConversation: {
            ...state.currConversation,
            members: data.members,
          } as Conversation,
        };
      }

      return { currConversation: state.currConversation };
    });
  },
  updateConversations: (data: any) => {
    set((state: ConversationsState) => ({
      conversations: state.conversations.map((conversation) => {
        if (
          conversation._id === data.conversationId &&
          data.tag === ConversationTag.SEEN
        ) {
          conversation.messages[conversation.messages.length - 1] =
            data.lastMessage;
          return {
            ...conversation,
            messages: conversation.messages,
          };
        }

        if (
          conversation._id === data.conversationId &&
          data.tag === ConversationTag.NEW_MESSAGE
        ) {
          return {
            ...conversation,
            lastMessageAt: data.lastMessage.createdAt,
            messages: [...conversation.messages, data.lastMessage],
          };
        }

        if (
          conversation._id === data.conversationId &&
          data.tag === ConversationTag.ADD_MEMBERS
        ) {
          console.log(data.members);
          return {
            ...conversation,
            members: data.members,
          };
        }
        return conversation;
      }),
    }));
  },
  pushConversation: (conversation: Conversation) =>
    set((state: ConversationsState) => ({
      conversations: [...state.conversations, conversation],
    })),
}));

export default useConversations;
