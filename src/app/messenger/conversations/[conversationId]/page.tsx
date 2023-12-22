"use client";

import { Box, Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import CustomIcons from "~/app/components/Icon";
import useUserInfo, { Message, UserInfoState } from "~/hooks/useUserInfo";
import requestApi from "~/utils/api";
import HeaderConversation from "./HeaderConversation";
import SidebarRight from "./SidebarRight";
// import initPusherCLient from "~/utils/pusher";
// import { pusherClient } from "~/utils/pusher";
import usePusher, { PusherState } from "~/hooks/usePusher";
import MessageBox from "./MessageBox";

export interface IParams {
  conversationId: string;
}

const ConversationBody = ({ params }: { params: IParams }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const user = useUserInfo((state: UserInfoState) => state.basicUserInfo);
  const pusherClient = usePusher((state: PusherState) => state.pusherClient);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleSubmitSendMessage = async (
    e: React.FormEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    if (inputMessage === "") return;

    try {
      setInputMessage("");
      const { data } = await requestApi("messages", "POST", {
        conversationId: params.conversationId,
        content: inputMessage,
      });
      // const { data } = await axios.post(
      //   `${process.env.NEXT_PUBLIC_API_URL}messages`,
      //   {
      //     conversationId: params.conversationId,
      //     content: inputMessage,
      //   },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      //       "x-client-id": `${user?._id}`,
      //     },
      //   }
      // );

      console.log(data.metadata);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const callApi = async () => {
      const { data: messagesData } = await requestApi(
        `messages/all/${params.conversationId}`,
        "GET",
        null
      );
      setMessages(messagesData.metadata.reverse());
      await requestApi(
        `conversations/seen/${params.conversationId}`,
        "POST",
        {}
      );
    };
    callApi();
  }, [params.conversationId]);

  useEffect(() => {
    // let pusherClient: any = null;
    // const accessToken = localStorage.getItem("accessToken") || "";
    // if (accessToken && user?._id) {
    //   pusherClient = initPusherCLient(accessToken, user._id);
    // } else return;
    if (!pusherClient || !params.conversationId) return;
    const channel = pusherClient.subscribe(params.conversationId);

    channel.bind("message:new", (data: Message) => {
      setMessages((prev) => [...prev, data]);
      requestApi(`conversations/seen/${params.conversationId}`, "POST", {});
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
      pusherClient?.unsubscribe(params.conversationId);
      channel?.unbind("message:new");
      channel?.unbind("message:update");
    };
  }, [params.conversationId, pusherClient]);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.scrollIntoView({
        // behavior: "smooth",
        // block: "nearest",
        // inline: "start",
      });
    }
  }, [messages]);

  // useEffect(() => {
  //   // let pusherClient: any = null;
  //   // const accessToken = localStorage.getItem("accessToken") || "";
  //   // if (accessToken && user?._id) {
  //   //   pusherClient = initPusherCLient(accessToken, user._id);
  //   // } else return;
  //   if (!pusherClient || !params.conversationId) return;
  //   const channel = pusherClient.subscribe(params.conversationId);

  //   channel.bind("message:new", (data: Message) => {
  //     console.log(data);
  //     setMessages((prev) => [...prev, data]);
  //   });

  //   return () => {
  //     pusherClient?.unsubscribe(params.conversationId);
  //     channel?.unbind("message:new");
  //   };
  // }, [params.conversationId, pusherClient]);

  return (
    <HStack h="100vh" w="100%" gap="0">
      <VStack h="100%" flex="1" gap="0">
        <HeaderConversation />
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
      </VStack>
      <SidebarRight />
    </HStack>
  );
};

export default ConversationBody;
