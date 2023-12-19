"use client";
import {
  Box,
  Button,
  HStack,
  Image,
  Text,
  VStack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import CustomIcons from "../components/Icon";
import { useState } from "react";
import useUserInfo, { UserInfoState } from "~/hooks/useUserInfo";
import useConversations, { ConversationsState } from "~/hooks/useConversations";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);

  const user = useUserInfo((state: UserInfoState) => state.basicUserInfo);
  const { colorMode, toggleColorMode } = useColorMode();
  const currConversation = useConversations(
    (state: ConversationsState) => state.currConversation
  );

  const bg = useColorModeValue("#e5e5e5", "#ffffff1a");

  return (
    <HStack h="100vh" position="relative">
      <VStack
        w={expanded ? "249px" : "61px"}
        h="100vh"
        borderRight="1px solid "
        borderColor={bg}
        pt="12px"
      >
        <Link
          href={`/messenger/conversations/${currConversation?._id}`}
          passHref={true}
        >
          <Button
            borderRadius="8px"
            w={expanded ? "230px" : "44px"}
            h="44px"
            justifyContent={expanded ? "flex-start" : "center"}
            p={expanded ? "0 11px" : ""}
          >
            <CustomIcons.icon_chat />
            {expanded && <Text ml="10px">Đoạn chat</Text>}
          </Button>
        </Link>
        <Link href={"/messenger/friends"} passHref={true}>
          <Button
            borderRadius="8px"
            w={expanded ? "230px" : "44px"}
            h="44px"
            justifyContent={expanded ? "flex-start" : "center"}
            p={expanded ? "0 11px" : ""}
          >
            <CustomIcons.icon_users />
            {expanded && <Text ml="10px">Mọi người</Text>}
          </Button>
        </Link>
        <Link href={""}>
          <Button
            borderRadius="8px"
            w={expanded ? "230px" : "44px"}
            h="44px"
            justifyContent={expanded ? "flex-start" : "center"}
            p={expanded ? "0 11px" : ""}
          >
            <CustomIcons.icon_market />
            {expanded && <Text ml="10px">Marketplace</Text>}
          </Button>
        </Link>
        <Link href={""}>
          <Button
            borderRadius="8px"
            w={expanded ? "230px" : "44px"}
            h="44px"
            justifyContent={expanded ? "flex-start" : "center"}
            p={expanded ? "0 11px" : ""}
          >
            <CustomIcons.icon_message_waiting />
            {expanded && <Text ml="10px">Tin nhắn đang chờ</Text>}
          </Button>
        </Link>
        <Link href={""}>
          <Button
            borderRadius="8px"
            w={expanded ? "230px" : "44px"}
            h="44px"
            justifyContent={expanded ? "flex-start" : "center"}
            p={expanded ? "0 11px" : ""}
          >
            <CustomIcons.icon_archived_chat />
            {expanded && <Text ml="10px">Kho lưu trữ</Text>}
          </Button>
        </Link>
        {!expanded && <Box h="1px" w="55%" mt="20px" bgColor={bg}></Box>}
        <Box
          display="flex"
          alignItems="center"
          mt="auto"
          h="60px"
          w="100%"
          justifyContent={expanded ? "space-between" : "center"}
          p={expanded ? "0 11px" : ""}
        >
          {expanded && (
            <Button
              fontSize={"1.4rem"}
              w="176px"
              h="44px"
              borderRadius="8px"
              justifyContent="flex-start"
              gap="10px"
            >
              <Image
                w="32px"
                h="32px"
                borderRadius="50%"
                src={user?.avatar ? user.avatar : "/images/no-image.png"}
                alt="avt"
              />
              {user?.firstName}
            </Button>
          )}
          <Button
            borderRadius="8px"
            w="44px"
            h="44px"
            onClick={() => {
              expanded ? setExpanded(false) : setExpanded(true);
            }}
          >
            <CustomIcons.icon_change_size_sidebar />
          </Button>
        </Box>
      </VStack>
      <Box flex="1">{children}</Box>
      <Button position="absolute" top="0" right="0" onClick={toggleColorMode}>
        {colorMode}
      </Button>
    </HStack>
  );
}
