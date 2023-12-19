import { create } from "zustand";

export interface LogicState {
  isShowSidebarRight: boolean;
  setIsShowSidebarRight: (isShowSidebarRight: boolean) => void;
}

const useLogic = create<LogicState>((set) => ({
  isShowSidebarRight: false,
  setIsShowSidebarRight: (isShowSidebarRight: boolean) =>
    set({ isShowSidebarRight }),
}));

export default useLogic;
