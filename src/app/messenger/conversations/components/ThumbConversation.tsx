"use client";
import { Box, Img } from "@chakra-ui/react";
import useUserInfo, { Conversation, UserInfoState } from "~/hooks/useUserInfo";

interface ISizeThumb {
  size?: "sm" | "md" | "lg";
}

function ThumbConversation({
  conversation,
  size,
}: {
  conversation: Conversation;
  size: ISizeThumb["size"];
}) {
  const userId = useUserInfo(
    (state: UserInfoState) => state.basicUserInfo?._id
  );
  return (
    <>
      {conversation.members.filter((user) => {
        return user._id !== userId;
      }).length < 2 && (
        <Img
          src={
            conversation.members.filter((user) => {
              return user._id !== userId;
            })[0]?.avatar
              ? conversation.members.filter((user) => {
                  return user._id !== userId;
                })[0]?.avatar
              : "/images/no-image.png"
          }
          alt="avt"
          w={size === "sm" ? "36px" : size === "md" ? "48px" : "80px"}
          h={size === "sm" ? "36px" : size === "md" ? "48px" : "80px"}
          borderRadius="50%"
          mr="5px"
        />
      )}
      {conversation.members.filter((user) => {
        return user._id !== userId;
      }).length > 1 &&
        conversation.thumb && (
          <Img
            src={conversation.thumb}
            alt="avt"
            w={size === "sm" ? "36px" : size === "md" ? "48px" : "80px"}
            h={size === "sm" ? "36px" : size === "md" ? "48px" : "80px"}
            borderRadius="50%"
            mr="5px"
          />
        )}
      {conversation.members.filter((user) => {
        return user._id !== userId;
      }).length > 1 &&
        !conversation.thumb && (
          <Box
            w={size === "sm" ? "36px" : size === "md" ? "48px" : "80px"}
            h={size === "sm" ? "36px" : size === "md" ? "48px" : "80px"}
            mr="5px"
            position="relative"
          >
            <Img
              src={
                conversation.members.filter((user) => {
                  return user._id !== userId;
                })[0].avatar
                  ? conversation.members.filter((user) => {
                      return user._id !== userId;
                    })[0].avatar
                  : "/images/no-image.png"
              }
              alt="avt"
              w={size === "sm" ? "24px" : size === "md" ? "32px" : "54px"}
              h={size === "sm" ? "24px" : size === "md" ? "32px" : "54px"}
              borderRadius="50%"
              position="absolute"
              bottom="0"
              left="0"
            />
            <Img
              src={
                conversation.members.filter((user) => {
                  return user._id !== userId;
                })[1].avatar
                  ? conversation.members.filter((user) => {
                      return user._id !== userId;
                    })[1].avatar
                  : "/images/no-image.png"
              }
              alt="avt"
              w={size === "sm" ? "24px" : size === "md" ? "32px" : "54px"}
              h={size === "sm" ? "24px" : size === "md" ? "32px" : "54px"}
              borderRadius="50%"
              position="absolute"
              top="0"
              right="0"
              zIndex="0"
            />
          </Box>
        )}
    </>
  );
}

export default ThumbConversation;
