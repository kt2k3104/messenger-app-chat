"use client";
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  HStack,
  Img,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import useLogic, { LogicState } from "~/hooks/useLogic";
import { useEffect, useRef, useState } from "react";
import { FaLock, FaChevronDown, FaChevronRight } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { TfiMoreAlt } from "react-icons/tfi";
import { FiPlus } from "react-icons/fi";

import useConversations, { ConversationsState } from "~/hooks/useConversations";
import CustomIcons from "~/app/components/Icon";
import useUserInfo, { UserInfoState } from "~/hooks/useUserInfo";
import ThumbConversation from "../components/ThumbConversation";
import ModalAddPeople from "./ModalAddPeople";
import ModalRenameConversation from "./ModalRenameConversation";
import ModalUpdateAvatarConversation from "./ModalUpdateAvatarConversation";
import ModalLeaveConversation from "./ModalLeaveConversation";
import ModalRemoveMember from "./ModalRemoveMember";
import ModalAddAdmin from "./ModalAddAdmin";
import DrawerElement from "./DrawerElement";
import useActiveList, { ActiveListStore } from "~/hooks/useActiveList";

export enum OptionOpenDrawer {
  MediaFiles,
  File,
  Link,
}

export default function SidebarRight() {
  const isShowSidebarRight = useLogic(
    (state: LogicState) => state.isShowSidebarRight
  );
  const setIsShowSidebarRight = useLogic(
    (state: LogicState) => state.setIsShowSidebarRight
  );
  const setIsShowBoxSearchMessage = useLogic(
    (state: LogicState) => state.setIsShowBoxSearchMessage
  );
  const currConversation = useConversations(
    (state: ConversationsState) => state.currConversation
  );
  const memberOnline = useActiveList((state: ActiveListStore) => state.members);

  const userId = useUserInfo((state: UserInfoState) => state.userInfo?._id);
  const [browserWidth, setBrowserWidth] = useState<any>(window.innerWidth);
  const [isShowOption1, setIsShowOption1] = useState<boolean>(false);
  const [isShowOption2, setIsShowOption2] = useState<boolean>(false);
  const [isShowOption3, setIsShowOption3] = useState<boolean>(false);
  const [isShowOption4, setIsShowOption4] = useState<boolean>(false);
  const [isShowOption5, setIsShowOption5] = useState<boolean>(false);
  const [userIdProp, setUserIdProp] = useState<string>("");
  const [userDisplayNameProp, setUserDisplayNameProp] = useState<string>("");

  const [optionOpenDrawer, setOptionOpenDrawer] = useState(
    OptionOpenDrawer.MediaFiles
  );

  const bg = useColorModeValue("#e5e5e5", "#ffffff1a");
  const bgButton = useColorModeValue("#f5f5f5", "#ffffff1a");
  const {
    isOpen: isOpenModalAddPeople,
    onOpen: onOpenModalAddPeople,
    onClose: onCloseModalAddPeople,
  } = useDisclosure();

  const {
    isOpen: isOpenModalRenameConversation,
    onOpen: onOpenModalRenameConversation,
    onClose: onCloseModalRenameConversation,
  } = useDisclosure();
  const {
    isOpen: isOpenModalUpdateAvatarConversation,
    onOpen: onOpenModalUpdateAvatarConversation,
    onClose: onCloseModalUpdateAvatarConversation,
  } = useDisclosure();
  const {
    isOpen: isOpenModalLeaveConversation,
    onOpen: onOpenModalLeaveConversation,
    onClose: onCloseModalLeaveConversation,
  } = useDisclosure();
  const {
    isOpen: isOpenModalRemoveMember,
    onOpen: onOpenModalRemoveMember,
    onClose: onCloseModalRemoveMember,
  } = useDisclosure();
  const {
    isOpen: isOpenModalAddAdmin,
    onOpen: onOpenModalAddAdmin,
    onClose: onCloseModalAddAdmin,
  } = useDisclosure();
  const {
    isOpen: isOpenDrawer,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useDisclosure();

  const btnRef = useRef<any>();

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
      onCloseDrawer();
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
      p="16px 0 0 0"
      overflow="auto"
    >
      {currConversation && (
        <ThumbConversation conversation={currConversation} size="lg" />
      )}
      <Text
        mt="6px"
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
        {currConversation?.isGroup && (
          <>
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
              Thông tin về đoạn chat
              {isShowOption1 ? <FaChevronRight /> : <FaChevronDown />}
            </Button>
            {isShowOption1 && (
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
                  as="div"
                  w="28px"
                  h="28px"
                  p="0"
                  borderRadius="50%"
                  mr="8px"
                  bgColor={bgButton}
                >
                  <CustomIcons.icon_pinned_message />
                </Button>
                Xem tin nhắn đã ghim
              </Button>
            )}
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
          Tùy chỉnh đoạn chat
          {isShowOption2 ? <FaChevronRight /> : <FaChevronDown />}
        </Button>
        {isShowOption2 && (
          <>
            {currConversation?.isGroup && (
              <>
                <Button
                  bgColor="transparent"
                  w="100%"
                  h="44px"
                  p="10px 5px"
                  justifyContent="left"
                  fontSize="1.4rem"
                  fontWeight="500"
                  onClick={onOpenModalRenameConversation}
                >
                  <Button
                    as="div"
                    w="28px"
                    h="28px"
                    p="0"
                    borderRadius="50%"
                    mr="8px"
                    bgColor={bgButton}
                  >
                    <CustomIcons.icon_change_name_conversation />
                  </Button>
                  Đổi tên đoạn chat
                </Button>
                <ModalRenameConversation
                  isOpenModalRenameConversation={isOpenModalRenameConversation}
                  onCloseModalRenameConversation={
                    onCloseModalRenameConversation
                  }
                  conversationId={currConversation?._id}
                  conversationName={currConversation?.name}
                />
                <Button
                  bgColor="transparent"
                  w="100%"
                  h="44px"
                  p="10px 5px"
                  justifyContent="left"
                  fontSize="1.4rem"
                  fontWeight="500"
                  onClick={onOpenModalUpdateAvatarConversation}
                >
                  <Button
                    as="div"
                    w="28px"
                    h="28px"
                    p="0"
                    borderRadius="50%"
                    mr="8px"
                    bgColor={bgButton}
                  >
                    <CustomIcons.icon_change_avatar_conversation />
                  </Button>
                  Thay đổi ảnh
                </Button>
                <ModalUpdateAvatarConversation
                  isOpenModalUpdateAvatarConversation={
                    isOpenModalUpdateAvatarConversation
                  }
                  onCloseModalUpdateAvatarConversation={
                    onCloseModalUpdateAvatarConversation
                  }
                  conversationId={currConversation?._id}
                />
              </>
            )}
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
                as="div"
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
                as="div"
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
                as="div"
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
            <Button
              bgColor="transparent"
              w="100%"
              h="44px"
              p="10px 5px"
              justifyContent="left"
              fontSize="1.4rem"
              fontWeight="500"
              onClick={() => {
                setIsShowBoxSearchMessage(true);
              }}
            >
              <Button
                as="div"
                w="28px"
                h="28px"
                p="0"
                borderRadius="50%"
                mr="8px"
                bgColor={bgButton}
              >
                <CustomIcons.icon_search_in_conversation />
              </Button>
              Tìm kiếm trong cuộc trò chuyện
            </Button>
          </>
        )}
        {currConversation?.isGroup && (
          <>
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
              Thành viên trong đoạn chat
              {isShowOption3 ? <FaChevronRight /> : <FaChevronDown />}
            </Button>
            {isShowOption3 && (
              <>
                {currConversation.members.map((user) => {
                  return (
                    <HStack
                      gap="0"
                      key={user._id}
                      bgColor="transparent"
                      w="100%"
                      h="44px"
                      p="10px 5px"
                      justifyContent="left"
                      fontSize="1.4rem"
                      fontWeight="500"
                      _hover={{ bgColor: "transparent" }}
                    >
                      <Avatar
                        src={
                          user.avatar
                            ? user.avatar
                            : "https://scontent.fhan20-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=2b6aad&_nc_eui2=AeE-4fINDkTKpqp6AeNkaBwWso2H55p0AlGyjYfnmnQCUfpKyWf3qbpWB5GlYHhFJgjq-TbNpyj7ju6QXf36ElkA&_nc_ohc=OgbBqcsBbP8AX_9YNZ3&_nc_ht=scontent.fhan20-1.fna&oh=00_AfCcjusBrJFBUgXvN5BGR4d7_vuMDTjjMsaRcYUIbQaWDA&oe=65BF34F8"
                        }
                        w="36px"
                        h="36px"
                        borderRadius="50%"
                      >
                        {memberOnline
                          .filter((id) => id !== userId)
                          .includes(user._id) && (
                          <AvatarBadge boxSize="1.4rem" bg="green.500" />
                        )}
                      </Avatar>
                      <VStack ml="8px" alignItems="flex-start" gap="0">
                        <Text fontSize="1.4rem">{user.displayName}</Text>
                        <Text fontSize="1.2rem" fontWeight="300">
                          {currConversation.admins.includes(user._id) &&
                          currConversation.admins[0] === user._id
                            ? "Người tạo nhóm"
                            : currConversation.admins.includes(user._id)
                            ? "Quản trị viên"
                            : "Thành viên"}
                        </Text>
                      </VStack>
                      <Popover>
                        <PopoverTrigger>
                          <Button
                            w="36px"
                            h="36px"
                            borderRadius="50%"
                            ml="auto"
                            alignItems="center"
                            fontSize="24px"
                            bgColor="transparent"
                            onClick={(e) => {}}
                          >
                            <TfiMoreAlt />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent maxW="328px" w="328px" p="4px">
                          <PopoverArrow />
                          <PopoverBody p="0">
                            {user._id !== userId && (
                              <Button
                                bgColor="transparent"
                                w="320px"
                                h="44px"
                                p="10px 5px"
                                justifyContent="left"
                                fontSize="1.4rem"
                                fontWeight="500"
                              >
                                <Button
                                  as="div"
                                  w="28px"
                                  h="28px"
                                  p="0"
                                  borderRadius="50%"
                                  mr="8px"
                                  bgColor={bgButton}
                                >
                                  <CustomIcons.icon_chat />
                                </Button>
                                Nhắn tin
                              </Button>
                            )}
                            <Button
                              bgColor="transparent"
                              w="320px"
                              h="44px"
                              p="10px 5px"
                              justifyContent="left"
                              fontSize="1.4rem"
                              fontWeight="500"
                            >
                              <Button
                                as="div"
                                w="28px"
                                h="28px"
                                p="0"
                                borderRadius="50%"
                                mr="8px"
                                bgColor={bgButton}
                              >
                                <CustomIcons.icon_users />
                              </Button>
                              Xem trang cá nhân
                            </Button>
                            {user._id !== userId && (
                              <Button
                                bgColor="transparent"
                                w="320px"
                                h="44px"
                                p="10px 5px"
                                justifyContent="left"
                                fontSize="1.4rem"
                                fontWeight="500"
                              >
                                <Button
                                  as="div"
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
                            )}
                            {user._id === userId && (
                              <Button
                                bgColor="transparent"
                                w="320px"
                                h="44px"
                                p="10px 5px"
                                justifyContent="left"
                                fontSize="1.4rem"
                                fontWeight="500"
                                onClick={onOpenModalLeaveConversation}
                              >
                                <Button
                                  as="div"
                                  w="28px"
                                  h="28px"
                                  p="0"
                                  borderRadius="50%"
                                  mr="8px"
                                  bgColor={bgButton}
                                >
                                  <CustomIcons.icon_leave_conversation />
                                </Button>
                                Rời nhóm
                              </Button>
                            )}
                            {userId &&
                              currConversation.admins.includes(userId) &&
                              user._id !== userId && (
                                <>
                                  <Box
                                    w="296px"
                                    h="1px"
                                    bgColor="#CED0D4"
                                    m="8px 16px"
                                  />
                                  <Button
                                    bgColor="transparent"
                                    w="320px"
                                    h="44px"
                                    p="10px 5px"
                                    justifyContent="left"
                                    fontSize="1.4rem"
                                    fontWeight="500"
                                    onClick={() => {
                                      onOpenModalAddAdmin();
                                      setUserIdProp(user._id);
                                      setUserDisplayNameProp(user.displayName);
                                    }}
                                  >
                                    <Button
                                      as="div"
                                      w="28px"
                                      h="28px"
                                      p="0"
                                      borderRadius="50%"
                                      mr="8px"
                                      bgColor={bgButton}
                                    >
                                      <CustomIcons.icon_add_admin />
                                    </Button>
                                    Chỉ định làm quản trị viên
                                  </Button>
                                  <Button
                                    bgColor="transparent"
                                    w="320px"
                                    h="44px"
                                    p="10px 5px"
                                    justifyContent="left"
                                    fontSize="1.4rem"
                                    fontWeight="500"
                                    onClick={() => {
                                      onOpenModalRemoveMember();
                                      setUserIdProp(user._id);
                                    }}
                                  >
                                    <Button
                                      as="div"
                                      w="28px"
                                      h="28px"
                                      p="0"
                                      borderRadius="50%"
                                      mr="8px"
                                      bgColor={bgButton}
                                    >
                                      <CustomIcons.icon_remove_member />
                                    </Button>
                                    Xóa thành viên
                                  </Button>
                                </>
                              )}
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                    </HStack>
                  );
                })}
                <ModalAddAdmin
                  isOpenModalAddAdmin={isOpenModalAddAdmin}
                  onCloseModalAddAdmin={onCloseModalAddAdmin}
                  conversationId={currConversation._id}
                  userId={userIdProp}
                  userName={userDisplayNameProp}
                />
                <ModalRemoveMember
                  isOpenModalRemoveMember={isOpenModalRemoveMember}
                  onCloseModalRemoveMember={onCloseModalRemoveMember}
                  conversationId={currConversation._id}
                  userId={userIdProp}
                />

                <Button
                  bgColor="transparent"
                  w="100%"
                  h="52px"
                  p="10px 5px"
                  justifyContent="left"
                  fontSize="1.4rem"
                  fontWeight="500"
                  borderRadius="8px"
                  _hover={{
                    bgColor: "bgLightActive.100",
                  }}
                  onClick={onOpenModalAddPeople}
                >
                  <Button
                    as="div"
                    w="36px"
                    h="36px"
                    p="0"
                    borderRadius="50%"
                    mr="8px"
                    bgColor={bgButton}
                    _hover={{ bgColor: bgButton }}
                  >
                    <FiPlus />
                  </Button>
                  Thêm Người
                </Button>
                <ModalAddPeople
                  isOpenModalAddPeople={isOpenModalAddPeople}
                  onCloseModalAddPeople={onCloseModalAddPeople}
                  conversationMembers={currConversation.members}
                  conversationId={currConversation._id}
                />
              </>
            )}
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
            setIsShowOption4(!isShowOption4);
          }}
        >
          File phương tiện, file và liên kết
          {isShowOption4 ? <FaChevronRight /> : <FaChevronDown />}
        </Button>
        {isShowOption4 && (
          <>
            <Button
              bgColor="transparent"
              w="100%"
              h="44px"
              p="10px 5px"
              justifyContent="left"
              fontSize="1.4rem"
              fontWeight="500"
              ref={btnRef}
              onClick={() => {
                onOpenDrawer();
                setOptionOpenDrawer(OptionOpenDrawer.MediaFiles);
              }}
            >
              <Button
                as="div"
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
              ref={btnRef}
              onClick={() => {
                onOpenDrawer();
                setOptionOpenDrawer(OptionOpenDrawer.File);
              }}
            >
              <Button
                as="div"
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
            <Button
              bgColor="transparent"
              w="100%"
              h="44px"
              p="10px 5px"
              justifyContent="left"
              fontSize="1.4rem"
              fontWeight="500"
              ref={btnRef}
              onClick={() => {
                onOpenDrawer();
                setOptionOpenDrawer(OptionOpenDrawer.Link);
              }}
            >
              <Button
                as="div"
                w="28px"
                h="28px"
                p="0"
                borderRadius="50%"
                mr="8px"
                bgColor={bgButton}
              >
                <CustomIcons.icon_link />
              </Button>
              Liên kết
            </Button>
            <DrawerElement
              isOpenDrawer={isOpenDrawer}
              onCloseDrawer={onCloseDrawer}
              btnRef={btnRef}
              optionOpenDrawer={optionOpenDrawer}
              setOptionOpenDrawer={setOptionOpenDrawer}
              conversationId={currConversation?._id}
            />
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
            setIsShowOption5(!isShowOption5);
          }}
        >
          Quyền riêng tư & hỗ trợ
          {isShowOption5 ? <FaChevronRight /> : <FaChevronDown />}
        </Button>
        {isShowOption5 && (
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
                as="div"
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
            {!currConversation?.isGroup && (
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
                    as="div"
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
                    as="div"
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
                    as="div"
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
                    as="div"
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
              </>
            )}
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
                as="div"
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
                <Text
                  fontSize="12px"
                  w="200px"
                  textOverflow="ellipsis"
                  overflow="hidden"
                  color="#65676B"
                  fontWeight="400"
                  whiteSpace="nowrap"
                >
                  Đóng góp ý kiến và báo cáo cuộc trò chuyện
                </Text>
              </Box>
            </Button>
            {currConversation?.isGroup && (
              <>
                <Button
                  bgColor="transparent"
                  w="100%"
                  h="44px"
                  p="10px 5px"
                  justifyContent="left"
                  fontSize="1.4rem"
                  fontWeight="500"
                  onClick={onOpenModalLeaveConversation}
                >
                  <Button
                    as="div"
                    w="28px"
                    h="28px"
                    p="0"
                    borderRadius="50%"
                    mr="8px"
                    bgColor={bgButton}
                  >
                    <CustomIcons.icon_leave_conversation />
                  </Button>
                  Rời nhóm
                </Button>
              </>
            )}
          </>
        )}
        {currConversation && (
          <ModalLeaveConversation
            isOpenModalLeaveConversation={isOpenModalLeaveConversation}
            onCloseModalLeaveConversation={onCloseModalLeaveConversation}
            conversationId={currConversation._id}
          />
        )}
      </Box>
    </VStack>
  );
}
