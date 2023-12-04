import { create } from "zustand";

interface UserInfoState {
  name: string;
  setName: (name: string) => void;
}

const useUserInfo = create<UserInfoState>((set) => ({
  name: "Khai",
  setName: (name) => set({ name }),
}));

export default useUserInfo;
