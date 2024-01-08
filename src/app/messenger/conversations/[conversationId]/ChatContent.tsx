"use client";
import { Box, Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import useUserInfo, { Message, UserInfoState } from "~/hooks/useUserInfo";
import usePusher, { PusherState } from "~/hooks/usePusher";
import requestApi from "~/utils/api";
import MessageBox from "./MessageBox";
import CustomIcons from "~/app/components/Icon";
import PreviewImage from "./PreviewImage";
import { useDebounce } from "use-debounce";

function ChatContent({ conversationId }: { conversationId: any }) {
  const [images, setImages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [debounceMessage] = useDebounce(inputMessage, 500);
  const buttonRef = useRef<HTMLDivElement>(null);
  const userId = useUserInfo((state: UserInfoState) => state.userInfo?._id);

  const clearTimerId = useRef<any>(null);
  const typingRef = useRef<any>(null);

  useEffect(() => {
    if (debounceMessage !== "") {
      requestApi(`messages/typing`, "POST", {
        conversationId: conversationId,
      });
    }
  }, [debounceMessage]);

  const handleSubmitSendMessage = async (
    e: React.FormEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    if (inputMessage === "" && images.length === 0) return;
    try {
      setInputMessage("");
      if (images.length === 0) {
        await requestApi("messages", "POST", {
          conversationId: conversationId,
          content: inputMessage,
        });
      } else {
        const formData = new FormData();
        images.forEach((image) => {
          console.log(image);
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
  const pusherClient = usePusher((state: PusherState) => state.pusherClient);

  useEffect(() => {
    const callApi = async () => {
      const { data: messagesData } = await requestApi(
        `messages/all/${conversationId}`,
        "GET",
        null
      );
      setMessages(messagesData.metadata.reverse());
      await requestApi(`conversations/seen/${conversationId}`, "POST", {});
    };
    callApi();
  }, [conversationId]);

  useEffect(() => {
    if (!pusherClient || !conversationId) return;
    const channel = pusherClient.subscribe(conversationId);

    channel.bind("message:new", (data: Message) => {
      setMessages((prev) => [...prev, data]);
      requestApi(`conversations/seen/${conversationId}`, "POST", {});
    });
    channel.bind("message:update", (data: { updatedMessage: Message }) => {
      setMessages((messages) => {
        return messages.map((message: Message) => {
          if (message._id === data.updatedMessage._id)
            return data.updatedMessage;
          else return message;
        });
      });
    });
    channel.bind("message:typing", (data: { userId: string }) => {
      if (data.userId === userId) {
        return;
      }
      typingRef.current.innerHTML = "Đang gõ...";
      clearTimeout(clearTimerId.current);
      clearTimerId.current = setTimeout(() => {
        typingRef.current.innerHTML = "";
      }, 900);
    });

    return () => {
      pusherClient?.unsubscribe(conversationId);
      channel?.unbind("message:new");
      channel?.unbind("message:update");
      channel?.unbind("message:typing");
    };
  }, [conversationId, pusherClient]);
  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.scrollIntoView({});
    }
  }, [messages, typingRef.current]);

  let flagUserId = "";
  let isInBlock = false;
  let isLastInBlock = false;
  return (
    <VStack flex="1" w="100%">
      <VStack
        overflow="auto"
        h={images.length > 0 ? "calc(100vh - 196px)" : "calc(100vh - 116px)"}
        w="100%"
        p="10px"
        gap="0"
      >
        <Box flex="1"></Box>
        {messages.map((message, index, array) => {
          if (message.sender._id === flagUserId) {
            if (message.sender._id !== array[index + 1]?.sender._id) {
              isInBlock = true;
              isLastInBlock = true;
            } else {
              isInBlock = true;
              isLastInBlock = false;
            }
          } else {
            flagUserId = message.sender._id;
            if (message.sender._id !== array[index + 1]?.sender._id) {
              isInBlock = false;
              isLastInBlock = true;
            } else {
              isInBlock = false;
              isLastInBlock = false;
            }
          }
          return (
            <HStack key={message._id} w="100%">
              <MessageBox
                message={message}
                isLastMessage={index === messages.length - 1 ? true : false}
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
      >
        <Button w="36px" h="36px" borderRadius="50%" p="0" mt="auto" mb="12px">
          <label htmlFor="image" style={{ cursor: "pointer" }}>
            <CustomIcons.icon_send_image />
          </label>
        </Button>
        <Input
          display="none"
          accept=".jpg, .png, .jpeg"
          type="file"
          name="image"
          id="image"
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
                {" "}
                <CustomIcons.icon_add_image />
              </label>
            </Button>
            {images.length !== 0 &&
              images.map((image) => {
                return <PreviewImage imgFile={image} setImages={setImages} />;
              })}
          </HStack>
          <Input
            fontSize="1.4rem"
            h="36px"
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
        </Box>
        {(inputMessage !== "" || images.length !== 0) && (
          <Button
            type="submit"
            w="36px"
            h="36px"
            borderRadius="50%"
            p="0"
            mt="auto"
            mb="12px"
          >
            <CustomIcons.icon_send_message />
          </Button>
        )}
      </HStack>
    </VStack>
  );
}

export default ChatContent;
