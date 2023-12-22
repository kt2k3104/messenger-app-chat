"use client";
import {
  Box,
  Button,
  HStack,
  Img,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import useLogic, { LogicState } from "~/hooks/useLogic";
import { useEffect, useState } from "react";
import { FaLock, FaChevronDown, FaChevronRight } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";

import useConversations, { ConversationsState } from "~/hooks/useConversations";
import CustomIcons from "~/app/components/Icon";
import useUserInfo, { UserInfoState } from "~/hooks/useUserInfo";

export default function SidebarRight() {
  const isShowSidebarRight = useLogic(
    (state: LogicState) => state.isShowSidebarRight
  );
  const setIsShowSidebarRight = useLogic(
    (state: LogicState) => state.setIsShowSidebarRight
  );
  const currConversation = useConversations(
    (state: ConversationsState) => state.currConversation
  );
  const userId = useUserInfo(
    (state: UserInfoState) => state.basicUserInfo?._id
  );
  // const widthOfWindow = window?.innerWidth;
  const [browserWidth, setBrowserWidth] = useState(0);
  const [isShowOption1, setIsShowOption1] = useState(false);
  const [isShowOption2, setIsShowOption2] = useState(false);
  const [isShowOption3, setIsShowOption3] = useState(false);

  const bg = useColorModeValue("#e5e5e5", "#ffffff1a");
  const bgButton = useColorModeValue("#f5f5f5", "#ffffff1a");

  const handleResize = () => {
    setBrowserWidth(window.innerWidth);
  };
  useEffect(() => {
    if (!window) return;
    window.addEventListener("resize", handleResize);
    setBrowserWidth(window.innerWidth);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (browserWidth < 900) {
      setIsShowSidebarRight(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [browserWidth]);

  return (
    <VStack
      display={isShowSidebarRight ? "flex" : "none"}
      w={{ base: "266px", xl: "384px" }}
      h="100vh"
      borderLeft="1px solid"
      borderColor={bg}
      gap="0"
    >
      <Img
        src={
          currConversation?.thumb
            ? currConversation.thumb
            : "/images/no-image.png"
        }
        alt="avt"
        w="80px"
        h="80px"
        borderRadius="50%"
        mt="16px"
        mb="6px"
      />
      <Text
        as="a"
        fontSize="1.6rem"
        fontWeight="500"
        cursor="pointer"
        _hover={{ textDecoration: "underline" }}
      >
        {currConversation?.isGroup
          ? currConversation.name
          : currConversation?.members[0]._id === userId
          ? currConversation?.members[1].displayName
          : currConversation?.members[0].displayName}
      </Text>
      <Button
        mt="20px"
        h="24px"
        borderRadius="999px"
        p="0 12px"
        bgColor={bgButton}
      >
        <FaLock />
        <Text ml="5px" fontSize="12px" fontWeight="500">
          Được mã hóa đầu cuối
        </Text>
      </Button>
      <HStack
        w="100%"
        h="93px"
        p="12px 12px 0"
        alignItems="center"
        justifyContent="center"
        gap="0"
      >
        <VStack h="100%" alignItems="center" justifyContent="flex-start">
          <Button p="0" w="36px" h="36px" borderRadius="50%" bgColor={bgButton}>
            <CustomIcons.icon_fb />
          </Button>
          <Text
            fontSize="1.2rem"
            w="69px"
            h="17px"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            Trang cá nhân
          </Text>
        </VStack>
        <VStack h="100%" alignItems="center" justifyContent="flex-start">
          <Button p="0" w="36px" h="36px" borderRadius="50%" bgColor={bgButton}>
            <CustomIcons.icon_noti />
          </Button>
          <Text fontSize="1.2rem" w="69px" h="33px" textAlign="center">
            Tắt thống báo
          </Text>
        </VStack>
      </HStack>
      <Box p="20px 8px">
        <Button
          bgColor="transparent"
          w="100%"
          h="44px"
          p="10px 5px"
          justifyContent="space-between"
          fontSize="1.4rem"
          fontWeight="500"
          onClick={() => {
            setIsShowOption1(!isShowOption1);
          }}
        >
          Tùy chỉnh đoạn chat
          {isShowOption1 ? <FaChevronRight /> : <FaChevronDown />}
        </Button>
        {isShowOption1 && (
          <>
            <Button
              bgColor="transparent"
              w="100%"
              h="44px"
              p="10px 5px"
              justifyContent="left"
              fontSize="1.4rem"
              fontWeight="500"
            >
              <Button
                w="28px"
                h="28px"
                p="0"
                borderRadius="50%"
                mr="8px"
                bgColor={bgButton}
              >
                <CustomIcons.icon_topic />
              </Button>
              Đổi chủ đề
            </Button>
            <Button
              bgColor="transparent"
              w="100%"
              h="44px"
              p="10px 5px"
              justifyContent="left"
              fontSize="1.4rem"
              fontWeight="500"
            >
              <Button
                w="28px"
                h="28px"
                p="0"
                borderRadius="50%"
                mr="8px"
                bgColor={bgButton}
              >
                <CustomIcons.icon_change_emoticon />
              </Button>
              Thay đổi biểu tượng cảm xúc
            </Button>
            <Button
              bgColor="transparent"
              w="100%"
              h="44px"
              p="10px 5px"
              justifyContent="left"
              fontSize="1.4rem"
              fontWeight="500"
            >
              <Button
                w="28px"
                h="28px"
                p="0"
                borderRadius="50%"
                mr="8px"
                bgColor={bgButton}
              >
                <CustomIcons.icon_change_nickname />
              </Button>
              Chỉnh sửa biệt danh
            </Button>
          </>
        )}
        <Button
          bgColor="transparent"
          w="100%"
          h="44px"
          p="10px 5px"
          justifyContent="space-between"
          fontSize="1.4rem"
          fontWeight="500"
          onClick={() => {
            setIsShowOption2(!isShowOption2);
          }}
        >
          File phương tiện & file
          {isShowOption2 ? <FaChevronRight /> : <FaChevronDown />}
        </Button>
        {isShowOption2 && (
          <>
            <Button
              bgColor="transparent"
              w="100%"
              h="44px"
              p="10px 5px"
              justifyContent="left"
              fontSize="1.4rem"
              fontWeight="500"
            >
              <Button
                w="28px"
                h="28px"
                p="0"
                borderRadius="50%"
                mr="8px"
                bgColor={bgButton}
              >
                <CustomIcons.icon_media_files />
              </Button>
              File phương tiện
            </Button>
            <Button
              bgColor="transparent"
              w="100%"
              h="44px"
              p="10px 5px"
              justifyContent="left"
              fontSize="1.4rem"
              fontWeight="500"
            >
              <Button
                w="28px"
                h="28px"
                p="0"
                borderRadius="50%"
                mr="8px"
                bgColor={bgButton}
              >
                <CustomIcons.icon_file />
              </Button>
              File
            </Button>
          </>
        )}
        <Button
          bgColor="transparent"
          w="100%"
          h="44px"
          p="10px 5px"
          justifyContent="space-between"
          fontSize="1.4rem"
          fontWeight="500"
          onClick={() => {
            setIsShowOption3(!isShowOption3);
          }}
        >
          Quyền riêng tư & hỗ trợ
          {isShowOption3 ? <FaChevronRight /> : <FaChevronDown />}
        </Button>
        {isShowOption3 && (
          <>
            <Button
              bgColor="transparent"
              w="100%"
              h="44px"
              p="10px 5px"
              justifyContent="left"
              fontSize="1.4rem"
              fontWeight="500"
            >
              <Button
                w="28px"
                h="28px"
                p="0"
                borderRadius="50%"
                mr="8px"
                bgColor={bgButton}
              >
                <CustomIcons.icon_noti />
              </Button>
              Tắt thông báo
            </Button>
            <Button
              bgColor="transparent"
              w="100%"
              h="44px"
              p="10px 5px"
              justifyContent="left"
              fontSize="1.4rem"
              fontWeight="500"
            >
              <Button
                w="28px"
                h="28px"
                p="0"
                borderRadius="50%"
                mr="8px"
                bgColor={bgButton}
              >
                <CustomIcons.icon_temporary_message />
              </Button>
              Tin nhắn tạm thời
            </Button>
            <Button
              bgColor="transparent"
              w="100%"
              h="44px"
              p="10px 5px"
              justifyContent="left"
              fontSize="1.4rem"
              fontWeight="500"
            >
              <Button
                w="28px"
                h="28px"
                p="0"
                borderRadius="50%"
                mr="8px"
                fontSize="14px"
                bgColor={bgButton}
              >
                <FaLock />
              </Button>
              Xác minh mã hóa đầu cuối
            </Button>
            <Button
              bgColor="transparent"
              w="100%"
              h="44px"
              p="10px 5px"
              justifyContent="left"
              fontSize="1.4rem"
              fontWeight="500"
            >
              <Button
                w="28px"
                h="28px"
                p="0"
                borderRadius="50%"
                mr="8px"
                bgColor={bgButton}
              >
                <CustomIcons.icon_limt />
              </Button>
              Hạn chế
            </Button>
            <Button
              bgColor="transparent"
              w="100%"
              h="44px"
              p="10px 5px"
              justifyContent="left"
              fontSize="1.4rem"
              fontWeight="500"
            >
              <Button
                w="28px"
                h="28px"
                p="0"
                borderRadius="50%"
                mr="8px"
                bgColor={bgButton}
              >
                <CustomIcons.icon_block />
              </Button>
              Chặn
            </Button>
            <Button
              bgColor="transparent"
              w="100%"
              h="44px"
              p="10px 5px"
              justifyContent="left"
              fontSize="1.4rem"
              fontWeight="500"
            >
              <Button
                w="28px"
                h="28px"
                p="0"
                borderRadius="50%"
                mr="8px"
                fontSize="16px"
                bgColor={bgButton}
              >
                <IoIosWarning />
              </Button>
              <Box>
                <Text textAlign="left">Báo cáo</Text>
                <Text fontSize="12px" color="#65676B" fontWeight="400">
                  Đóng góp ý kiến và báo cáo cuộc trò chuyện
                </Text>
              </Box>
            </Button>
          </>
        )}
      </Box>
    </VStack>
  );
}
