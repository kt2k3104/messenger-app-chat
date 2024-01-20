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
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import CustomIcons from "../components/Icon";
import { useState } from "react";
import useUserInfo, { UserInfoState } from "~/hooks/useUserInfo";
import useConversations, { ConversationsState } from "~/hooks/useConversations";
import ModalPerInfo from "../components/ModalPerInfo";

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

  const bg = useColorModeValue("#e5e5e5", "#ffffff1a");
  const {
    isOpen: isOpenModalPerInfo,
    onOpen: onOpenModalPerInfo,
    onClose: onCloseModalPerInfo,
  } = useDisclosure();

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
              ? `/messenger/conversations/${currConversation?._id}`
              : "/messenger/conversations"
          }
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
