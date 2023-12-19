import { create } from "zustand";
import { Conversation } from "./useUserInfo";

export interface ConversationsState {
  conversations: Conversation[];
  currConversation: Conversation | null;
  setCurrConversation: (conversation: Conversation) => void;
  setConversations: (conversations: Conversation[]) => void;
  pushConversation: (conversation: Conversation) => void;
}

const useConversations = create<ConversationsState>((set) => ({
  conversations: [],
  currConversation: null,
  setCurrConversation: (conversation: Conversation) =>
    set({ currConversation: conversation }),
  setConversations: (conversations: Conversation[]) => set({ conversations }),
  pushConversation: (conversation: Conversation) =>
    set((state: ConversationsState) => ({
      conversations: [...state.conversations, conversation],
    })),
}));

export default useConversations;
