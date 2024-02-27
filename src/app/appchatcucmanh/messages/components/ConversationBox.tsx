"use client";
import {
  Box,
  Button,
  Divider,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { TfiMoreAlt } from "react-icons/tfi";
import { FaUser, FaLock, FaPhone } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { IoIosWarning } from "react-icons/io";

import useConversations, { ConversationsState } from "~/hooks/useConversations";
import useLogic, { LogicState } from "~/hooks/useLogic";
import useUserInfo, { Conversation, UserInfoState } from "~/hooks/useUserInfo";
import { useEffect, useMemo, useState } from "react";
import CustomIcons from "~/app/components/Icon";
import ThumbConversation from "~/app/messenger/conversations/components/ThumbConversation";
import { formatDate } from "~/app/messenger/conversations/[conversationId]/BoxSearchMessage";

function ConversationBox({ conversation }: { conversation: Conversation }) {
  const [numOfNotSeenMessages, setNumOfNotSeenMessages] = useState(0);

  const setCurrConversation = useConversations(
    (state: ConversationsState) => state.setCurrConversation
  );
  const isShowBoxNewConversation = useLogic(
    (state: LogicState) => state.isShowBoxNewConversation
  );
  const setIsShowBoxNewConversation = useLogic(
    (state: LogicState) => state.setIsShowBoxNewConversation
  );
  const waitingForAddedToGroup = useLogic(
    (state: LogicState) => state.waitingForAddedToGroup
  );
  const currConversation = useConversations(
    (state: ConversationsState) => state.currConversation
  );
  const conversations = useConversations(
    (state: ConversationsState) => state.conversations
  );

  const userId = useUserInfo((state: UserInfoState) => state.userInfo)?._id;
  // const lastMessage = conversation.messages[0];
  const lastMessage = conversation.messages[0];

  const bg = useColorModeValue("#f5f5f5", "#ffffff1a");
  const color = useColorModeValue("#000", "#fff");

  const { isOpen, onToggle, onClose } = useDisclosure();

  const checkSeenMessage = useMemo(() => {
    if (!lastMessage) return false;

    if (lastMessage.sender._id === userId) return true;

    return (
      lastMessage.seenUsers.findIndex((user) => user._id === userId) !== -1
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMessage]);

  useEffect(() => {
    let count = 0;
    for (let i = 0; i < conversation.messages.length; i++) {
      if (
        conversation.messages[i].seenUsers.some((user) => user._id === userId)
      ) {
        break;
      } else {
        if (conversation.messages[i].sender._id !== userId) {
          count++;
        }
      }
    }
    setNumOfNotSeenMessages(count);
  }, [conversation.messages, userId]);

  return (
    <Link
      style={{ width: "100%" }}
      href={`/appchatcucmanh/messages/${conversation._id}`}
      passHref
      key={conversation._id}
      onClick={() => {
        setCurrConversation(conversation);
        if (isShowBoxNewConversation && waitingForAddedToGroup.length === 0)
          setIsShowBoxNewConversation(false);
      }}
    >
      <HStack
        alignItems="center"
        justifyContent="flex-start"
        _hover={{
          bgColor: "bgLightActive.100",
        }}
        bgColor="transparent"
        p="20px "
        role="group"
        borderLeft={
          conversation._id === currConversation?._id
            ? "2px solid #db4663"
            : "none"
        }
        borderBottom="2px solid #272b2e"
        gap="15px"
      >
        <ThumbConversation conversation={conversation} size="md" />
        <VStack alignItems="center" gap="0">
          <Text
            display={{ base: "none", lg: "inline" }}
            fontWeight="500"
            mr="auto"
          >
            {conversation.isGroup
              ? conversation.name
              : conversation.members[0]._id === userId
              ? conversation.members[1]?.displayName
              : conversation.members[0].displayName}
          </Text>
          {conversation.messages.length > 0 && (
            <Text
              display={{ base: "none", lg: "flex" }}
              color="#848d92"
              fontWeight={checkSeenMessage ? "400" : "bold"}
              maxH="180px"
              fontSize="1.3rem"
              maxW="160px"
              mr="auto"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {conversation.messages[0].sender._id === userId
                ? "Bạn"
                : conversation.messages[0].sender.firstName}
              : {conversation.messages[0].content}
            </Text>
          )}
        </VStack>
        <VStack
          _groupHover={{
            display: "none",
          }}
          display={isOpen ? "none" : "flex"}
          h="45px"
          ml="auto"
          justifyContent="start"
          alignItems="start"
        >
          {conversation.messages.length > 0 && (
            <Text fontSize="1.2rem" color="#848d92">
              {formatDate(conversation.messages[0].createdAt)}
            </Text>
          )}
          {numOfNotSeenMessages > 0 && (
            <Button
              as="div"
              borderRadius="50%"
              w="25px"
              h="25px"
              p="0"
              flexShrink="0"
              ml="auto"
              mt="auto"
              bgColor="#53aa91"
              _hover={{ opacity: 0.9 }}
            >
              {numOfNotSeenMessages}
            </Button>
          )}
        </VStack>
        <Popover isOpen={isOpen} onClose={onClose}>
          <PopoverTrigger>
            <Button
              w="32px"
              h="32px"
              borderRadius="50%"
              boxShadow="0 0 0 1px rgba(0,0,0,0.1)"
              ml="auto"
              alignItems="center"
              display={isOpen ? "flex" : "none"}
              _groupHover={{
                display: { base: "none", lg: "flex" },
              }}
              fontSize="24px"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggle();
              }}
            >
              <TfiMoreAlt />
            </Button>
          </PopoverTrigger>
          <PopoverContent maxW="344px" w="344px" p="0" borderRadius="10px">
            <PopoverArrow />
            <PopoverBody p="4px">
              <Button
                as="div"
                w="336px"
                h="44px"
                p="8px"
                gap="12px"
                bg="transparent"
                justifyContent="flex-start"
              >
                <HStack
                  w="28px"
                  h="28px"
                  borderRadius="50%"
                  bgColor={bg}
                  justifyContent="center"
                >
                  <CustomIcons.icon_tick />
                </HStack>
                <Text fontSize="1.4rem" fontWeight="500">
                  Đánh dấu là chưa đọc
                </Text>
              </Button>
              <Button
                as="div"
                w="336px"
                h="44px"
                p="8px"
                gap="12px"
                bg="transparent"
                justifyContent="flex-start"
              >
                <HStack
                  w="28px"
                  h="28px"
                  borderRadius="50%"
                  bgColor={bg}
                  justifyContent="center"
                  fontSize="1.6rem"
                >
                  <IoNotifications />
                </HStack>
                <Text fontSize="1.4rem" fontWeight="500">
                  Tắt thông báo
                </Text>
              </Button>
              {!conversation?.isGroup && (
                <>
                  <Button
                    as="div"
                    w="336px"
                    h="44px"
                    p="8px"
                    gap="12px"
                    bg="transparent"
                    justifyContent="flex-start"
                  >
                    <HStack
                      w="28px"
                      h="28px"
                      borderRadius="50%"
                      bgColor={bg}
                      justifyContent="center"
                      fontSize="1.4rem"
                    >
                      <FaUser />
                    </HStack>
                    <Text fontSize="1.4rem" fontWeight="500">
                      Xem trang cá nhân
                    </Text>
                  </Button>

                  <Box p="5px 10px">
                    <Divider />
                  </Box>
                  <Button
                    as="div"
                    w="336px"
                    h="44px"
                    p="8px"
                    gap="12px"
                    bg="transparent"
                    justifyContent="flex-start"
                  >
                    <HStack
                      w="28px"
                      h="28px"
                      borderRadius="50%"
                      bgColor={bg}
                      justifyContent="center"
                      fontSize="1.4rem"
                    >
                      <FaLock />
                    </HStack>
                    <Text fontSize="1.4rem" fontWeight="500">
                      Bắt đầu đoạn chat mã hóa đầu cuối
                    </Text>
                  </Button>
                </>
              )}
              <Box p="5px 10px">
                <Divider />
              </Box>
              <Button
                as="div"
                w="336px"
                h="44px"
                p="8px"
                gap="12px"
                bg="transparent"
                justifyContent="flex-start"
              >
                <HStack
                  w="28px"
                  h="28px"
                  borderRadius="50%"
                  bgColor={bg}
                  justifyContent="center"
                  fontSize="1.4rem"
                >
                  <FaPhone />
                </HStack>
                <Text fontSize="1.4rem" fontWeight="500">
                  Gọi thoại
                </Text>
              </Button>
              <Button
                as="div"
                w="336px"
                h="44px"
                p="8px"
                gap="12px"
                bg="transparent"
                justifyContent="flex-start"
              >
                <HStack
                  w="28px"
                  h="28px"
                  borderRadius="50%"
                  bgColor={bg}
                  justifyContent="center"
                >
                  <CustomIcons.icon_video_call
                    width="16px"
                    height="16px"
                    color={color}
                  />
                </HStack>
                <Text fontSize="1.4rem" fontWeight="500">
                  Chat video
                </Text>
              </Button>
              <Box p="5px 10px">
                <Divider />
              </Box>
              {!conversation?.isGroup && (
                <Button
                  as="div"
                  w="336px"
                  h="44px"
                  p="8px"
                  gap="12px"
                  bg="transparent"
                  justifyContent="flex-start"
                >
                  <HStack
                    w="28px"
                    h="28px"
                    borderRadius="50%"
                    bgColor={bg}
                    justifyContent="center"
                  >
                    <CustomIcons.icon_block />
                  </HStack>
                  <Text fontSize="1.4rem" fontWeight="500">
                    Chặn
                  </Text>
                </Button>
              )}
              <Button
                as="div"
                w="336px"
                h="44px"
                p="8px"
                gap="12px"
                bg="transparent"
                justifyContent="flex-start"
              >
                <HStack
                  w="28px"
                  h="28px"
                  borderRadius="50%"
                  bgColor={bg}
                  justifyContent="center"
                >
                  <CustomIcons.icon_archived_chat />
                </HStack>
                <Text fontSize="1.4rem" fontWeight="500">
                  Lưu trữ đoạn chat
                </Text>
              </Button>
              <Button
                as="div"
                w="336px"
                h="44px"
                p="8px"
                gap="12px"
                bg="transparent"
                justifyContent="flex-start"
              >
                <HStack
                  w="28px"
                  h="28px"
                  borderRadius="50%"
                  bgColor={bg}
                  justifyContent="center"
                >
                  <CustomIcons.icon_trash_can />
                </HStack>
                <Text fontSize="1.4rem" fontWeight="500">
                  Xóa đoạn chat
                </Text>
              </Button>
              <Button
                as="div"
                w="336px"
                h="44px"
                p="8px"
                gap="12px"
                bg="transparent"
                justifyContent="flex-start"
              >
                <HStack
                  w="28px"
                  h="28px"
                  borderRadius="50%"
                  bgColor={bg}
                  justifyContent="center"
                  fontSize="16px"
                >
                  <IoIosWarning />
                </HStack>
                <Text fontSize="1.4rem" fontWeight="500">
                  Báo cáo
                </Text>
              </Button>
              {conversation?.isGroup && (
                <Button
                  as="div"
                  w="336px"
                  h="44px"
                  p="8px"
                  gap="12px"
                  bg="transparent"
                  justifyContent="flex-start"
                >
                  <HStack
                    w="28px"
                    h="28px"
                    borderRadius="50%"
                    bgColor={bg}
                    justifyContent="center"
                    fontSize="16px"
                  >
                    <CustomIcons.icon_leave_conversation />
                  </HStack>
                  <Text fontSize="1.4rem" fontWeight="500">
                    Rời nhóm
                  </Text>
                </Button>
              )}
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
    </Link>
  );
}

export default ConversationBox;
