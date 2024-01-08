"use client";

import {
  Box,
  Button,
  Grid,
  HStack,
  Img,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { use, useEffect } from "react";
import useUserInfo, { UserInfoState } from "~/hooks/useUserInfo";

const ListFriends = () => {
  const bg = useColorModeValue("#e5e5e5", "#ffffff1a");
  const strangeUsers = useUserInfo(
    (state: UserInfoState) => state.strangeUsers
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
            console.log(user);
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
                  {user.mutualFriends.length} bạn chung
                </Text>
                <Button
                  bgColor="#1D85FC33"
                  borderRadius="5px"
                  w="88%"
                  h="36px"
                  m="2px 12px 5px"
                  p="12px"
                  fontSize="1.4rem"
                  onClick={() => {
                    console.log("add friend");
                  }}
                >
                  Thêm bạn bè
                </Button>
                <Button
                  bgColor="rgba(255,255,255,.1)"
                  borderRadius="5px"
                  w="88%"
                  h="36px"
                  m="2px 12px 5px"
                  p="12px"
                  fontSize="1.4rem"
                >
                  Xóa
                </Button>
              </Box>
            );
          })}
        </Grid>
      </Box>
    </HStack>
  );
};
export default ListFriends;
