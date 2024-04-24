"use client";

import {
  Box,
  Button,
  HStack,
  Input,
  Spinner,
  Text,
  Tooltip,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { BsEmojiSmile } from "react-icons/bs";
import { RiAttachmentLine } from "react-icons/ri";
import { RiMicLine } from "react-icons/ri";
import { RiSendPlaneLine } from "react-icons/ri";

import CustomIcons from "~/app/components/Icon";
import PreviewImage from "~/app/messenger/conversations/[conversationId]/PreviewImage";
import useConversations, { ConversationsState } from "~/hooks/useConversations";
import useLogic, { LogicState } from "~/hooks/useLogic";
import usePusher, { PusherState } from "~/hooks/usePusher";
import useUserInfo, { Message, UserInfoState } from "~/hooks/useUserInfo";
import requestApi from "~/utils/api";
import MessageBox, { MessageTypes } from "./MessageBox";

function ChatContent({ conversationId }: { conversationId: string }) {
  const [images, setImages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [debounceMessage] = useDebounce(inputMessage, 500);
  const [typing, setTyping] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [firstMessageId, setFirstMessageId] = useState<string>("");
  const [isShowOverlay, setIsShowOverlay] = useState(true);
  const [isHasNewMessage, setIsHasNewMessage] = useState(false);
  const [waitingGetMessages, setWaitingGetMessages] = useState(false);

  const messages = useConversations(
    (state: ConversationsState) => state.messages
  );
  const updateMessage = useConversations(
    (state: ConversationsState) => state.updateMessage
  );
  const setMessages = useConversations(
    (state: ConversationsState) => state.setMessages
  );
  const updateMessagesUp = useConversations(
    (state: ConversationsState) => state.updateMessagesUp
  );
  const updateMessagesDown = useConversations(
    (state: ConversationsState) => state.updateMessagesDown
  );
  const currUserId = useUserInfo((state: UserInfoState) => state.userInfo?._id);
  const isShowBoxSearchMessage = useLogic(
    (state: LogicState) => state.isShowBoxSearchMessage
  );
  const currConversation = useConversations(
    (state: ConversationsState) => state.currConversation
  );
  const setIsShowMessageWhenSearch = useLogic(
    (state: LogicState) => state.setIsShowMessageWhenSearch
  );
  const RemoveNotSeenMessage = useLogic(
    (state: LogicState) => state.RemoveNotSeenMessage
  );
  const pusherClient = usePusher((state: PusherState) => state.pusherClient);

  const buttonRef = useRef<HTMLDivElement>(null);
  const clearTimerId = useRef<any>(null);
  const typingRef = useRef<any>(null);
  const inputImageRef = useRef<any>(null);
  const chatContentRef = useRef<any>(null);
  const messageBoxRef = useRef<any>(null);

  const handleSubmitSendMessage = async (
    e: React.FormEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    if (inputMessage === "" && images.length === 0) return;
    try {
      setInputMessage("");
      setImages([]);
      if (images.length === 0) {
        const res = await requestApi("messages", "POST", {
          conversationId: conversationId,
          content: inputMessage,
        });
        console.log(res);
      } else {
        const formData = new FormData();
        images.forEach((image) => {
          formData.append("chats", image);
        });
        formData.append("conversationId", conversationId);
        formData.append("content", inputMessage);

        await requestApi("messages", "POST", formData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const callApiGetMessagesWithConversationId = async () => {
      setWaitingGetMessages(true);
      setMessages([]);
      const { data: messagesData } = await requestApi(
        `messages/${conversationId}?limit=20&direction=up`,
        "GET",
        null
      );
      setMessages(messagesData.metadata.reverse());
      setWaitingGetMessages(false);
      await requestApi(`conversations/seen/${conversationId}`, "POST", {});
      RemoveNotSeenMessage(conversationId);
    };
    callApiGetMessagesWithConversationId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId, setMessages]);

  useEffect(() => {
    const chatContent: any = chatContentRef.current;
    async function handleScroll() {
      if (
        messages.length !== 0 &&
        chatContent.scrollTop === 0 &&
        messages[0]?._id !== firstMessageId
      ) {
        setIsLoading(true);
        const response = await requestApi(
          `messages/${conversationId}?next=${messages[0]._id}&limit=20&direction=up`,
          "GET",
          null
        );
        if (response.data.metadata.length === 0) {
          setIsLoading(false);
          setFirstMessageId(messages[0]._id);
          return;
        }
        setIsLoading(false);
        // setMessages([...response.data.metadata.reverse(), ...messages]);
        updateMessagesUp(response.data.metadata.reverse());
        messageBoxRef.current.scrollIntoView({});
      }

      if (
        Math.ceil(chatContent.scrollTop) ===
          chatContent.scrollHeight - chatContent.clientHeight &&
        isShowBoxSearchMessage
      ) {
        const response = await requestApi(
          `messages/${conversationId}?next=${
            messages[messages.length - 1]._id
          }&limit=20&direction=down`,
          "GET",
          null
        );
        if (response.data.metadata.length === 0) {
          return;
        }
        console.log(response);
        // setMessages([...messages, ...response.data.metadata]);
        updateMessagesDown(response.data.metadata);
      }
    }

    chatContent.addEventListener("scroll", handleScroll);
    return () => {
      chatContent.removeEventListener("scroll", handleScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId, messages, firstMessageId, isShowBoxSearchMessage]);

  useEffect(() => {
    if (!pusherClient || !conversationId) return;
    const channel = pusherClient.subscribe(conversationId);

    channel.bind("message:new", (data: Message) => {
      updateMessagesDown([data]);
      requestApi(`conversations/seen/${conversationId}`, "POST", {});
      setIsHasNewMessage(true);
      // RemoveNotSeenMessage(conversationId);
    });
    channel.bind("message:update", (data: { updatedMessage: Message }) => {
      updateMessage(data.updatedMessage);
    });
    channel.bind("message:typing", (data: { userId: string }) => {
      setTyping([data.userId]);
      clearTimeout(clearTimerId.current);
      clearTimerId.current = setTimeout(() => {
        setTyping([]);
      }, 900);
    });

    return () => {
      pusherClient?.unsubscribe(conversationId);
      channel?.unbind("message:new");
      channel?.unbind("message:update");
      channel?.unbind("message:typing");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId, pusherClient]);

  useEffect(() => {
    if (debounceMessage !== "") {
      requestApi(`messages/typing`, "POST", {
        conversationId: conversationId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceMessage]);

  useEffect(() => {
    if (inputImageRef.current) {
      inputImageRef.current.value = "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  useEffect(() => {
    if (typing.length === 1 && typing[0] === currUserId) return;
    if (typing.length === 0) {
      typingRef.current.innerHTML = "";
    }
    if (typing.length === 1) {
      if (currConversation?.isGroup) {
        typingRef.current.innerHTML = `${
          currConversation.members.filter(
            (member) => member._id === typing[0]
          )[0].firstName
        } đang gõ...`;
      } else typingRef.current.innerHTML = "Đang gõ...";
    }
  }, [typing, currUserId, currConversation]);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current?.scrollIntoView({});
      setTimeout(() => {
        setIsShowOverlay(false);
        setIsHasNewMessage(false);
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typingRef.current, typing, isHasNewMessage, waitingGetMessages]);

  useEffect(() => {
    if (!isShowBoxSearchMessage) {
      setIsShowMessageWhenSearch(false);
    }
  }, [isShowBoxSearchMessage, setIsShowMessageWhenSearch]);

  let flagUserId = "";
  let isInBlock = false;
  let isFirstInBlock = false;

  const bgScrollbar = useColorModeValue("#e5e5e5", "#212427");

  const bgInput = useColorModeValue("#e5e5e5", "#212427");

  return (
    <>
      <VStack
        overflow="auto"
        h="100%"
        w="100%"
        p="10px"
        gap="0"
        ref={chatContentRef}
        opacity={isShowOverlay ? "0" : "1"}
        sx={{
          "&::-webkit-scrollbar": {
            width: "5px",
          },
          "&::-webkit-scrollbar-track": {
            width: "5px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: bgScrollbar,
            borderRadius: "24px",
          },
        }}
      >
        <Box flex="1"></Box>
        {isLoading && (
          <HStack justifyContent="center">
            <Spinner />
          </HStack>
        )}
        {messages.map((message, index, array) => {
          if (message.sender._id === flagUserId) {
            isFirstInBlock = false;
            isInBlock = true;

            if (
              array[index - 1]?.type !== MessageTypes.TEXT &&
              array[index - 1]?.type !== MessageTypes.IMAGE
            ) {
              isInBlock = false;
              isFirstInBlock = true;
            }
          } else {
            flagUserId = message.sender._id;
            isFirstInBlock = true;
            isInBlock = false;
          }

          const checkIsLastMessage = (i: number, arr: Message[]) => {
            let c = arr.length;
            while (
              arr[c - 1].type !== MessageTypes.TEXT &&
              arr[c - 1].type !== MessageTypes.IMAGE
            ) {
              c--;
            }
            if (i === c - 1) return true;
            else return false;
          };

          return (
            <HStack
              ref={index === 0 ? messageBoxRef : null}
              key={message._id + Math.random()}
              w="100%"
              justifyContent="center"
            >
              <MessageBox
                message={message}
                isLastMessage={checkIsLastMessage(index, array)}
                isInBlock={isInBlock}
                isFirstInBlock={isFirstInBlock}
              />
            </HStack>
          );
        })}
        <Text ref={typingRef}></Text>
        <Box ref={buttonRef}></Box>
      </VStack>
      {isShowOverlay && (
        <HStack
          position="absolute"
          right="0"
          bottom="60px"
          w="100%"
          h="calc(100% - 60px)"
          justifyContent="center"
          alignItems="center"
          bgColor="transparent"
        >
          <Spinner />
        </HStack>
      )}
      <HStack
        as="form"
        w="100%"
        h={images.length === 0 ? "90px" : "170px"}
        onSubmit={(e) => {
          handleSubmitSendMessage(e);
        }}
        p="0 10px 0 15px"
        gap="10px"
        bg={bgInput}
        borderRadius="15px"
      >
        <Tooltip
          label="Emoji"
          fontSize="12px"
          p="5px"
          hasArrow
          borderRadius="5px"
        >
          <Button
            w="36px"
            h="36px"
            borderRadius="50%"
            p="0"
            bgColor="transparent"
            fontSize="2rem"
            opacity=".5"
          >
            <BsEmojiSmile />
          </Button>
        </Tooltip>

        <Box
          flex="1"
          h={images.length === 0 ? "36px" : "116px"}
          borderRadius={images.length === 0 ? "999px" : "20px"}
          bgColor="transparent"
        >
          <HStack
            display={images.length === 0 ? "none" : "flex"}
            w="100%"
            h="80px"
            p="12px"
            gap="10px"
            overflow="overlay"
            bgColor="transparent"
          >
            <Button w="48px" h="48px" borderRadius="10px">
              <label htmlFor="images" style={{ cursor: "pointer" }}>
                <CustomIcons.icon_add_image />
              </label>
            </Button>
            {images.length !== 0 &&
              images.map((image) => {
                return (
                  <PreviewImage
                    key={image + Math.random()}
                    imgFile={image}
                    setImages={setImages}
                  />
                );
              })}
          </HStack>
          <HStack
            bgColor="transparent"
            alignItems="center"
            justifyContent="space-between"
            h="36px"
          >
            <Input
              fontSize="1.4rem"
              borderRadius="999px"
              value={inputMessage}
              placeholder="Write a message..."
              bgColor="transparent"
              outline="none"
              border="none"
              _focusVisible={{
                outline: "none",
              }}
              onChange={(e) => {
                setInputMessage(e.target.value);
              }}
            />
          </HStack>
        </Box>
        <Tooltip
          label="Attach file"
          fontSize="12px"
          p="5px"
          hasArrow
          borderRadius="5px"
        >
          <Button
            type="submit"
            w="36px"
            h="36px"
            borderRadius="50%"
            p="0"
            bgColor="transparent"
            fontSize="2rem"
            opacity=".5"
            as="label"
            htmlFor="images"
            cursor="pointer"
          >
            <RiAttachmentLine />
          </Button>
        </Tooltip>
        <Input
          display="none"
          accept=".jpg, .png, .jpeg"
          type="file"
          name="images"
          id="images"
          ref={inputImageRef}
          onChange={(e) => {
            setImages((prev) => {
              if (e.target.files && e.target.files[0]) {
                return [...prev, e.target.files[0]];
              } else return prev;
            });
          }}
        />

        <Tooltip
          label="Voice message"
          fontSize="12px"
          p="5px"
          hasArrow
          borderRadius="5px"
        >
          <Button
            type="submit"
            w="36px"
            h="36px"
            borderRadius="50%"
            p="0"
            bgColor="transparent"
            fontSize="2rem"
            opacity=".5"
          >
            <RiMicLine />
          </Button>
        </Tooltip>

        <Button
          type="submit"
          w="48px"
          h="48px"
          borderRadius="15px"
          p="0"
          bgColor="#db4663"
          fontSize="2rem"
          _hover={{ opacity: ".9" }}
        >
          <RiSendPlaneLine />
        </Button>
      </HStack>
    </>
  );
}

export default ChatContent;
