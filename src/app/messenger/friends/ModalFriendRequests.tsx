"use client";

import {
  Button,
  HStack,
  Img,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import useUserInfo, { SentRequest, UserInfoState } from "~/hooks/useUserInfo";
import requestApi from "~/utils/api";

enum FriendTag {
  ADD_FRIEND = "add-friend",
  ACCEPT_FRIEND_REQUEST = "accept-friend-request",
  REMOVE_FRIEND = "remove-friend",
  CANCEL_FRIEND_REQUEST = "cancel-friend-request",
}

function ModalFriendRequest({
  isOpenModalFriendRequest,
  onOpenModalFriendRequest,
  onCloseModalFriendRequest,
}: any) {
  const friendRequests = useUserInfo(
    (state: UserInfoState) => state.friendRequests
  );
  const setFriendRequests = useUserInfo(
    (state: UserInfoState) => state.setFriendRequests
  );
  const friends = useUserInfo((state: UserInfoState) => state.friends);
  const setFriends = useUserInfo((state: UserInfoState) => state.setFriends);
  const strangeUsers = useUserInfo(
    (state: UserInfoState) => state.strangeUsers
  );
  const setStrangeUsers = useUserInfo(
    (state: UserInfoState) => state.setStrangeUsers
  );
  const sentRequests = useUserInfo(
    (state: UserInfoState) => state.sentRequests
  );
  const setSentRequests = useUserInfo(
    (state: UserInfoState) => state.setSentRequests
  );

  const [loading, setLoading] = useState(false);

  const bg = useColorModeValue("#e5e5e5", "#ffffff1a");

  const {
    isOpen: isOpenModalInvitationSent,
    onOpen: onOpenModalInvitationSent,
    onClose: onCloseModalInvitationSent,
  } = useDisclosure();

  return (
    <>
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
            {friendRequests.length > 0 ? (
              friendRequests.map((request: any) => {
                return (
                  <Button
                    as="div"
                    key={request?.sender._id}
                    w="100%"
                    h="72px"
                    bgColor="transparent"
                    p="8px"
                    justifyContent="flex-start"
                    borderRadius="8px"
                  >
                    <Img
                      src={
                        request?.sender.avatar
                          ? request.sender.avatar
                          : "https://scontent.fhan20-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=2b6aad&_nc_eui2=AeE-4fINDkTKpqp6AeNkaBwWso2H55p0AlGyjYfnmnQCUfpKyWf3qbpWB5GlYHhFJgjq-TbNpyj7ju6QXf36ElkA&_nc_ohc=OgbBqcsBbP8AX_9YNZ3&_nc_ht=scontent.fhan20-1.fna&oh=00_AfCcjusBrJFBUgXvN5BGR4d7_vuMDTjjMsaRcYUIbQaWDA&oe=65BF34F8"
                      }
                      alt="avt"
                      w="60px"
                      h="60px"
                      borderRadius="50%"
                      mr="12px"
                    />
                    <Text>{request?.sender.displayName}</Text>
                    <HStack ml="auto" fontSize="1.2rem">
                      {loading ? (
                        <Spinner
                          thickness="4px"
                          speed="0.65s"
                          emptyColor="gray.200"
                          color="primary.100"
                          size="xl"
                          mr="20px"
                        />
                      ) : (
                        <>
                          <Button
                            bgColor="#0866FF"
                            color="#fff"
                            fontSize="inherit"
                            p="15px 20px"
                            _hover={{
                              bgColor: "#0866FF",
                              opacity: "0.8",
                            }}
                            onClick={() => {
                              const handleAcceptFriendRequest = async () => {
                                setLoading(true);
                                await requestApi(
                                  "users/accept-friend",
                                  "POST",
                                  {
                                    userId: request?.sender._id,
                                  }
                                );
                                setFriendRequests(
                                  friendRequests.filter(
                                    (val) =>
                                      val?.sender._id !== request?.sender._id
                                  )
                                );
                                setStrangeUsers(
                                  strangeUsers.filter((val) => {
                                    return val._id !== request?.sender._id;
                                  })
                                );
                                setFriends([...friends, request?.sender]);
                                onCloseModalFriendRequest();
                                setLoading(false);
                              };
                              handleAcceptFriendRequest();
                            }}
                          >
                            Xác nhận
                          </Button>
                          <Button
                            fontSize="inherit"
                            p="15px 20px"
                            _hover={{ opacity: "0.8" }}
                            onClick={() => {
                              const handleRejectFriendRequest = async () => {
                                await requestApi(
                                  "users/reject-friend",
                                  "POST",
                                  {
                                    userId: request?.sender._id,
                                  }
                                );
                              };
                              handleRejectFriendRequest();
                              setFriendRequests(
                                friendRequests.filter(
                                  (val) =>
                                    val?.sender._id !== request?.sender._id
                                )
                              );
                            }}
                          >
                            Xóa
                          </Button>
                        </>
                      )}
                    </HStack>
                  </Button>
                );
              })
            ) : (
              <Text>Không có lời mời kết bạn nào !</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpenModalInvitationSent}
        onClose={() => {
          onCloseModalInvitationSent();
          onOpenModalFriendRequest();
        }}
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
              {sentRequests?.length} lời mời đã gửi
            </Text>
            {sentRequests?.length > 0 &&
              sentRequests.map((request: SentRequest) => {
                return (
                  <Button
                    key={request.receiver._id}
                    as="div"
                    w="100%"
                    h="72px"
                    bgColor="transparent"
                    p="8px"
                    justifyContent="flex-start"
                    borderRadius="8px"
                  >
                    <Img
                      src={
                        request.receiver.avatar
                          ? request.receiver.avatar
                          : "https://scontent.fhan20-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=2b6aad&_nc_eui2=AeE-4fINDkTKpqp6AeNkaBwWso2H55p0AlGyjYfnmnQCUfpKyWf3qbpWB5GlYHhFJgjq-TbNpyj7ju6QXf36ElkA&_nc_ohc=OgbBqcsBbP8AX_9YNZ3&_nc_ht=scontent.fhan20-1.fna&oh=00_AfCcjusBrJFBUgXvN5BGR4d7_vuMDTjjMsaRcYUIbQaWDA&oe=65BF34F8"
                      }
                      alt="avt"
                      w="60px"
                      h="60px"
                      borderRadius="50%"
                      mr="12px"
                    />
                    <Text>{request.receiver.displayName}</Text>
                    <HStack ml="auto" fontSize="1.2rem">
                      <Button
                        fontSize="1.4rem"
                        h="36px"
                        p="10px 36px"
                        borderRadius="8px"
                        onClick={() => {
                          const handleCancelSentRequest = async () => {
                            setSentRequests(
                              sentRequests.filter(
                                (val) =>
                                  val.receiver._id !== request.receiver._id
                              )
                            );
                            await requestApi("users/cancel-friend", "POST", {
                              userId: request.receiver._id,
                            });
                          };
                          handleCancelSentRequest();
                        }}
                      >
                        Hủy yêu cầu
                      </Button>
                    </HStack>
                  </Button>
                );
              })}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalFriendRequest;
