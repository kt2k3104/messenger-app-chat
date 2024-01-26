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
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import useUserInfo, { Message, UserInfoState } from "~/hooks/useUserInfo";
import usePusher, { PusherState } from "~/hooks/usePusher";
import requestApi from "~/utils/api";
import MessageBox, { MessageTypes } from "./MessageBox";
import CustomIcons from "~/app/components/Icon";
import PreviewImage from "./PreviewImage";
import { useDebounce } from "use-debounce";
import useLogic, { LogicState } from "~/hooks/useLogic";
import useConversations, { ConversationsState } from "~/hooks/useConversations";

function ChatContent({ conversationId }: { conversationId: any }) {
  const [images, setImages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [debounceMessage] = useDebounce(inputMessage, 500);
  const [typing, setTyping] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [firstMessageId, setFirstMessageId] = useState<string>("");

  const messages = useConversations(
    (state: ConversationsState) => state.messages
  );
  const setMessages = useConversations(
    (state: ConversationsState) => state.setMessages
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
        await requestApi("messages", "POST", {
          conversationId: conversationId,
          content: inputMessage,
        });
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
      const { data: messagesData } = await requestApi(
        `messages/${conversationId}?limit=20&direction=up`,
        "GET",
        null
      );
      setMessages(messagesData.metadata.reverse());
      await requestApi(`conversations/seen/${conversationId}`, "POST", {});
    };
    callApiGetMessagesWithConversationId();
  }, [conversationId, setMessages]);

  useEffect(() => {
    const chatContent: any = chatContentRef.current;
    async function handleScroll() {
      if (chatContent.scrollTop === 0 && messages[0]._id !== firstMessageId) {
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
        setMessages([...response.data.metadata.reverse(), ...messages]);
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
        setMessages([...messages, ...response.data.metadata]);
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
      setMessages([...messages, data]);
      requestApi(`conversations/seen/${conversationId}`, "POST", {});
    });
    channel.bind("message:update", (data: { updatedMessage: Message }) => {
      setMessages(
        messages.map((message: Message) => {
          if (message._id === data.updatedMessage._id)
            return data.updatedMessage;
          else return message;
        })
      );
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
      buttonRef.current.scrollIntoView({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length === 0, typingRef.current, typing]);

  useEffect(() => {
    if (!isShowBoxSearchMessage) {
      setIsShowMessageWhenSearch(false);
    }
  }, [isShowBoxSearchMessage, setIsShowMessageWhenSearch]);

  let flagUserId = "";
  let isInBlock = false;
  let isLastInBlock = false;

  return (
    <VStack flex="1" w="100%">
      <VStack
        overflow="auto"
        h={
          images.length > 0 && isShowBoxSearchMessage
            ? "calc(100vh - 252px)"
            : images.length > 0 && !isShowBoxSearchMessage
            ? "calc(100vh - 196px)"
            : images.length === 0 && isShowBoxSearchMessage
            ? "calc(100vh - 172px)"
            : "calc(100vh - 116px)"
        }
        w="100%"
        p="10px"
        gap="0"
        ref={chatContentRef}
      >
        <Box flex="1"></Box>
        {isLoading && (
          <HStack justifyContent="center">
            <Spinner />
          </HStack>
        )}
        {messages.map((message, index, array) => {
          if (message.sender._id === flagUserId) {
            if (message.sender._id !== array[index + 1]?.sender._id) {
              isInBlock = true;
              isLastInBlock = true;
            } else {
              isInBlock = true;
              isLastInBlock = false;
              if (
                array[index + 1]?.type !== MessageTypes.TEXT &&
                array[index + 1]?.type !== MessageTypes.IMAGE
              ) {
                isInBlock = true;
                isLastInBlock = true;
              }
            }
            if (
              array[index - 1]?.type !== MessageTypes.TEXT &&
              array[index - 1]?.type !== MessageTypes.IMAGE
            ) {
              isInBlock = false;
            }
          } else {
            flagUserId = message.sender._id;

            if (message.sender._id !== array[index + 1]?.sender._id) {
              isInBlock = false;
              isLastInBlock = true;
            } else {
              isInBlock = false;
              isLastInBlock = false;
              if (
                array[index + 1]?.type !== MessageTypes.TEXT &&
                array[index + 1]?.type !== MessageTypes.IMAGE
              ) {
                isInBlock = false;
                isLastInBlock = true;
              }
            }
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
              key={message._id}
              w="100%"
              justifyContent="center"
            >
              <MessageBox
                message={message}
                isLastMessage={checkIsLastMessage(index, array)}
                isInBlock={isInBlock}
                isLastInBlock={isLastInBlock}
              />
            </HStack>
          );
        })}
        <Text ref={typingRef}></Text>
        <Box ref={buttonRef}></Box>
      </VStack>
      <HStack
        as="form"
        w="100%"
        h={images.length === 0 ? "60px" : "140px"}
        onSubmit={(e) => {
          handleSubmitSendMessage(e);
        }}
        p="0 10px 0 5px"
        gap="0"
      >
        <Tooltip
          label="Mở hành động khác"
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
            mt="auto"
            mb="12px"
            bgColor="transparent"
          >
            <CustomIcons.icon_more />
          </Button>
        </Tooltip>
        <Tooltip
          label="Đính kèm file"
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
            mt="auto"
            mb="12px"
            bgColor="transparent"
          >
            <label htmlFor="image" style={{ cursor: "pointer" }}>
              <CustomIcons.icon_send_image />
            </label>
          </Button>
        </Tooltip>
        <Tooltip
          label="Chọn nhãn dán"
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
            mt="auto"
            mb="12px"
            bgColor="transparent"
          >
            <CustomIcons.icon_select_sticker />
          </Button>
        </Tooltip>
        <Tooltip
          label="Chọn file gif"
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
            mt="auto"
            mb="12px"
            mr="8px"
            bgColor="transparent"
          >
            <CustomIcons.icon_select_gif_file />
          </Button>
        </Tooltip>

        <Input
          display="none"
          accept=".jpg, .png, .jpeg"
          type="file"
          name="image"
          id="image"
          ref={inputImageRef}
          onChange={(e) => {
            setImages((prev) => {
              if (e.target.files && e.target.files[0]) {
                return [...prev, e.target.files[0]];
              } else return prev;
            });
          }}
        />

        <Box
          flex="1"
          h={images.length === 0 ? "36px" : "116px"}
          borderRadius={images.length === 0 ? "999px" : "20px"}
          bgColor="rgba(134, 142, 153, 0.1)"
        >
          <HStack
            display={images.length === 0 ? "none" : "flex"}
            w="100%"
            h="80px"
            p="12px"
            gap="10px"
            overflow="overlay"
          >
            <Button w="48px" h="48px" borderRadius="10px" bgColor="#e4e6ea">
              <label htmlFor="image">
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
          <HStack alignItems="center" justifyContent="space-between" h="36px">
            <Input
              fontSize="1.4rem"
              borderRadius="999px"
              value={inputMessage}
              placeholder="Aa"
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
            <Button
              flexShrink="0"
              type="submit"
              w="36px"
              h="36px"
              borderRadius="50%"
              p="0"
              mt="auto"
              mb="12px"
              bgColor="transparent"
            >
              <CustomIcons.icon_select_emoji />
            </Button>
          </HStack>
        </Box>
        {inputMessage !== "" || images.length !== 0 ? (
          <Button
            type="submit"
            w="36px"
            h="36px"
            borderRadius="50%"
            p="0"
            mt="auto"
            mb="12px"
            ml="8px"
            bgColor="transparent"
          >
            <CustomIcons.icon_send_message />
          </Button>
        ) : (
          <Button
            type="submit"
            w="36px"
            h="36px"
            borderRadius="50%"
            p="0"
            mt="auto"
            mb="12px"
            ml="8px"
            bgColor="transparent"
          >
            <CustomIcons.icon_like />
          </Button>
        )}
      </HStack>
    </VStack>
  );
}

export default ChatContent;
