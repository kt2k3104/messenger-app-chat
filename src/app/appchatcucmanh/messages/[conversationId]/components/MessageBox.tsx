"use client";
import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  HStack,
  Highlight,
  Img,
  Text,
  Tooltip,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

import useActiveList, { ActiveListStore } from "~/hooks/useActiveList";
import useConversations, { ConversationsState } from "~/hooks/useConversations";
import useUserInfo, { Message, UserInfoState } from "~/hooks/useUserInfo";
import useLogic, { LogicState } from "~/hooks/useLogic";
import { formatDate } from "~/app/messenger/conversations/[conversationId]/BoxSearchMessage";

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
  const searchMessageValue = useConversations(
    (state: ConversationsState) => state.searchMessageValue
  );
  const isShowMessageWhenSearch = useLogic(
    (state: LogicState) => state.isShowMessageWhenSearch
  );

  const bgMyBoxMessage = useColorModeValue("#e5e5e5", "#212427");

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
                  <Tooltip
                    hasArrow
                    label={formatDate(message.createdAt)}
                    placement="left"
                    borderRadius="5px"
                    closeOnScroll
                  >
                    {!isShowMessageWhenSearch ? (
                      <Text
                        ml="auto"
                        p="16px 14px"
                        bgColor={bgMyBoxMessage}
                        borderRadius="12px"
                        borderTopRightRadius="5px"
                        color="#fff"
                      >
                        {message.content}
                      </Text>
                    ) : (
                      <Text
                        ml="auto"
                        p="16px 14px"
                        bgColor={bgMyBoxMessage}
                        borderRadius="12px"
                        borderTopRightRadius="5px"
                        color="#fff"
                      >
                        <Highlight
                          query={searchMessageValue}
                          styles={{
                            px: "1",
                            py: "1",
                            bg: "orange.100",
                          }}
                        >
                          {message.content}
                        </Highlight>
                      </Text>
                    )}
                  </Tooltip>
                )}
              </VStack>
              <AvatarGroup p="0" ml="auto" size="xs" max={4}>
                {isLastMessage &&
                  message.seenUsers?.map((user, index) => {
                    if (user._id === message.seenUsers[index + 1]?._id) return;
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
                {!isInBlock && (
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
                    <Tooltip
                      hasArrow
                      label={formatDate(message.createdAt)}
                      placement="right"
                      borderRadius="5px"
                      closeOnScroll
                    >
                      {!isShowMessageWhenSearch ? (
                        <Text
                          p="16px 14px"
                          bgColor="#53aa91"
                          borderRadius="12px"
                          borderTopLeftRadius="5px"
                          color="#fff"
                        >
                          {message.content}
                        </Text>
                      ) : (
                        <Text
                          p="16px 14px"
                          bgColor="#53aa91"
                          borderRadius="15px"
                          borderTopLeftRadius="5px"
                          color="#fff"
                        >
                          <Highlight
                            query={searchMessageValue}
                            styles={{
                              px: "1",
                              py: "1",
                              bg: "orange.100",
                            }}
                          >
                            {message.content}
                          </Highlight>
                        </Text>
                      )}
                    </Tooltip>
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
              <AvatarGroup p="0" ml="auto" size="xs" max={4} gap="2px">
                {isLastMessage &&
                  message.seenUsers?.map((user) => {
                    if (user._id === userId && !currConversation?.isGroup)
                      return;
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
