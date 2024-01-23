"use client";

import { Box, Button, Img, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import requestApi from "~/utils/api";
import useUserInfo, { SentRequest, UserInfoState } from "~/hooks/useUserInfo";

enum SentStatus {
  CANCELLED = "cancelled",
  PENDING = "pending",
  STRANGE = "strange",
  MYPENDING = "mypending",
}

function BoxStrangeUser({ user, sentStatus }: any) {
  const [isSent, setIsSent] = useState(sentStatus);

  const sentRequests = useUserInfo(
    (state: UserInfoState) => state.sentRequests
  );
  const friendRequests = useUserInfo(
    (state: UserInfoState) => state.friendRequests
  );
  const setSentRequests = useUserInfo(
    (state: UserInfoState) => state.setSentRequests
  );
  const friends = useUserInfo((state: UserInfoState) => state.friends);
  const setFriendRequests = useUserInfo(
    (state: UserInfoState) => state.setFriendRequests
  );
  const setFriends = useUserInfo((state: UserInfoState) => state.setFriends);
  const strangeUsers = useUserInfo(
    (state: UserInfoState) => state.strangeUsers
  );
  const setStrangeUsers = useUserInfo(
    (state: UserInfoState) => state.setStrangeUsers
  );

  const bg = useColorModeValue("#e5e5e5", "#ffffff1a");
  const bgButtonDelete = useColorModeValue("#E4E6EB", "rgba(255,255,255,.1)");

  useEffect(() => {
    setIsSent(sentStatus);
  }, [sentStatus]);

  return (
    <Box
      key={user._id}
      w="100%"
      borderRadius="10px"
      border="1px solid"
      borderColor={bg}
    >
      <Img
        borderTopRadius="10px"
        src={
          user.avatar
            ? user.avatar
            : "https://scontent.fhan20-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=2b6aad&_nc_eui2=AeE-4fINDkTKpqp6AeNkaBwWso2H55p0AlGyjYfnmnQCUfpKyWf3qbpWB5GlYHhFJgjq-TbNpyj7ju6QXf36ElkA&_nc_ohc=OgbBqcsBbP8AX_9YNZ3&_nc_ht=scontent.fhan20-1.fna&oh=00_AfCcjusBrJFBUgXvN5BGR4d7_vuMDTjjMsaRcYUIbQaWDA&oe=65BF34F8"
        }
        alt="avt"
        w="100%"
      />
      <Text p="4px 12px 0" fontSize="1.6rem" fontWeight="700">
        {/* {user.displayName} */}
        {user.lastName + " " + user.firstName}
      </Text>
      <Text fontSize="1.4rem" fontWeight="300" p="0 12px">
        {isSent === SentStatus.PENDING
          ? "Đã gửi lời mời"
          : isSent === SentStatus.CANCELLED
          ? "Đã hủy lời mời"
          : `${user.mutualFriends.length} bạn chung`}
      </Text>
      {isSent === SentStatus.STRANGE ||
      isSent === SentStatus.CANCELLED ||
      isSent === SentStatus.MYPENDING ? (
        <>
          <Button
            bgColor="primary.100"
            _hover={{
              bgColor: "primary.90",
            }}
            color="#fff"
            borderRadius="5px"
            w="88%"
            h="36px"
            m="2px 12px 5px"
            p="12px"
            fontSize="1.4rem"
            onClick={() => {
              const handleAddFriend = async () => {
                try {
                  setIsSent(SentStatus.PENDING);
                  const response: any = await requestApi(
                    "users/add-friend",
                    "POST",
                    {
                      userId: user._id,
                    }
                  );
                  setSentRequests([...sentRequests, response.data.metadata]);
                } catch (error) {
                  console.log(error);
                  setIsSent(SentStatus.PENDING);
                }
              };
              const handleAcceptFriendRequest = async () => {
                try {
                  await requestApi("users/accept-friend", "POST", {
                    userId: user._id,
                  });
                  setFriendRequests(
                    friendRequests.filter((val) => val.sender._id !== user._id)
                  );
                  setStrangeUsers(
                    strangeUsers.filter((val) => val._id !== user._id)
                  );
                  setFriends([...friends, user]);
                } catch (error) {
                  console.log(error);
                  setIsSent(SentStatus.PENDING);
                }
              };
              if (isSent === SentStatus.MYPENDING) {
                handleAcceptFriendRequest();
                return;
              }
              handleAddFriend();
            }}
          >
            {isSent === SentStatus.STRANGE ? "Thêm bạn bè" : "Xác nhận"}
          </Button>
          <Button
            bgColor={bgButtonDelete}
            borderRadius="5px"
            w="88%"
            h="36px"
            m="2px 12px 5px"
            p="12px"
            fontSize="1.4rem"
            onClick={() => {
              setIsSent(SentStatus.STRANGE);
              const handleRejectFriendRequest = async () => {
                setFriendRequests(
                  friendRequests.filter((val) => val.sender._id !== user._id)
                );
                await requestApi("users/reject-friend", "POST", {
                  userId: user._id,
                });
              };
              if (isSent === SentStatus.MYPENDING) {
                handleRejectFriendRequest();
              }
            }}
          >
            Xóa
          </Button>
        </>
      ) : (
        <Button
          bgColor={bgButtonDelete}
          borderRadius="5px"
          w="88%"
          h="36px"
          m="45px 12px 5px"
          p="12px"
          fontSize="1.4rem"
          onClick={() => {
            setIsSent(SentStatus.CANCELLED);
            const handleCancelSentRequest = async () => {
              setSentRequests(
                sentRequests.filter(
                  (val: SentRequest) => val.receiver._id !== user._id
                )
              );
              await requestApi("users/cancel-friend", "POST", {
                userId: user._id,
              });
            };
            handleCancelSentRequest();
          }}
        >
          Hủy
        </Button>
      )}
    </Box>
  );
}

export default BoxStrangeUser;
