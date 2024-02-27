import { create } from "zustand";

export interface UserInfoState {
  userInfo: UserInfo | null;
  setUserInfo: (UserInfo: UserInfo) => void;
  friends: UserInfo[];
  setFriends: (friends: UserInfo[]) => void;
  addFriend: (friend: UserInfo) => void;
  removeFriend: (friendId: string) => void;
  friendRequests: FriendRequest[];
  setFriendRequests: (friendRequests: FriendRequest[]) => void;
  addFriendRequest: (friendRequest: FriendRequest) => void;
  removeFriendRequest: (friendId: string) => void;
  strangeUsers: StrangeUserInfo[];
  setStrangeUsers: (strangeUsers: StrangeUserInfo[]) => void;
  addStrangeUser: (strangeUser: StrangeUserInfo) => void;
  removeStrangeUser: (strangeUserId: string) => void;
  sentRequests: SentRequest[];
  setSentRequests: (sentRequest: SentRequest[]) => void;
  addSentRequest: (sentRequest: SentRequest) => void;
  removeSentRequest: (friendId: string) => void;
}

export interface UserInfo {
  displayName: string;
  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
  _id: string;
}

export type FriendRequest = {
  sender: UserInfo;
  message: string;
  createdAt: string;
};

export type StrangeUserInfo = UserInfo & {
  mutualFriends: UserInfo[];
};

export type SentRequest = {
  receiver: UserInfo;
  message: string;
  createdAt: string;
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
  setUserInfo: (userInfo: UserInfo) => set({ userInfo }),

  friends: [],
  setFriends: (friends: UserInfo[]) => set({ friends }),
  addFriend: (friend: UserInfo) =>
    set((state) => ({
      friends: [...state.friends, friend],
      sentRequests: state.sentRequests.filter(
        (item) => item.receiver._id !== friend._id
      ),
      strangeUsers: state.strangeUsers.filter(
        (item) => item._id !== friend._id
      ),
    })),
  removeFriend: (friendId: string) =>
    set((state) => ({
      friends: state.friends.filter((item) => item._id !== friendId),
    })),

  friendRequests: [],
  setFriendRequests: (friendRequests: FriendRequest[]) =>
    set({ friendRequests }),
  addFriendRequest: (friendRequest: FriendRequest) =>
    set((state) => ({
      friendRequests: [...state.friendRequests, friendRequest],
    })),
  removeFriendRequest: (friendId: string) =>
    set((state) => ({
      friendRequests: state.friendRequests.filter(
        (item) => item.sender._id !== friendId
      ),
    })),

  strangeUsers: [],
  setStrangeUsers: (strangeUsers: StrangeUserInfo[]) => set({ strangeUsers }),
  addStrangeUser: (strangeUser: StrangeUserInfo) =>
    set((state) => ({
      strangeUsers: [...state.strangeUsers, strangeUser],
    })),
  removeStrangeUser: (strangeUserId: string) =>
    set((state) => ({
      strangeUsers: state.strangeUsers.filter(
        (item) => item._id !== strangeUserId
      ),
    })),

  sentRequests: [],
  setSentRequests: (sentRequests: SentRequest[]) => set({ sentRequests }),
  addSentRequest: (sentRequest: SentRequest) =>
    set((state) => ({
      sentRequests: [...state.sentRequests, sentRequest],
    })),
  removeSentRequest: (friendId: string) =>
    set((state) => ({
      sentRequests: state.sentRequests.filter(
        (item) => item.receiver._id !== friendId
      ),
    })),
}));

export default useUserInfo;
