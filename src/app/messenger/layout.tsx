"use client";
import { Box, Button, HStack, Icon, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { AiFillMessage } from "react-icons/ai";
import { HiUsers } from "react-icons/hi";
import CustomIcons from "../components/Icon";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HStack h="100vh">
      <VStack w="60px">
        <Link href={"/messenger/conversations"} passHref={true}>
          <Button w="44px" h="40px">
            <CustomIcons.icon_chat />
            {/* <Icon as={AiFillMessage} /> */}
          </Button>
        </Link>
        <Link href={"/messenger/friends"} passHref={true}>
          <Button w="44px" h="40px">
            <CustomIcons.icon_users />
            {/* <Icon as={HiUsers} /> */}
          </Button>
        </Link>
        <Link href={""}>
          <Button w="44px" h="40px">
            <CustomIcons.icon_market />
          </Button>
        </Link>
        <Link href={""}>
          <Button w="44px" h="40px">
            <CustomIcons.icon_message_waiting />
          </Button>
        </Link>
        <Link href={""}>
          <Button w="44px" h="40px">
            <CustomIcons.icon_archived_chat />
          </Button>
        </Link>
      </VStack>
      <Box flex="1">{children}</Box>
    </HStack>
  );
}
