import { create } from "zustand";
import { BasicUserInfo } from "./useUserInfo";

export interface LogicState {
  isShowSidebarRight: boolean;
  setIsShowSidebarRight: (isShowSidebarRight: boolean) => void;
  waitingForAddedToGroup: BasicUserInfo[];
  setWaitingForAddedToGroup: (waitingForAddedToGroup: BasicUserInfo[]) => void;
  pushWaitingForAddedToGroup: (waitingForAddedToGroup: BasicUserInfo) => void;
  popWaitingForAddedToGroup: (removedToqueue: BasicUserInfo) => void;
}

const useLogic = create<LogicState>((set) => ({
  isShowSidebarRight: false,
  setIsShowSidebarRight: (isShowSidebarRight: boolean) =>
    set({ isShowSidebarRight }),
  waitingForAddedToGroup: [],
  setWaitingForAddedToGroup: (waitingForAddedToGroup: BasicUserInfo[]) =>
    set({ waitingForAddedToGroup }),
  pushWaitingForAddedToGroup: (waitingForAddedToGroup: BasicUserInfo) =>
    set((state) => ({
      waitingForAddedToGroup: [
        ...state.waitingForAddedToGroup,
        waitingForAddedToGroup,
      ],
    })),
  popWaitingForAddedToGroup: (removedToqueue: BasicUserInfo) =>
    set((state) => ({
      waitingForAddedToGroup: state.waitingForAddedToGroup.filter(
        (user) => user._id !== removedToqueue._id
      ),
    })),
}));

export default useLogic;
