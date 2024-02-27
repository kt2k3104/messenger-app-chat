"use client";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  HStack,
  Image,
  Text,
  VStack,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import CustomIcons from "../components/Icon";
import { useEffect, useState } from "react";
import useUserInfo, { UserInfoState } from "~/hooks/useUserInfo";
import useConversations, { ConversationsState } from "~/hooks/useConversations";
import ModalPerInfo from "../components/ModalPerInfo";
import usePusher, { PusherState } from "~/hooks/usePusher";
import requestApi from "~/utils/api";
import useLogic, { LogicState } from "~/hooks/useLogic";
import { usePathname } from "next/navigation";

enum FriendTag {
  ADD_FRIEND = "add-friend",
  ACCEPT_FRIEND_REQUEST = "accept-friend-request",
  REMOVE_FRIEND = "remove-friend",
  CANCEL_FRIEND_REQUEST = "cancel-friend-request",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);

  const user = useUserInfo((state: UserInfoState) => state.userInfo);
  const { colorMode, toggleColorMode } = useColorMode();
  const currConversation = useConversations(
    (state: ConversationsState) => state.currConversation
  );
  const notSeenMessages = useLogic(
    (state: LogicState) => state.notSeenMessages
  );
  const setNotSeenMessage = useLogic(
    (state: LogicState) => state.setNotSeenMessage
  );
  const friendRequests = useUserInfo(
    (state: UserInfoState) => state.friendRequests
  );
  const addFriendRequest = useUserInfo(
    (state: UserInfoState) => state.addFriendRequest
  );
  const removeFriendRequest = useUserInfo(
    (state: UserInfoState) => state.removeFriendRequest
  );
  const addFriend = useUserInfo((state: UserInfoState) => state.addFriend);
  const removeFriend = useUserInfo(
    (state: UserInfoState) => state.removeFriend
  );

  const pusherClient = usePusher((state: PusherState) => state.pusherClient);

  const userId = user?._id;
  const bg = useColorModeValue("#e5e5e5", "#ffffff1a");
  const colorIcon = useColorModeValue("black", "#fff");
  const pathname = usePathname();

  const {
    isOpen: isOpenModalPerInfo,
    onOpen: onOpenModalPerInfo,
    onClose: onCloseModalPerInfo,
  } = useDisclosure();

  useEffect(() => {
    if (!pusherClient || !userId) return;
    const channel = pusherClient.subscribe(userId);

    channel.bind("friend:request", (data: any) => {
      console.log(data);
      if (data.tag === FriendTag.ADD_FRIEND) {
        addFriendRequest(data.userInfo);
      }
      if (data.tag === FriendTag.CANCEL_FRIEND_REQUEST) {
        removeFriendRequest(data.friendId);
      }
      if (data.tag === FriendTag.ACCEPT_FRIEND_REQUEST) {
        addFriend(data.newFriend);
      }
      if (data.tag === FriendTag.REMOVE_FRIEND) {
        removeFriend(data.friendId);
      }
    });

    return () => {
      pusherClient.unsubscribe(userId);
      channel.unbind_all();
    };
  }, [
    pusherClient,
    userId,
    friendRequests,
    addFriendRequest,
    removeFriendRequest,
    addFriend,
    removeFriend,
  ]);

  useEffect(() => {
    const callApi = async () => {
      const res: any = await requestApi(
        "conversations/not-seen/message",
        "GET",
        {}
      );
      setNotSeenMessage(res.data.metadata);
    };
    callApi();
  }, [setNotSeenMessage]);

  return (
    <HStack position="relative" gap="0" h="100vh" w="100vw" overflow="hidden">
      <VStack
        w={expanded ? "249px" : "61px"}
        h="100vh"
        borderRight="1px solid "
        borderColor={bg}
        pt="12px"
      >
        <Link
          href={
            currConversation
              ? `/messenger/conversations/${currConversation._id}`
              : "/messenger/conversations"
          }
          passHref={true}
        >
          <Avatar
            borderRadius="8px"
            w={expanded ? "230px" : "44px"}
            h="44px"
            justifyContent={expanded ? "flex-start" : "center"}
            p={expanded ? "0 11px" : ""}
            icon={<CustomIcons.icon_chat />}
            bgColor={
              pathname.split("/")[2] === `conversations` ? bg : "transparent"
            }
            color={colorIcon}
          >
            {expanded && (
              <Text ml="10px" textTransform="none">
                Đoạn chat
              </Text>
            )}
            {notSeenMessages.length > 0 && (
              <AvatarBadge
                top="-3"
                right="-1"
                border="1px solid"
                borderColor="papayawhip"
                bg="tomato"
                boxSize="1.25em"
              >
                {notSeenMessages.length}
              </AvatarBadge>
            )}
          </Avatar>
        </Link>
        <Link href={"/messenger/friends"} passHref={true}>
          <Avatar
            borderRadius="8px"
            w={expanded ? "230px" : "44px"}
            h="44px"
            justifyContent={expanded ? "flex-start" : "center"}
            p={expanded ? "0 11px" : ""}
            icon={<CustomIcons.icon_users />}
            bgColor={pathname === `/messenger/friends` ? bg : "transparent"}
            color={colorIcon}
          >
            {expanded && (
              <Text ml="10px" textTransform="none">
                Mọi người
              </Text>
            )}
            {friendRequests.length > 0 && (
              <AvatarBadge
                top="-3"
                right="-1"
                border="1px solid"
                borderColor="papayawhip"
                bg="tomato"
                boxSize="1.25em"
              >
                {friendRequests.length}
              </AvatarBadge>
            )}
          </Avatar>
        </Link>
        <Link href={""}>
          <Avatar
            borderRadius="8px"
            w={expanded ? "230px" : "44px"}
            h="44px"
            justifyContent={expanded ? "flex-start" : "center"}
            p={expanded ? "0 11px" : ""}
            icon={<CustomIcons.icon_market />}
            bgColor={pathname === `/messenger/marketplace` ? bg : "transparent"}
            color={colorIcon}
          >
            {expanded && (
              <Text ml="10px" textTransform="none">
                Marketplace
              </Text>
            )}
          </Avatar>
        </Link>
        <Link href={""}>
          <Avatar
            borderRadius="8px"
            w={expanded ? "230px" : "44px"}
            h="44px"
            justifyContent={expanded ? "flex-start" : "center"}
            p={expanded ? "0 11px" : ""}
            icon={<CustomIcons.icon_message_waiting />}
            bgColor={
              pathname === `/messenger/waittingMessages` ? bg : "transparent"
            }
            color={colorIcon}
          >
            {expanded && (
              <Text ml="10px" textTransform="none">
                Tin nhắn đang chờ
              </Text>
            )}
          </Avatar>
        </Link>
        <Link href={""}>
          <Avatar
            borderRadius="8px"
            w={expanded ? "230px" : "44px"}
            h="44px"
            justifyContent={expanded ? "flex-start" : "center"}
            p={expanded ? "0 11px" : ""}
            icon={<CustomIcons.icon_archived_chat />}
            bgColor={pathname === `/messenger/archive` ? bg : "transparent"}
            color={colorIcon}
          >
            {expanded && (
              <Text ml="10px" textTransform="none">
                Kho lưu trữ
              </Text>
            )}
          </Avatar>
        </Link>
        {!expanded && <Box h="1px" w="55%" mt="20px" bgColor={bg}></Box>}
        <Box
          display="flex"
          flexDirection={expanded ? "row" : "column"}
          alignItems="center"
          mt="auto"
          h={!expanded ? "130px" : "60px"}
          w="100%"
          justifyContent={expanded ? "space-between" : "center"}
          p={expanded ? "0 11px" : ""}
          gap={expanded ? "10px" : "16px"}
        >
          {!expanded && <Box h="1px" w="55%" bgColor={bg}></Box>}
          {!expanded && (
            <Image
              w="32px"
              h="32px"
              borderRadius="50%"
              src={
                user?.avatar
                  ? user.avatar
                  : "https://scontent.fhan20-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=2b6aad&_nc_eui2=AeE-4fINDkTKpqp6AeNkaBwWso2H55p0AlGyjYfnmnQCUfpKyWf3qbpWB5GlYHhFJgjq-TbNpyj7ju6QXf36ElkA&_nc_ohc=OgbBqcsBbP8AX_9YNZ3&_nc_ht=scontent.fhan20-1.fna&oh=00_AfCcjusBrJFBUgXvN5BGR4d7_vuMDTjjMsaRcYUIbQaWDA&oe=65BF34F8"
              }
              alt="avt"
              cursor="pointer"
              onClick={onOpenModalPerInfo}
            />
          )}
          {expanded && (
            <>
              <Button
                fontSize={"1.4rem"}
                w="176px"
                h="44px"
                borderRadius="8px"
                justifyContent="flex-start"
                gap="10px"
                onClick={onOpenModalPerInfo}
              >
                <Image
                  w="32px"
                  h="32px"
                  borderRadius="50%"
                  src={
                    user?.avatar
                      ? user.avatar
                      : "https://scontent.fhan20-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=2b6aad&_nc_eui2=AeE-4fINDkTKpqp6AeNkaBwWso2H55p0AlGyjYfnmnQCUfpKyWf3qbpWB5GlYHhFJgjq-TbNpyj7ju6QXf36ElkA&_nc_ohc=OgbBqcsBbP8AX_9YNZ3&_nc_ht=scontent.fhan20-1.fna&oh=00_AfCcjusBrJFBUgXvN5BGR4d7_vuMDTjjMsaRcYUIbQaWDA&oe=65BF34F8"
                  }
                  alt="avt"
                />
                {user?.firstName}
              </Button>
            </>
          )}
          <Button
            borderRadius={expanded ? "8px" : "50%"}
            w="44px"
            h="44px"
            onClick={() => {
              expanded ? setExpanded(false) : setExpanded(true);
            }}
          >
            <CustomIcons.icon_change_size_sidebar />
          </Button>
        </Box>
        <ModalPerInfo
          isOpenModalPerInfo={isOpenModalPerInfo}
          onCloseModalPerInfo={onCloseModalPerInfo}
        />
      </VStack>
      <Box flex="1" h="100vh">
        {children}
      </Box>
      <Button position="absolute" top="0" right="0" onClick={toggleColorMode}>
        {colorMode}
      </Button>
    </HStack>
  );
}
