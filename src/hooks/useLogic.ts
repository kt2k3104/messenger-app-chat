import { create } from "zustand";
import { BasicUserInfo } from "./useUserInfo";

export interface LogicState {
  isShowSidebarRight: boolean;
  setIsShowSidebarRight: (isShowSidebarRight: boolean) => void;
  waitingForAddedToGroup: BasicUserInfo[];
  setWaitingForAddedToGroup: (waitingForAddedToGroup: BasicUserInfo[]) => void;
}

const useLogic = create<LogicState>((set) => ({
  isShowSidebarRight: false,
  setIsShowSidebarRight: (isShowSidebarRight: boolean) =>
    set({ isShowSidebarRight }),
  waitingForAddedToGroup: [],
  setWaitingForAddedToGroup: (waitingForAddedToGroup: BasicUserInfo[]) =>
    set({ waitingForAddedToGroup }),
}));

export default useLogic;
