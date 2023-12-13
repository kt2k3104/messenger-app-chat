"use client";

import { Box, HStack, useColorModeValue } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bg = useColorModeValue("0000001a", "#ffffff1a");

  return (
    <HStack>
      <Box
        w={{ base: "73px", lg: "345px" }}
        h="100vh"
        borderRight="1px solid"
        borderColor={bg}
      >
        <Sidebar />
      </Box>
      <Box>{children}</Box>
    </HStack>
  );
}
