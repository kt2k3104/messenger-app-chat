"use client";

import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  HStack,
  Img,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import CustomIcons from "~/app/components/Icon";
import useActiveList, { ActiveListStore } from "~/hooks/useActiveList";
import useUserInfo, { UserInfoState } from "~/hooks/useUserInfo";

function Sidebar() {
  const bg = useColorModeValue("#e5e5e5", "#ffffff1a");
  const {
    isOpen: isOpenModalFriendRequest,
    onOpen: onOpenModalFriendRequest,
    onClose: onCloseModalFriendRequest,
  } = useDisclosure();
  const {
    isOpen: isOpenModalInvitationSent,
    onOpen: onOpenModalInvitationSent,
    onClose: onCloseModalInvitationSent,
  } = useDisclosure();

  const friends = useUserInfo((state: UserInfoState) => state.friends);
  const friendActive = useActiveList((state: ActiveListStore) => state.members);
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
        <Button
          position="absolute"
          top="12px"
          right="12px"
          w="36px"
          h="36px"
          p="0"
          borderRadius="50%"
          onClick={onOpenModalFriendRequest}
        >
          <CustomIcons.icon_friend_request />
        </Button>
      </Tooltip>
      <Modal
        isOpen={isOpenModalFriendRequest}
        onClose={onCloseModalFriendRequest}
      >
        <ModalOverlay />
        <ModalContent
          maxW="50vw"
          maxH="50vh"
          w="548px"
          h="440px"
          borderRadius="10px"
          mt="24vh"
        >
          <ModalHeader
            fontSize="2rem"
            textAlign="center"
            borderBottom="1px solid"
            borderColor={bg}
          >
            Lời mời kết bạn
          </ModalHeader>
          <ModalCloseButton
            top="10px"
            right="10px"
            w="36px"
            h="36px"
            borderRadius="50%"
            fontSize="1.2rem"
          />
          <ModalBody>
            <Text
              cursor="pointer"
              fontSize="1.2rem"
              fontWeight="300"
              color="#0866FF"
              onClick={() => {
                onCloseModalFriendRequest();
                onOpenModalInvitationSent();
              }}
            >
              Xem lời mời đã gửi
            </Text>
            <Button
              w="100%"
              h="72px"
              bgColor="transparent"
              p="8px"
              justifyContent="flex-start"
              borderRadius="8px"
            >
              <Img
                src="/images/no-image.png"
                alt="avt"
                w="60px"
                h="60px"
                borderRadius="50%"
                mr="12px"
              />
              <Text>Nguyễn Văn A</Text>
              <HStack ml="auto" fontSize="1.2rem">
                <Button
                  bgColor="#0866FF"
                  color="#fff"
                  fontSize="inherit"
                  p="15px 20px"
                  _hover={{
                    bgColor: "#0866FF",
                    opacity: "0.8",
                  }}
                >
                  Xác nhận
                </Button>
                <Button
                  fontSize="inherit"
                  p="15px 20px"
                  _hover={{ opacity: "0.8" }}
                >
                  Xóa
                </Button>
              </HStack>
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpenModalInvitationSent}
        onClose={onCloseModalInvitationSent}
      >
        <ModalOverlay />
        <ModalContent
          maxW="50vw"
          maxH="50vh"
          w="548px"
          h="440px"
          borderRadius="10px"
          mt="24vh"
        >
          <ModalHeader
            fontSize="2rem"
            textAlign="center"
            borderBottom="1px solid"
            borderColor={bg}
          >
            Lời mời đã gửi
          </ModalHeader>
          <ModalCloseButton
            top="10px"
            right="10px"
            w="36px"
            h="36px"
            borderRadius="50%"
            fontSize="1.2rem"
          />
          <ModalBody>
            <Text fontSize="1.6rem" p="12px 16px">
              0 lời mời đã gửi
            </Text>
            <Button
              w="100%"
              h="72px"
              bgColor="transparent"
              p="8px"
              justifyContent="flex-start"
              borderRadius="8px"
            >
              <Img
                src="/images/no-image.png"
                alt="avt"
                w="60px"
                h="60px"
                borderRadius="50%"
                mr="12px"
              />
              <Text>Nguyễn Văn A</Text>
              <HStack ml="auto" fontSize="1.2rem">
                <Button
                  fontSize="1.4rem"
                  h="36px"
                  p="10px 36px"
                  borderRadius="8px"
                >
                  Hủy yêu cầu
                </Button>
              </HStack>
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Text fontSize="2.4rem" fontWeight="700" m="12px 16px 4px">
        Danh sách bạn bè
      </Text>
      <Text fontSize="1.2rem" fontWeight="400" m="18px 15px">
        Bạn bè đang hoạt động {`(${friendActive.length})`}
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
            <Avatar mt="auto" src={user.avatar} size="md" m="0">
              {friendActive.findIndex((member) => {
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
