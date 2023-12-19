"use client";

import { Box, HStack, useColorModeValue } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bg = useColorModeValue("#e5e5e5", "#ffffff1a");

  return (
    <HStack gap="0">
      <Box
        w={{ base: "88px", lg: "356px" }}
        h="100vh"
        borderRight="1px solid"
        borderColor={bg}
      >
        <Sidebar />
      </Box>
      <Box flex="1">{children}</Box>
    </HStack>
  );
}
