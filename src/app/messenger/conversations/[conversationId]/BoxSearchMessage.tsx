"use client";

import {
  Box,
  Button,
  HStack,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import CustomIcons from "~/app/components/Icon";
import useConversations, { ConversationsState } from "~/hooks/useConversations";
import useLogic, { LogicState } from "~/hooks/useLogic";
import requestApi from "~/utils/api";

import { format, isToday, isThisWeek, parseISO } from "date-fns";

export const formatDate = (dateString: any) => {
  const date = parseISO(dateString);

  // Nếu nhỏ hơn 24h, trả về giờ và phút
  if (isToday(date)) {
    return format(date, "HH:mm");
  }

  // Nếu lớn hơn 24h nhỏ hơn 1 tuần, trả về thứ
  if (isThisWeek(date)) {
    return format(date, "EEEE"); // 'EEEE' trả về tên của thứ trong tuần
  }

  // Nếu lớn hơn 1 tuần, trả về ngày tháng năm
  return format(date, "dd/MM/yyyy");
};

function BoxSearchMessage() {
  const setIsShowBoxSearchMessage = useLogic(
    (state: LogicState) => state.setIsShowBoxSearchMessage
  );
  const currConversationId = useConversations(
    (state: ConversationsState) => state.currConversation?._id
  );
  const setMessages = useConversations(
    (state: ConversationsState) => state.setMessages
  );
  const searchMessageValue = useConversations(
    (state: ConversationsState) => state.searchMessageValue
  );
  const setSearchMessageValue = useConversations(
    (state: ConversationsState) => state.setSearchMessageValue
  );
  const setIsShowMessageWhenSearch = useLogic(
    (state: LogicState) => state.setIsShowMessageWhenSearch
  );

  const borderColor = useColorModeValue("#e5e5e5", "#ffffff1a");
  const bgColorBoxSearchResult = useColorModeValue("#f3f3f4", "#262b36");

  const [searchMessageResult, setSearchMessageResult] = useState<any>([]);

  const handleSearchMessage = async () => {
    const res = await requestApi(
      `messages/search/content/${currConversationId}?keyword=${searchMessageValue}`,
      "GET",
      ""
    );
    setSearchMessageResult(res.data.metadata.result);
  };

  useEffect(() => {
    if (searchMessageValue === "") {
      setSearchMessageResult([]);
    }
  }, [searchMessageValue, setSearchMessageResult]);

  return (
    <HStack
      w="100%"
      h="56px"
      boxShadow="-3px 4px 3px -4px rgba(0, 0, 0, 0.2)"
      borderTop="1px solid "
      borderColor={borderColor}
      p="8px 12px"
      gap="12px"
      alignItems="center"
      justifyContent={"space-between"}
    >
      <HStack
        as="form"
        flex="1"
        borderRadius="999px"
        h="36px"
        bgColor="rgba(134, 142, 153, 0.1)"
        p="5px 10px"
        position="relative"
      >
        <CustomIcons.icon_search_message />
        <Input
          autoFocus
          type="text"
          id="search-input"
          name="search-input"
          placeholder="Tìm kiếm"
          bgColor="transparent"
          outline="none"
          border="none"
          p="0px"
          fontSize="1.4rem"
          // display={{ base: "none", lg: "inline" }}
          _focusVisible={{
            outline: "none",
          }}
          _placeholder={{
            fontWeight: 300,
            fontSize: "1.5rem",
          }}
          value={searchMessageValue}
          onChange={(e) => {
            setSearchMessageValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setIsShowBoxSearchMessage(false);
            }
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearchMessage();
            }
          }}
        />
        {searchMessageValue && (
          <Button
            flexShrink="0"
            as="div"
            w="32px"
            h="32px"
            borderRadius="50%"
            p="0"
            mr="-8px"
            fontSize="16px"
            color="primary.100"
            cursor="pointer"
            onClick={() => {
              setSearchMessageValue("");
              setSearchMessageResult([]);
            }}
          >
            <IoMdClose />
          </Button>
        )}
        {searchMessageResult?.length > 0 && (
          <Box
            position="absolute"
            top="40px"
            left="0px"
            borderRadius="10px"
            zIndex="1"
            w="100%"
            maxH="200px"
            overflowY="auto"
            p="10px"
            bgColor={bgColorBoxSearchResult}
          >
            {searchMessageResult.map((item: any) => {
              return (
                <Button
                  key={item._id}
                  as="div"
                  w="100%"
                  h="32px"
                  mb="5px"
                  justifyContent="space-between"
                  onClick={() => {
                    const getMessages = async () => {
                      const res = await requestApi(
                        `messages/image/${currConversationId}?messid=${item._id}&range=10`,
                        "GET",
                        ""
                      );
                      console.log(res);
                      setMessages(res.data.metadata);
                      setSearchMessageResult([]);
                      setIsShowMessageWhenSearch(true);
                    };
                    getMessages();
                  }}
                >
                  <Text>{item.content}</Text>
                  <Text fontSize="1.2rem" fontWeight="300">
                    {formatDate(item.createdAt)}
                  </Text>
                </Button>
              );
            })}
          </Box>
        )}
      </HStack>
      <Button
        w="24px"
        h="24px"
        borderRadius="50%"
        p="0"
        color={searchMessageResult.length > 0 ? "primary.100" : ""}
        opacity={searchMessageResult.length > 0 ? 1 : 0.5}
        cursor={searchMessageResult.length > 0 ? "pointer" : "not-allowed"}
      >
        <FaChevronUp />
      </Button>
      <Button
        w="24px"
        h="24px"
        borderRadius="50%"
        p="0"
        color={searchMessageResult.length > 0 ? "primary.100" : ""}
        opacity={searchMessageResult.length > 0 ? 1 : 0.5}
        cursor={searchMessageResult.length > 0 ? "pointer" : "not-allowed"}
      >
        <FaChevronDown />
      </Button>
      <Button
        w="60px"
        h="32px"
        fontSize="1.4rem"
        fontWeight="500"
        borderRadius="8px"
        onClick={() => {
          setIsShowBoxSearchMessage(false);
        }}
      >
        Đóng
      </Button>
    </HStack>
  );
}

export default BoxSearchMessage;
