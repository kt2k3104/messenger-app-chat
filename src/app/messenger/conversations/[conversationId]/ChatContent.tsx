"use client";
import { Box, Button, HStack, Input, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

import { Message } from "~/hooks/useUserInfo";
import usePusher, { PusherState } from "~/hooks/usePusher";
import requestApi from "~/utils/api";
import MessageBox from "./MessageBox";
import CustomIcons from "~/app/components/Icon";

function ChatContent({ conversationId }: { conversationId: any }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const buttonRef = useRef<HTMLDivElement>(null);
  const handleSubmitSendMessage = async (
    e: React.FormEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    if (inputMessage === "") return;
    try {
      setInputMessage("");
      await requestApi("messages", "POST", {
        conversationId: conversationId,
        content: inputMessage,
      });
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

    return () => {
      pusherClient?.unsubscribe(conversationId);
      channel?.unbind("message:new");
      channel?.unbind("message:update");
    };
  }, [conversationId, pusherClient]);
  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.scrollIntoView({});
    }
  }, [messages]);
  return (
    <>
      <VStack
        h="calc(100vh - 120px)"
        overflowY="auto"
        flex="1"
        w="100%"
        p="10px"
      >
        {messages.map((message, index) => {
          return (
            <HStack key={message._id} w="100%" h="30px">
              <MessageBox
                message={message}
                isLastMessage={index === messages.length - 1 ? true : false}
              />
            </HStack>
          );
        })}
        <Box ref={buttonRef}></Box>
      </VStack>
      <HStack
        as="form"
        w="100%"
        h="60px"
        onSubmit={(e) => {
          handleSubmitSendMessage(e);
        }}
        pl="5px"
        pr="10px"
      >
        <Input
          fontSize="1.4rem"
          h="36px"
          flex="1"
          value={inputMessage}
          placeholder="Aa"
          onChange={(e) => {
            setInputMessage(e.target.value);
          }}
        />
        {inputMessage !== "" && (
          <Button type="submit">
            <CustomIcons.icon_send_message />
          </Button>
        )}
      </HStack>
    </>
  );
}

export default ChatContent;
