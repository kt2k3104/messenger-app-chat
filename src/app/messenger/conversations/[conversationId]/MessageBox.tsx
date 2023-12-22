"use client";
import { Box, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import useUserInfo, { Message, UserInfoState } from "~/hooks/useUserInfo";

interface IMessageBoxProps {
  message: Message;
  isLastMessage: boolean;
}

function MessageBox({ message, isLastMessage }: IMessageBoxProps) {
  const userId = useUserInfo(
    (state: UserInfoState) => state.basicUserInfo?._id
  );

  return (
    <>
      {message.sender._id === userId ? (
        <>
          <Text ml="auto">
            {message.sender.firstName}: {message.content}
          </Text>
          {isLastMessage &&
            message.seenUsers?.map((user) => {
              return (
                <Text
                  key={user._id}
                  ml="auto"
                  fontSize="1.2rem"
                  color="gray.500"
                >
                  {user.firstName}
                </Text>
              );
            })}
        </>
      ) : (
        <>
          <Text mr="auto">
            {message.sender.firstName}: {message.content}
          </Text>
          {isLastMessage &&
            message.seenUsers?.map((user) => {
              return (
                <Text
                  ml="auto"
                  fontSize="1.2rem"
                  color="gray.500"
                  key={user._id}
                >
                  {user.firstName}
                </Text>
              );
            })}
        </>
      )}
    </>
  );
}

export default MessageBox;
