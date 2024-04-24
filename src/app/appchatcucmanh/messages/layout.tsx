"use client";

import { Box, HStack } from "@chakra-ui/react";
import Header from "./components/Header";
import SideBar from "./components/Sidebar";

function Messages({ children }: { children: React.ReactNode }) {
  return (
    <Box flex="1" h="100%" overflow="hidden">
      <Header />
      <HStack
        w="100%"
        h="calc(100% - 90px)"
        bgColor="transparent"
        gap="0"
        p={{ base: "10px 10px 40px", lg: "10px 36px 40px" }}
      >
        <SideBar />
        {children}
      </HStack>
    </Box>
  );
}

export default Messages;
