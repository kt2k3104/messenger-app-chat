"use client";

import { Box, Grid, HStack, Text } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import useUserInfo, { UserInfoState } from "~/hooks/useUserInfo";
import BoxStrangeUser from "./BoxStrangeUser";

enum SentStatus {
  CANCELLED = "cancelled",
  PENDING = "pending",
  STRANGE = "strange",
  MYPENDING = "mypending",
}

const SuggestionFriends = () => {
  const strangeUsers = useUserInfo(
    (state: UserInfoState) => state.strangeUsers
  );
  const sentRequests = useUserInfo(
    (state: UserInfoState) => state.sentRequests
  );
  const friendRequests = useUserInfo(
    (state: UserInfoState) => state.friendRequests
  );

  return (
    <HStack w="100%" h="100%" gap="0">
      <Sidebar />
      <Box flex="1" h="100%">
        <Text fontSize="2.4rem" fontWeight="700" m="12px 16px 4px">
          Gợi ý
        </Text>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
            "2xl": "repeat(5, 1fr)",
          }}
          gap="16px"
          p="16px"
          h="calc(100vh - 52px)"
          overflow="auto"
        >
          {strangeUsers?.map((user) => {
            return (
              <BoxStrangeUser
                key={user._id}
                user={user}
                sentStatus={
                  sentRequests?.some((item) => item.receiver._id === user._id)
                    ? SentStatus.PENDING
                    : friendRequests?.some(
                        (item) => item?.sender._id === user._id
                      )
                    ? SentStatus.MYPENDING
                    : SentStatus.STRANGE
                }
              />
            );
          })}
        </Grid>
      </Box>
    </HStack>
  );
};
export default SuggestionFriends;
