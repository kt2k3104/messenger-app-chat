"use client";
import { Avatar, AvatarBadge, Box, Img } from "@chakra-ui/react";
import useActiveList, { ActiveListStore } from "~/hooks/useActiveList";
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
  const userId = useUserInfo((state: UserInfoState) => state.userInfo?._id);
  const memberOnline = useActiveList((state: ActiveListStore) => state.members);

  return (
    <>
      {conversation?.members?.filter((user) => {
        return user._id !== userId;
      }).length < 2 && (
        <Avatar
          src={
            conversation?.members?.filter((user) => {
              return user._id !== userId;
            })[0]?.avatar
              ? conversation?.members?.filter((user) => {
                  return user._id !== userId;
                })[0]?.avatar
              : "https://scontent.fhan14-5.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=YknWlsUwj4wAX9Xrcoh&_nc_ht=scontent.fhan14-5.fna&oh=00_AfDXmRAlUkJnACxAqR1G5BxGq7Zeaun_IC3chAlXLs0LWA&oe=6617F9F8"
          }
          w={size === "sm" ? "36px" : size === "md" ? "48px" : "80px"}
          h={size === "sm" ? "36px" : size === "md" ? "48px" : "80px"}
          borderRadius="50%"
          mr="5px"
        >
          {conversation.members.filter((user) => {
            return memberOnline
              .filter((id) => id !== userId)
              .includes(user._id);
          }).length > 0 && (
            <AvatarBadge
              boxSize={
                size === "sm" ? "1.4rem" : size === "md" ? "1.6rem" : "0rem"
              }
              bg="green.500"
            />
          )}
        </Avatar>
      )}
      {conversation?.members?.filter((user) => {
        return user._id !== userId;
      }).length > 1 &&
        conversation.thumb && (
          <Avatar
            src={conversation.thumb}
            w={size === "sm" ? "36px" : size === "md" ? "48px" : "80px"}
            h={size === "sm" ? "36px" : size === "md" ? "48px" : "80px"}
            borderRadius="50%"
            mr="5px"
          >
            {conversation.members.filter((user) => {
              return memberOnline
                .filter((id) => id !== userId)
                .includes(user._id);
            }).length > 0 && (
              <AvatarBadge
                boxSize={
                  size === "sm" ? "1.4rem" : size === "md" ? "1.6rem" : "0rem"
                }
                bg="green.500"
              />
            )}
          </Avatar>
        )}
      {conversation?.members?.filter((user) => {
        return user._id !== userId;
      }).length > 1 &&
        !conversation.thumb && (
          <Box
            w={size === "sm" ? "36px" : size === "md" ? "48px" : "80px"}
            h={size === "sm" ? "36px" : size === "md" ? "48px" : "80px"}
            mr="5px"
            position="relative"
          >
            <Avatar
              src={
                conversation?.members?.filter((user) => {
                  return user._id !== userId;
                })[0].avatar
                  ? conversation?.members?.filter((user) => {
                      return user._id !== userId;
                    })[0].avatar
                  : "https://scontent.fhan14-5.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=YknWlsUwj4wAX9Xrcoh&_nc_ht=scontent.fhan14-5.fna&oh=00_AfDXmRAlUkJnACxAqR1G5BxGq7Zeaun_IC3chAlXLs0LWA&oe=6617F9F8"
              }
              w={size === "sm" ? "24px" : size === "md" ? "32px" : "54px"}
              h={size === "sm" ? "24px" : size === "md" ? "32px" : "54px"}
              borderRadius="50%"
              position="absolute"
              bottom="0"
              left="0"
            >
              {conversation.members.filter((user) => {
                return memberOnline
                  .filter((id) => id !== userId)
                  .includes(user._id);
              }).length > 0 && (
                <AvatarBadge
                  boxSize={
                    size === "sm" ? "1.4rem" : size === "md" ? "1.6rem" : "0rem"
                  }
                  bg="green.500"
                />
              )}
            </Avatar>
            <Avatar
              src={
                conversation?.members?.filter((user) => {
                  return user._id !== userId;
                })[1].avatar
                  ? conversation?.members?.filter((user) => {
                      return user._id !== userId;
                    })[1].avatar
                  : "https://scontent.fhan14-5.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=YknWlsUwj4wAX9Xrcoh&_nc_ht=scontent.fhan14-5.fna&oh=00_AfDXmRAlUkJnACxAqR1G5BxGq7Zeaun_IC3chAlXLs0LWA&oe=6617F9F8"
              }
              w={size === "sm" ? "24px" : size === "md" ? "32px" : "54px"}
              h={size === "sm" ? "24px" : size === "md" ? "32px" : "54px"}
              borderRadius="50%"
              position="absolute"
              top="0"
              right="0"
              zIndex="0"
            >
              {conversation.members.filter((user) => {
                return memberOnline
                  .filter((id) => id !== userId)
                  .includes(user._id);
              }).length > 0 && (
                <AvatarBadge
                  boxSize={
                    size === "sm" ? "1.4rem" : size === "md" ? "1.6rem" : "0rem"
                  }
                  bg="green.500"
                />
              )}
            </Avatar>
          </Box>
        )}
    </>
  );
}

export default ThumbConversation;
