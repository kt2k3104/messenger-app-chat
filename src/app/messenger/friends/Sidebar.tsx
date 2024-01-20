"use client";

import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import CustomIcons from "~/app/components/Icon";
import useActiveList, { ActiveListStore } from "~/hooks/useActiveList";
import useUserInfo, { UserInfoState } from "~/hooks/useUserInfo";
import ModalFriendRequest from "./ModalFriendRequests";

function Sidebar() {
  const bg = useColorModeValue("#e5e5e5", "#ffffff1a");

  const {
    isOpen: isOpenModalFriendRequest,
    onOpen: onOpenModalFriendRequest,
    onClose: onCloseModalFriendRequest,
  } = useDisclosure();

  const friends = useUserInfo((state: UserInfoState) => state.friends);
  const friendRequests = useUserInfo(
    (state: UserInfoState) => state.friendRequests
  );
  const userActive = useActiveList((state: ActiveListStore) => state.members);

  return (
    <Box
      position="relative"
      w="360px"
      h="100%"
      borderRight="1px solid"
      borderColor={bg}
    >
      <Tooltip
        hasArrow
        label={"Lời mời kết bạn"}
        placement="bottom"
        fontSize="1.2rem"
        fontWeight="400"
        borderRadius="8px"
        p="5px"
      >
        <Avatar
          position="absolute"
          top="12px"
          right="12px"
          w="36px"
          h="36px"
          p="0"
          borderRadius="50%"
          onClick={onOpenModalFriendRequest}
          icon={<CustomIcons.icon_friend_request />}
          cursor="pointer"
          bgColor={bg}
        >
          {friendRequests.length > 0 && (
            <AvatarBadge
              top="-3"
              right="-1"
              border="1px solid"
              borderColor="papayawhip"
              bg="tomato"
              boxSize="1.25em"
            >
              {friendRequests.length}
            </AvatarBadge>
          )}
        </Avatar>
      </Tooltip>
      <ModalFriendRequest
        isOpenModalFriendRequest={isOpenModalFriendRequest}
        onOpenModalFriendRequest={onOpenModalFriendRequest}
        onCloseModalFriendRequest={onCloseModalFriendRequest}
      />

      <Text fontSize="2.4rem" fontWeight="700" m="12px 16px 4px">
        Danh sách bạn bè
      </Text>
      <Text fontSize="1.2rem" fontWeight="400" m="18px 15px">
        Bạn bè đang hoạt động{" "}
        {`(${
          friends.filter((user) => {
            return userActive.filter((id: any) => id === user._id).length > 0;
          }).length
        })`}
      </Text>
      {friends.map((user) => {
        return (
          <Button
            key={user._id}
            w="95%"
            h="52px"
            ml="8px"
            p="8px 16px"
            justifyContent="flex-start"
            bgColor="transparent"
            borderRadius="8px"
          >
            <Avatar
              mt="auto"
              src={
                user.avatar
                  ? user.avatar
                  : "https://scontent.fhan20-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=2b6aad&_nc_eui2=AeE-4fINDkTKpqp6AeNkaBwWso2H55p0AlGyjYfnmnQCUfpKyWf3qbpWB5GlYHhFJgjq-TbNpyj7ju6QXf36ElkA&_nc_ohc=OgbBqcsBbP8AX_9YNZ3&_nc_ht=scontent.fhan20-1.fna&oh=00_AfCcjusBrJFBUgXvN5BGR4d7_vuMDTjjMsaRcYUIbQaWDA&oe=65BF34F8"
              }
              size="md"
              m="0"
            >
              {userActive.findIndex((member) => {
                return member === user._id;
              }) >= 0 && <AvatarBadge boxSize="1.2rem" bg="green.500" />}
            </Avatar>
            <Text ml="8px" fontSize="1.4rem" fontWeight="500">
              {user.displayName}
            </Text>
          </Button>
        );
      })}
    </Box>
  );
}

export default Sidebar;
