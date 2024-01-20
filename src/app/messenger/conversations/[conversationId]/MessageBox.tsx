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
export enum MessageTypes {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  FILE = "FILE",
  UP_ADD_MEMBER = "ADD_MEMBER",
  UP_RM_MEMBER = "RM_MEMBER",
  UP_INFO = "UP_INFO",
  UP_THUMB = "UP_THUMB",
  UP_ADD_ADMIN = "ADD_ADMIN",
  UP_LEAVE = "UP_LEAVE",
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
  return (
    <>
      {(message.type === MessageTypes.TEXT ||
        message.type === MessageTypes.IMAGE) && (
        <>
          {message.sender._id === userId ? (
            <VStack ml="auto" mt={!isInBlock ? "10px" : "0"}>
              <VStack>
                {message.images?.length > 0 && (
                  <HStack>
                    {message.images.map((image) => {
                      return (
                        <Img
                          ml="auto"
                          key={image}
                          src={image}
                          alt="img"
                          maxH="200px"
                          maxW="50%"
                          h="auto"
                          w="auto"
                          borderRadius="5px"
                        />
                      );
                    })}
                  </HStack>
                )}
                {message.content && (
                  <Text
                    ml="auto"
                    h="35px"
                    p="8px 12px"
                    bgColor="primary.100"
                    borderRadius="999px"
                    color="#fff"
                  >
                    {message.content}
                  </Text>
                )}
              </VStack>
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
              <HStack gap="10px" mt={!isInBlock ? "10px" : "0"}>
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
                      }) >= 0 && (
                        <AvatarBadge boxSize="1.2rem" bg="green.500" />
                      )}
                    </Avatar>
                  </Tooltip>
                )}
                <VStack
                  ml={!isLastInBlock ? "40px" : "0"}
                  alignItems="flex-start"
                >
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
                          <Img
                            key={image}
                            src={image}
                            alt="img"
                            maxH="200px"
                            maxW="50%"
                            h="auto"
                            w="auto"
                            borderRadius="5px"
                          />
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
      )}
      {message.type !== MessageTypes.TEXT &&
        message.type !== MessageTypes.IMAGE && (
          <Text
            fontSize="1.2rem"
            fontWeight="300"
            alignSelf="center"
            m="10px 0"
          >
            {message.sender.displayName}: {message.content}
          </Text>
        )}
    </>
  );
}

export default MessageBox;
