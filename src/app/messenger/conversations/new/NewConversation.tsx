"use client";
import {
  Box,
  Button,
  HStack,
  Img,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";
import CustomIcons from "~/app/components/Icon";
import useConversations, { ConversationsState } from "~/hooks/useConversations";
import useLogic, { LogicState } from "~/hooks/useLogic";
import requestApi from "~/utils/api";

function NewConversation() {
  const [inputMessage, setInputMessage] = useState<string>("");
  const waitingForAddedToGroup = useLogic(
    (state: LogicState) => state.waitingForAddedToGroup
  );
  const setIsShowBoxNewConversation = useLogic(
    (state: LogicState) => state.setIsShowBoxNewConversation
  );
  const conversations = useConversations(
    (state: ConversationsState) => state.conversations
  );
  const setConversations = useConversations(
    (state: ConversationsState) => state.setConversations
  );
  const setCurrConversation = useConversations(
    (state: ConversationsState) => state.setCurrConversation
  );
  const setWaitingForAddedToGroup = useLogic(
    (state: LogicState) => state.setWaitingForAddedToGroup
  );
  const router = useRouter();

  const nameConversation = waitingForAddedToGroup
    .map((user, index) => {
      if (waitingForAddedToGroup.length === 1) return user.displayName;
      if (waitingForAddedToGroup.length === 2 && index === 0)
        return `${user.displayName}, ${waitingForAddedToGroup[1].displayName}`;
      if (waitingForAddedToGroup.length === 2 && index === 1) return;
      if (index === 0) return `${user.firstName}`;
      else return `, ${user.firstName}`;
    })
    .join("");

  let isGroup: boolean = false;

  const handleSubmitSendMessage = async (
    e: React.FormEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    if (inputMessage === "") return;

    try {
      setInputMessage("");
      if (waitingForAddedToGroup.length > 1) {
        isGroup = true;
      } else {
        isGroup = false;
      }
      const { data: newConv } = await requestApi("conversations", "POST", {
        name: nameConversation,
        isGroup: isGroup,
        members: waitingForAddedToGroup.map((user) => user._id),
      });
      await requestApi("messages", "POST", {
        conversationId: newConv.metadata._id,
        content: inputMessage,
      });
      setIsShowBoxNewConversation(false);
      setCurrConversation(newConv.metadata);
      setConversations([newConv.metadata, ...conversations]);
      router.push(`/messenger/conversations/${newConv.metadata._id}`);

      setWaitingForAddedToGroup([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <VStack
        h="calc(100vh - 115px)"
        overflowY="auto"
        flex="1"
        w="100%"
        p="40px 10px 10px"
        gap="0"
      >
        {waitingForAddedToGroup.length < 2 && (
          <Img
            src={
              waitingForAddedToGroup[0]?.avatar
                ? waitingForAddedToGroup[0]?.avatar
                : "https://scontent.fhan20-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=2b6aad&_nc_eui2=AeE-4fINDkTKpqp6AeNkaBwWso2H55p0AlGyjYfnmnQCUfpKyWf3qbpWB5GlYHhFJgjq-TbNpyj7ju6QXf36ElkA&_nc_ohc=OgbBqcsBbP8AX_9YNZ3&_nc_ht=scontent.fhan20-1.fna&oh=00_AfCcjusBrJFBUgXvN5BGR4d7_vuMDTjjMsaRcYUIbQaWDA&oe=65BF34F8"
            }
            alt="avt"
            w="60px"
            h="60px"
            borderRadius="50%"
            mr="5px"
          />
        )}
        {waitingForAddedToGroup.length > 1 && (
          <Box w="60px" h="60px" mr="5px" position="relative">
            <Img
              src={
                waitingForAddedToGroup[0].avatar
                  ? waitingForAddedToGroup[0].avatar
                  : "https://scontent.fhan20-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=2b6aad&_nc_eui2=AeE-4fINDkTKpqp6AeNkaBwWso2H55p0AlGyjYfnmnQCUfpKyWf3qbpWB5GlYHhFJgjq-TbNpyj7ju6QXf36ElkA&_nc_ohc=OgbBqcsBbP8AX_9YNZ3&_nc_ht=scontent.fhan20-1.fna&oh=00_AfCcjusBrJFBUgXvN5BGR4d7_vuMDTjjMsaRcYUIbQaWDA&oe=65BF34F8"
              }
              alt="avt"
              w="40px"
              h="40px"
              borderRadius="50%"
              position="absolute"
              bottom="0"
              left="0"
            />
            <Img
              src={
                waitingForAddedToGroup[1].avatar
                  ? waitingForAddedToGroup[1].avatar
                  : "https://scontent.fhan20-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=2b6aad&_nc_eui2=AeE-4fINDkTKpqp6AeNkaBwWso2H55p0AlGyjYfnmnQCUfpKyWf3qbpWB5GlYHhFJgjq-TbNpyj7ju6QXf36ElkA&_nc_ohc=OgbBqcsBbP8AX_9YNZ3&_nc_ht=scontent.fhan20-1.fna&oh=00_AfCcjusBrJFBUgXvN5BGR4d7_vuMDTjjMsaRcYUIbQaWDA&oe=65BF34F8"
              }
              alt="avt"
              w="40px"
              h="40px"
              borderRadius="50%"
              position="absolute"
              top="0"
              right="0"
              zIndex="0"
            />
          </Box>
        )}
        <Text mt="12px" fontSize="1.6rem" fontWeight="500">
          {waitingForAddedToGroup.map((user, index) => {
            if (waitingForAddedToGroup.length === 1) return user.displayName;
            if (waitingForAddedToGroup.length === 2 && index === 0)
              return `${user.displayName}, ${waitingForAddedToGroup[1].displayName}`;
            if (waitingForAddedToGroup.length === 2 && index === 1) return;
            if (index === 0) return `${user.firstName}`;
            else return `, ${user.firstName}`;
          })}
        </Text>
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

export default memo(NewConversation);
