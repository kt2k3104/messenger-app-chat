"use client";

import {
  Box,
  Button,
  HStack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import SideBar from "./Sidebar";

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { colorMode, toggleColorMode } = useColorMode();

  // const bgBody = useColorModeValue("#e5e5e5", "#1b202b");
  const bgBody = useColorModeValue("#adb5bd", "#36393d");
  const bg = useColorModeValue("#fff", "#1c1e21");

  return (
    <Box
      w="100vw"
      h="100vh"
      p="20px"
      bgColor={bgBody}
      position="relative"
      gap="0"
    >
      <HStack w="100%" h="100%" borderRadius="20px" bgColor={bg}>
        <SideBar />
        {children}
      </HStack>
      <Button
        position="absolute"
        top="5px"
        left="5px"
        w="5px"
        h="5px"
        borderRadius="50%"
        bgColor={colorMode === "light" ? "#000" : "#fff"}
        onClick={toggleColorMode}
      >
        toggle
      </Button>
    </Box>
  );
}
