"use client";

import {
  Box,
  Button,
  HStack,
  Img,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { IoIosClose } from "react-icons/io";

import useLogic, { LogicState } from "~/hooks/useLogic";
import useUserInfo, { UserInfo, UserInfoState } from "~/hooks/useUserInfo";
import ChatContent from "../[conversationId]/ChatContent";
import NewConversation from "./NewConversation";
import { NEXT_PUBLIC_API_URL } from "~/app/env";

function New() {
  const [keyword, setKeyword] = useState<string>("");
  const [searchMessageValue] = useDebounce(keyword, 500);
  const [searchResults, setSearchResults] = useState<any>(null);
  const bg = useColorModeValue("#fff", "#1b202b");
  const bgbtn = useColorModeValue("#f5f5f5", "#ffffff1a");

  const waitingForAddedToGroup = useLogic(
    (state: LogicState) => state.waitingForAddedToGroup
  );
  const pushWaitingForAddedToGroup = useLogic(
    (state: LogicState) => state.pushWaitingForAddedToGroup
  );
  const popWaitingForAddedToGroup = useLogic(
    (state: LogicState) => state.popWaitingForAddedToGroup
  );
  const setIsShowBoxNewConversation = useLogic(
    (state: LogicState) => state.setIsShowBoxNewConversation
  );
  const currUserId = useUserInfo((state: UserInfoState) => state.userInfo?._id);
  console.log(currUserId);

  let showResults: any;
  if (!waitingForAddedToGroup.length) {
    showResults = searchResults?.filter((result: UserInfo) => {
      return result._id !== currUserId;
    });
  }
  waitingForAddedToGroup.forEach((user: UserInfo, index) => {
    if (index === 0) {
      showResults = searchResults?.filter((result: UserInfo) => {
        return result._id !== user._id && result._id !== currUserId;
      });
    } else {
      showResults = showResults?.filter((result: UserInfo) => {
        return result._id !== user._id && result._id !== currUserId;
      });
    }
  });

  useEffect(() => {
    if (searchMessageValue.trim()) {
      const handleSearchUsers = async () => {
        const { data: result } = await axios.get(
          // `${process.env.NEXT_PUBLIC_API_URL}users/search?keyword=${searchMessageValue}`
          `${NEXT_PUBLIC_API_URL}users/search?keyword=${searchMessageValue}`
        );
        setSearchResults(result.metadata);
      };
      handleSearchUsers();
    } else {
      setSearchResults(null);
    }
  }, [searchMessageValue]);

  useEffect(() => {
    setIsShowBoxNewConversation(true);
  }, [setIsShowBoxNewConversation]);

  return (
    <Box>
      <HStack
        as="form"
        h="55px"
        boxShadow="0 0 4px rgba(0,0,0,0.2)"
        p="0 16px"
        position="relative"
      >
        <Text fontSize="1.5rem">Đến:</Text>
        {waitingForAddedToGroup.length > 0 &&
          waitingForAddedToGroup?.map((user) => {
            return (
              <HStack
                borderRadius="5px"
                bgColor={bgbtn}
                h="28px"
                p="0 8px"
                key={user._id}
                gap="5px"
              >
                <Text whiteSpace="nowrap" fontSize="1.2rem">
                  {user.displayName}
                </Text>
                <Button
                  p="0"
                  fontSize="14px"
                  minW="14px"
                  w="14px"
                  h="14px"
                  borderRadius="50%"
                  onClick={(e) => {
                    e.stopPropagation();
                    popWaitingForAddedToGroup(user);
                  }}
                >
                  <IoIosClose />
                </Button>
              </HStack>
            );
          })}
        <Input
          value={keyword}
          autoFocus
          fontSize="1.6rem"
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        {keyword && (
          <Box
            position="absolute"
            top="50px"
            left="55px"
            w="328px"
            h="407px"
            boxShadow="0 12px 28px 0 rgba(0,0,0,0.2), 0 2px 4px 0 rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.5)"
            borderRadius="10px"
            bgColor={bg}
            p="6px"
            overflowY="auto"
          >
            {showResults?.map((user: any) => {
              return (
                <Button
                  key={user._id}
                  p="8px"
                  borderBottom="1px solid"
                  borderColor="rgba(255,255,255,0.1)"
                  w="100%"
                  h="52px"
                  bgColor="transparent"
                  alignItems="center"
                  justifyContent="flex-start"
                  gap="10px"
                  onClick={() => {
                    pushWaitingForAddedToGroup(user);
                    setKeyword("");
                    setSearchResults(null);
                  }}
                >
                  <Img
                    src={
                      user.avatar
                        ? user.avatar
                        : "https://scontent.fhan20-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=2b6aad&_nc_eui2=AeE-4fINDkTKpqp6AeNkaBwWso2H55p0AlGyjYfnmnQCUfpKyWf3qbpWB5GlYHhFJgjq-TbNpyj7ju6QXf36ElkA&_nc_ohc=OgbBqcsBbP8AX_9YNZ3&_nc_ht=scontent.fhan20-1.fna&oh=00_AfCcjusBrJFBUgXvN5BGR4d7_vuMDTjjMsaRcYUIbQaWDA&oe=65BF34F8"
                    }
                    alt="avt"
                    w="36px"
                    h="36px"
                    borderRadius="50%"
                  />
                  <Text fontWeight="400">{user.displayName}</Text>
                </Button>
              );
            })}
          </Box>
        )}
      </HStack>
      {/* {waitingForAddedToGroup.length === 1 && (
        <ChatContent conversationId={waitingForAddedToGroup[0]._id} />
      )} */}
      {waitingForAddedToGroup.length > 0 && <NewConversation />}
    </Box>
  );
}

export default New;
