import { create } from "zustand";
import { UserInfo } from "./useUserInfo";

export interface LogicState {
  isShowSidebarRight: boolean;
  setIsShowSidebarRight: (isShowSidebarRight: boolean) => void;
  isShowBoxNewConversation: boolean;
  setIsShowBoxNewConversation: (isShowBoxNewConversation: boolean) => void;
  isShowBoxSearchMessage: boolean;
  setIsShowBoxSearchMessage: (isShowBoxSearchMessage: boolean) => void;
  waitingForAddedToGroup: UserInfo[];
  setWaitingForAddedToGroup: (waitingForAddedToGroup: UserInfo[]) => void;
  pushWaitingForAddedToGroup: (waitingForAddedToGroup: UserInfo) => void;
  popWaitingForAddedToGroup: (removedToqueue: UserInfo) => void;
}

const useLogic = create<LogicState>((set) => ({
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
}));

export default useLogic;
