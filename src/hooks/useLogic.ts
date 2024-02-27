import { create } from "zustand";
import { UserInfo } from "./useUserInfo";

export interface LogicState {
  isInitLogin: boolean;
  setIsInitLogin: (isInitLogin: boolean) => void;
  notSeenMessages: string[];
  AddNotSeenMessage: (conversationId: string) => void;
  RemoveNotSeenMessage: (conversationId: string) => void;
  setNotSeenMessage: (notSeenMessages: string[]) => void;
  isShowSidebarRight: boolean;
  setIsShowSidebarRight: (isShowSidebarRight: boolean) => void;
  isShowBoxNewConversation: boolean;
  setIsShowBoxNewConversation: (isShowBoxNewConversation: boolean) => void;
  isShowBoxSearchMessage: boolean;
  setIsShowBoxSearchMessage: (isShowBoxSearchMessage: boolean) => void;
  isShowMessageWhenSearch: boolean;
  setIsShowMessageWhenSearch: (isShowMessageWhenSearch: boolean) => void;
  waitingForAddedToGroup: UserInfo[];
  setWaitingForAddedToGroup: (waitingForAddedToGroup: UserInfo[]) => void;
  pushWaitingForAddedToGroup: (waitingForAddedToGroup: UserInfo) => void;
  popWaitingForAddedToGroup: (removedToqueue: UserInfo) => void;
}

const useLogic = create<LogicState>((set) => ({
  isInitLogin: false,
  setIsInitLogin: (isInitLogin: boolean) => set({ isInitLogin }),
  isShowSidebarRight: false,
  setIsShowSidebarRight: (isShowSidebarRight: boolean) =>
    set({ isShowSidebarRight }),
  waitingForAddedToGroup: [],
  isShowBoxNewConversation: false,
  setIsShowBoxNewConversation: (isShowBoxNewConversation: boolean) =>
    set({ isShowBoxNewConversation }),
  isShowBoxSearchMessage: false,
  setIsShowBoxSearchMessage: (isShowBoxSearchMessage: boolean) =>
    set({ isShowBoxSearchMessage }),
  isShowMessageWhenSearch: false,
  setIsShowMessageWhenSearch: (isShowMessageWhenSearch: boolean) =>
    set({ isShowMessageWhenSearch }),
  setWaitingForAddedToGroup: (waitingForAddedToGroup: UserInfo[]) =>
    set({ waitingForAddedToGroup }),
  pushWaitingForAddedToGroup: (waitingForAddedToGroup: UserInfo) =>
    set((state) => ({
      waitingForAddedToGroup: [
        ...state.waitingForAddedToGroup,
        waitingForAddedToGroup,
      ],
    })),
  popWaitingForAddedToGroup: (removedToqueue: UserInfo) =>
    set((state) => ({
      waitingForAddedToGroup: state.waitingForAddedToGroup.filter(
        (user) => user._id !== removedToqueue._id
      ),
    })),
  notSeenMessages: [],
  setNotSeenMessage: (notSeenMessages: string[]) => set({ notSeenMessages }),
  AddNotSeenMessage: (conversationId: string) =>
    set((state) => ({
      notSeenMessages: [...state.notSeenMessages, conversationId],
    })),
  RemoveNotSeenMessage: (conversationId: string) =>
    set((state) => ({
      notSeenMessages: state.notSeenMessages.filter(
        (id) => id !== conversationId
      ),
    })),
}));

export default useLogic;
