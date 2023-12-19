"use client";

import { Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CustomIcons from "~/app/components/Icon";
import useUserInfo, { Message, UserInfoState } from "~/hooks/useUserInfo";
import requestApi from "~/utils/api";
import HeaderConversation from "./HeaderConversation";
import SidebarRight from "./SidebarRight";

interface IParams {
  conversationId: string;
}

const ConversationBody = ({ params }: { params: IParams }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const user = useUserInfo((state: UserInfoState) => state.basicUserInfo);

  const handleSubmitSendMessage = async (
    e: React.FormEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    if (inputMessage === "") return;

    try {
      const { data } = await requestApi("messages", "POST", {
        conversationId: params.conversationId,
        content: inputMessage,
      });

      setInputMessage("");

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
      setMessages(messagesData.metadata);
    };
    callApi();
  }, [params.conversationId]);

  // useEffect(() => {
  //   if (!currConversation) return;

  //   // let pusherClient: PusherClient | null = null;
  //   // const accessToken = localStorage.getItem("accessToken") || "";
  //   // if (accessToken && user?._id) {
  //   //   pusherClient = initPusherClient(accessToken, user?._id);
  //   // } else return;

  //   console.log(pusherClient);

  //   if (!pusherClient || !params.conversationId) return;
  //   pusherClient.subscribe(params.conversationId);

  //   pusherClient.bind("message:new", (data: Message) => {
  //     console.log(data);
  //     setMessages((prev) => [...prev, data]);
  //   });

  //   return () => {
  //     pusherClient?.unsubscribe(params.conversationId);
  //     pusherClient?.unbind("message:new");
  //   };
  // }, [params.conversationId, currConversation, pusherClient]);

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
          {messages.map((message) => {
            return (
              <HStack key={message._id} w="100%" h="30px">
                {message.sender._id === user?._id ? (
                  <Text ml="auto">
                    {message.sender.firstName}: {message.content}
                  </Text>
                ) : (
                  <Text mr="auto">
                    {message.sender.firstName}: {message.content}
                  </Text>
                )}
              </HStack>
            );
          })}
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
