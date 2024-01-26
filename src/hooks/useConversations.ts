import { create } from "zustand";
import { Conversation, Message } from "./useUserInfo";

export interface ConversationsState {
  conversations: Conversation[];
  currConversation: Conversation | null;
  messages: Message[];
  searchMessageValue: string;
  setSearchMessageValue: (value: string) => void;

  setMessages: (messages: Message[]) => void;
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
  messages: [],
  setMessages: (messages: Message[]) => set({ messages: messages }),
  searchMessageValue: "",
  setSearchMessageValue: (value: string) => set({ searchMessageValue: value }),
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
      if (data.tag === ConversationTag.UPDATE_THUMB) {
        return {
          currConversation: {
            ...state.currConversation,
            thumb: data.imageUrl,
          } as Conversation,
        };
      }
      if (data.tag === ConversationTag.UPDATE_INFO) {
        return {
          currConversation: {
            ...state.currConversation,
            name: data.updateInfo.name,
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
          conversation.messages[0] = data.lastMessage;
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
            messages: [data.lastMessage, ...conversation.messages],
          };
        }

        if (
          conversation._id === data.conversationId &&
          data.tag === ConversationTag.ADD_MEMBERS
        ) {
          return {
            ...conversation,
            members: data.members,
          };
        }
        if (
          conversation._id === data.conversationId &&
          data.tag === ConversationTag.UPDATE_THUMB
        ) {
          return {
            ...conversation,
            thumb: data.imageUrl,
          };
        }
        if (
          conversation._id === data.conversationId &&
          data.tag === ConversationTag.UPDATE_INFO
        ) {
          return {
            ...conversation,
            name: data.updateInfo.name,
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
