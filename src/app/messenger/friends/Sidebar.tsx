"use client";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  AvatarBadge,
  Box,
  Button,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { TfiMoreAlt } from "react-icons/tfi";

import CustomIcons from "~/app/components/Icon";
import useActiveList, { ActiveListStore } from "~/hooks/useActiveList";
import useUserInfo, { UserInfoState } from "~/hooks/useUserInfo";
import ModalFriendRequest from "./ModalFriendRequests";
import { useRef } from "react";
import useConversations, { ConversationsState } from "~/hooks/useConversations";
import requestApi from "~/utils/api";
import { useRouter } from "next/navigation";

function Sidebar() {
  const friends = useUserInfo((state: UserInfoState) => state.friends);
  const friendRequests = useUserInfo(
    (state: UserInfoState) => state.friendRequests
  );
  const conversations = useConversations(
    (state: ConversationsState) => state.conversations
  );
  const removeFriend = useUserInfo(
    (state: UserInfoState) => state.removeFriend
  );
  const userActive = useActiveList((state: ActiveListStore) => state.members);

  const cancelRef = useRef<any>();

  const bg = useColorModeValue("#e5e5e5", "#ffffff1a");
  const router = useRouter();

  const {
    isOpen: isOpenModalFriendRequest,
    onOpen: onOpenModalFriendRequest,
    onClose: onCloseModalFriendRequest,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          <HStack
            key={user._id}
            w="95%"
            h="52px"
            ml="8px"
            p="8px 16px"
            justifyContent="flex-start"
            bgColor="transparent"
            borderRadius="8px"
            _hover={{
              bgColor: "bgLightActive.100",
            }}
            role="group"
          >
            <Avatar
              mt="auto"
              src={
                user.avatar
                  ? user.avatar
                  : "https://scontent.fhan14-5.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=YknWlsUwj4wAX9Xrcoh&_nc_ht=scontent.fhan14-5.fna&oh=00_AfDXmRAlUkJnACxAqR1G5BxGq7Zeaun_IC3chAlXLs0LWA&oe=6617F9F8"
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

            <Popover>
              <PopoverTrigger>
                <Button
                  w="32px"
                  h="32px"
                  borderRadius="50%"
                  boxShadow="0 0 0 1px rgba(0,0,0,0.1)"
                  ml="auto"
                  alignItems="center"
                  display="none"
                  _groupHover={{
                    display: "flex",
                  }}
                  fontSize="24px"
                  bgColor="transparent"
                  border="none"
                >
                  <TfiMoreAlt />
                </Button>
              </PopoverTrigger>
              <PopoverContent borderRadius="10px">
                <PopoverArrow />
                <PopoverBody p="4px">
                  <Button
                    as="div"
                    w="100%"
                    h="44px"
                    p="8px"
                    bg="transparent"
                    justifyContent="start"
                    _hover={{
                      bgColor: "bgLightActive.100",
                    }}
                    onClick={() => {
                      conversations.forEach((conversation) => {
                        if (
                          !conversation.isGroup &&
                          conversation.members.filter((member) => {
                            return member._id === user._id;
                          }).length > 0
                        ) {
                          router.push(
                            `/messenger/conversations/${conversation._id}`
                          );
                        }
                      });
                    }}
                  >
                    Nhắn tin
                  </Button>
                  <Button
                    as="div"
                    w="100%"
                    h="44px"
                    p="8px"
                    bg="transparent"
                    justifyContent="start"
                    _hover={{
                      bgColor: "bgLightActive.100",
                    }}
                    onClick={onOpen}
                  >
                    Hủy kết bạn
                  </Button>
                  <AlertDialog
                    motionPreset="slideInBottom"
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isOpen={isOpen}
                    isCentered
                  >
                    <AlertDialogOverlay bgColor="rgba(0,0,0, .1)" />

                    <AlertDialogContent borderRadius="10px">
                      <AlertDialogHeader>Hủy kết bạn</AlertDialogHeader>
                      <AlertDialogCloseButton />
                      <AlertDialogBody>
                        Bạn và {user.displayName} sẽ không còn là bạn bè của
                        nhau nữa?
                      </AlertDialogBody>
                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                          Hủy
                        </Button>
                        <Button
                          colorScheme="blue"
                          ml={3}
                          onClick={() => {
                            const handleRemoveFriend = async () => {
                              await requestApi("users/remove-friend", "POST", {
                                userId: user._id,
                              });
                              removeFriend(user._id);
                              onClose();
                            };
                            handleRemoveFriend();
                          }}
                        >
                          Xác nhận
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </HStack>
        );
      })}
    </Box>
  );
}

export default Sidebar;
