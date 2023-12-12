"use client";

import { Box, HStack } from "@chakra-ui/react";
import Sidebar from "./components/Sidebar";

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("12345");
  return (
    <HStack>
      <Box bgColor="#242526" w={{ base: "73px", lg: "345px" }} h="100vh">
        <Sidebar />
      </Box>
      <Box>{children}</Box>
    </HStack>
  );
}
