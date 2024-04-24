"use client";

import {
  Avatar,
  Button,
  HStack,
  Input,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { RiNotification2Line } from "react-icons/ri";
import { FaAngleDown } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

import useUserInfo, { UserInfoState } from "~/hooks/useUserInfo";
import { useState } from "react";
import ModalPerInfo from "~/app/components/ModalPerInfo";

function Header() {
  const [isShowInputSearch, setIsShowInputSearch] = useState(false);
  const currUserInfo = useUserInfo((state: UserInfoState) => state.userInfo);

  const {
    isOpen: isOpenModalPerInfo,
    onOpen: onOpenModalPerInfo,
    onClose: onCloseModalPerInfo,
  } = useDisclosure();
  return (
    <HStack w="100%" h="90px" justifyContent="space-between" p="16px 36px">
      <Text fontSize="2.4rem">Messages</Text>
      <HStack gap="16px">
        <HStack as="form" gap="0" flexShrink="0">
          {isShowInputSearch && <Input type="text" p="5px" />}
          <Button
            as="div"
            bgColor="transparent"
            opacity="0.5"
            fontSize="2.2rem"
            _hover={{ bgColor: "transparent", opacity: "1" }}
            flexShrink="0"
            p="0"
            onClick={() => {
              setIsShowInputSearch(!isShowInputSearch);
            }}
          >
            <CiSearch />
          </Button>
        </HStack>
        <Select
          flexShrink="0"
          w="96px"
          placeholder="English"
          border="none"
          fontSize="1.4rem"
          opacity="0.5"
          _focusVisible={{ outline: "none" }}
          _hover={{
            opacity: "1",
            cursor: "pointer",
          }}
        >
          <option value="Vietnamese">Tiếng Việt</option>
        </Select>
        <Avatar
          icon={<RiNotification2Line />}
          bgColor="transparent"
          p="0"
          w="24px"
          h="24px"
          fontSize="16px"
          opacity="0.5"
          _hover={{
            opacity: "1",
            cursor: "pointer",
          }}
        ></Avatar>
        <Button
          p="20px 10px"
          flexShrink="0"
          borderRadius="999px"
          bgColor="transparent"
          border="1px solid rgba(225,225,225, 0.1)"
          gap="8px"
          onClick={onOpenModalPerInfo}
        >
          <Avatar src={currUserInfo?.avatar} />
          <Text>{currUserInfo?.displayName}</Text>
          <FaAngleDown />
        </Button>
        <ModalPerInfo
          isOpenModalPerInfo={isOpenModalPerInfo}
          onCloseModalPerInfo={onCloseModalPerInfo}
        />
      </HStack>
    </HStack>
  );
}

export default Header;
