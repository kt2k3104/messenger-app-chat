"use client";

import { Box, Button, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import { FaAngleDown } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { FiPhone } from "react-icons/fi";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { IoEllipsisVertical } from "react-icons/io5";

import useConversations, { ConversationsState } from "~/hooks/useConversations";
import useUserInfo, { UserInfoState } from "~/hooks/useUserInfo";
import ThumbConversation from "~/app/messenger/conversations/components/ThumbConversation";

function HeaderConversation() {
  const currConversation = useConversations(
    (state: ConversationsState) => state.currConversation
  );
  const userId = useUserInfo((state: UserInfoState) => state.userInfo?._id);

  const bg = useColorModeValue("#e5e5e5", "#212427");
  const bgButton = useColorModeValue("#fff", "#1c1e21");

  return (
    <>
      <Button h="52px" bgColor={bgButton} borderRadius="999px" gap="5px">
        {currConversation && (
          <ThumbConversation conversation={currConversation} size="sm" />
        )}
        <Text>
          {currConversation?.isGroup
            ? currConversation.name
            : currConversation?.members[0]._id === userId
            ? currConversation?.members[1].displayName
            : currConversation?.members[0].displayName}
        </Text>
        <Box ml="10px" fontSize="12px" opacity="0.5" mr="5px">
          <FaAngleDown />
        </Box>
      </Button>
      <HStack gap="20px">
        <Button
          w="36px"
          h="36px"
          borderRadius="50%"
          opacity=".5"
          fontSize="2.2rem"
          p="0"
          bgColor="transparent"
        >
          <FiSearch />
        </Button>
        <Button
          w="36px"
          h="36px"
          borderRadius="50%"
          opacity=".5"
          fontSize="2.2rem"
          p="0"
          bgColor="transparent"
        >
          <FiPhone />
        </Button>
        <Button
          w="36px"
          h="36px"
          borderRadius="50%"
          opacity=".5"
          fontSize="2.2rem"
          p="0"
          bgColor="transparent"
        >
          <AiOutlineVideoCamera />
        </Button>
        <Button
          w="36px"
          h="36px"
          borderRadius="50%"
          opacity=".5"
          fontSize="2.2rem"
          p="0"
          bgColor="transparent"
        >
          <IoEllipsisVertical />
        </Button>
      </HStack>
    </>
  );
}

export default HeaderConversation;
