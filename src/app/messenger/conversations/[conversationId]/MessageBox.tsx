"use client";
import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Box,
  HStack,
  Img,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import useActiveList, { ActiveListStore } from "~/hooks/useActiveList";
import useConversations, { ConversationsState } from "~/hooks/useConversations";
import useUserInfo, { Message, UserInfoState } from "~/hooks/useUserInfo";

interface IMessageBoxProps {
  message: Message;
  isLastMessage: boolean;
  isInBlock: boolean;
  isLastInBlock?: boolean;
}

function MessageBox({
  message,
  isLastMessage,
  isInBlock,
  isLastInBlock,
}: IMessageBoxProps) {
  const userId = useUserInfo((state: UserInfoState) => state.userInfo?._id);
  const currConversation = useConversations(
    (state: ConversationsState) => state.currConversation
  );

  const membersOnline = useActiveList(
    (state: ActiveListStore) => state.members
  );
  console.log(message);
  return (
    <>
      {message.sender._id === userId ? (
        <VStack ml="auto">
          <HStack>
            {message.images?.length > 0 && (
              <HStack>
                {message.images.map((image) => {
                  return (
                    <Box key={image}>
                      <Img src={image} alt="img" w="50px" />
                    </Box>
                  );
                })}
              </HStack>
            )}
            {message.content && (
              <Text
                h="35px"
                p="8px 12px"
                bgColor="primary.100"
                borderRadius="999px"
                color="#fff"
              >
                {message.content}
              </Text>
            )}
          </HStack>
          <AvatarGroup p="0" ml="auto" size="xs" max={4}>
            {isLastMessage &&
              message.seenUsers?.map((user) => {
                return (
                  <Tooltip
                    hasArrow
                    label={user.displayName}
                    key={user._id}
                    placement="top"
                    fontSize="1.2rem"
                    fontWeight="400"
                    borderRadius="8px"
                    p="5px"
                  >
                    <Avatar src={user.avatar} size="xs" />
                  </Tooltip>
                );
              })}
          </AvatarGroup>
        </VStack>
      ) : (
        <VStack
          w="100%"
          justifyContent="flex-start"
          alignItems="start"
          gap="2px"
        >
          <HStack gap="10px">
            {isLastInBlock && (
              <Tooltip
                hasArrow
                label={message.sender.displayName}
                placement="left"
                fontSize="1.2rem"
                fontWeight="400"
                borderRadius="8px"
                p="5px"
              >
                <Avatar mt="auto" src={message.sender.avatar} size="md">
                  {membersOnline.findIndex((member) => {
                    return member === message.sender._id;
                  }) >= 0 && <AvatarBadge boxSize="1.2rem" bg="green.500" />}
                </Avatar>
              </Tooltip>
            )}
            <VStack ml={!isLastInBlock ? "40px" : "0"} alignItems="flex-start">
              {currConversation?.isGroup && !isInBlock && (
                <Text
                  mr="auto"
                  ml="10px"
                  fontSize="1.2rem"
                  color="textSecond.100"
                >
                  {message.sender.firstName}
                </Text>
              )}
              {message.content && (
                <Text
                  h="35px"
                  p="8px 12px"
                  bgColor="primary.100"
                  borderRadius="999px"
                  color="#fff"
                >
                  {message.content}
                </Text>
              )}
              {message.images?.length > 0 && (
                <HStack>
                  {message.images.map((image) => {
                    return (
                      <Box key={image}>
                        <Img src={image} alt="img" w="50px" />
                      </Box>
                    );
                  })}
                </HStack>
              )}
            </VStack>
          </HStack>
          <AvatarGroup p="0" ml="auto" size="xs" max={4}>
            {isLastMessage &&
              message.seenUsers?.map((user) => {
                return (
                  <Tooltip
                    hasArrow
                    label={user.displayName}
                    key={user._id}
                    placement="top"
                    fontSize="1.2rem"
                    fontWeight="400"
                    borderRadius="8px"
                    p="5px"
                  >
                    <Avatar src={user.avatar} size="xs" />
                  </Tooltip>
                );
              })}
          </AvatarGroup>
        </VStack>
      )}
    </>
  );
}

export default MessageBox;
