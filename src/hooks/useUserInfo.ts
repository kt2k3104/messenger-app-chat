import { create } from "zustand";

export interface UserInfoState {
  userInfo: UserInfo | null;
  friends: UserInfo[];
  friendRequests: FriendRequest[];
  strangeUsers: StrangeUserInfo[];
  setStrangeUsers: (strangeUsers: StrangeUserInfo[]) => void;
  setFriendRequests: (friendRequests: FriendRequest[]) => void;
  setUserInfo: (UserInfo: UserInfo) => void;
  setFriends: (friends: UserInfo[]) => void;
}

export interface UserInfo {
  displayName: string;
  avatar: string;
  email: string;
  firstName: string;
  // friends: BasicUserInfo[];
  // friendRequests: FriendRequest[];
  lastName: string;
  _id: string;
}

// export type BasicUserInfo = Omit<UserInfo, "friends" | "friendRequests">;

export type FriendRequest = {
  sender: UserInfo;
  message: string;
  _id: string;
  createdAt: string;
};

export type StrangeUserInfo = UserInfo & {
  mutualFriends: UserInfo[];
};

export interface Conversation {
  _id: string;
  admins: string[];
  members: UserInfo[];
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
  sender: UserInfo;
  seenUsers: UserInfo[];
  conversationId: string;
  createdAt: string;
  updatedAt: string;
  images: string[];
  __v: number;
}

const useUserInfo = create<UserInfoState>((set) => ({
  userInfo: null,
  friends: [],
  friendRequests: [],
  strangeUsers: [],
  setStrangeUsers: (strangeUsers: StrangeUserInfo[]) => set({ strangeUsers }),
  setFriendRequests: (friendRequests: FriendRequest[]) =>
    set({ friendRequests }),
  setUserInfo: (userInfo: UserInfo) => set({ userInfo }),
  setFriends: (friends: UserInfo[]) => set({ friends }),
}));

export default useUserInfo;
