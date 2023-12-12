import { create } from "zustand";

export interface UserInfoState {
  basicUserInfo: BasicUserInfo | null;
  friends: BasicUserInfo[];
  setBasicUserInfo: (basicUserInfo: BasicUserInfo) => void;
  setFriends: (friends: BasicUserInfo[]) => void;
}

export interface BasicUserInfo {
  displayName: string;
  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
  _id: string;
}

export interface Conversation {
  _id: string;
  admin: string[];
  members: BasicUserInfo[];
  messages: Message[];
  name: string;
  isGroup: boolean;
  thumb: string;
  lastMessageAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Message {
  _id: string;
  content: string;
  type: string;
  sender: BasicUserInfo;
  seenUsers: BasicUserInfo[];
  conversationId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const useUserInfo = create<UserInfoState>((set) => ({
  basicUserInfo: null,
  authUserInfo: null,
  friends: [],
  setBasicUserInfo: (basicUserInfo: BasicUserInfo) => set({ basicUserInfo }),
  setFriends: (friends: BasicUserInfo[]) => set({ friends }),
}));

export default useUserInfo;
