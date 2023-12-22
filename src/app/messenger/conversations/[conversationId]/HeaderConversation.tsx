"use client";

import { Button, HStack, Img, Text } from "@chakra-ui/react";
import CustomIcons from "~/app/components/Icon";
import useConversations, { ConversationsState } from "~/hooks/useConversations";
import useLogic, { LogicState } from "~/hooks/useLogic";
import useUserInfo, { UserInfoState } from "~/hooks/useUserInfo";

export default function HeaderConversation() {
  const currConversation = useConversations(
    (state: ConversationsState) => state.currConversation
  );
  const userId = useUserInfo(
    (state: UserInfoState) => state.basicUserInfo?._id
  );
  const isShowSidebarRight = useLogic(
    (state: LogicState) => state.isShowSidebarRight
  );
  const setIsShowSidebarRight = useLogic(
    (state: LogicState) => state.setIsShowSidebarRight
  );

  return (
    <HStack
      alignItems="center"
      justifyContent="space-between"
      w="100%"
      h="56px"
      boxShadow="0 0 4px rgba(0, 0, 0, 0.2)"
    >
      <Button
        display={"flex"}
        h="48px"
        ml="10px"
        p="5px 8px"
        _hover={{
          bgColor: "bgLightActive.100",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        bgColor="transparent"
      >
        <Img
          src={
            currConversation?.thumb
              ? currConversation.thumb
              : "/images/no-image.png"
          }
          alt="avt"
          w="36px"
          h="36px"
          borderRadius="50%"
        />
        <Text fontWeight="500" ml="5px" fontSize="1.5rem">
          {currConversation?.isGroup
            ? currConversation.name
            : currConversation?.members[0]._id === userId
            ? currConversation?.members[1].displayName
            : currConversation?.members[0].displayName}
        </Text>
      </Button>
      <HStack mr="10px" gap="8px">
        <Button
          w="36px"
          h="36px"
          borderRadius="50%"
          color="#377af6"
          bgColor="transparent"
        >
          <CustomIcons.icon_call />
        </Button>
        <Button
          w="36px"
          h="36px"
          borderRadius="50%"
          color="#377af6"
          bgColor="transparent"
        >
          <CustomIcons.icon_video_call />
        </Button>
        {!isShowSidebarRight ? (
          <Button
            p="0"
            w="36px"
            h="36px"
            borderRadius="50%"
            color="#fff"
            bgColor="transparent"
            onClick={() => {
              setIsShowSidebarRight(true);
            }}
          >
            <CustomIcons.icon_open_more />
          </Button>
        ) : (
          <Button
            p="0"
            w="36px"
            h="36px"
            borderRadius="50%"
            color="#fff"
            bgColor="transparent"
            onClick={() => {
              setIsShowSidebarRight(false);
            }}
          >
            <CustomIcons.icon_close_more />
          </Button>
        )}
      </HStack>
    </HStack>
  );
}
