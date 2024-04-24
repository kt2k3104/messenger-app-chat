"use client";

import {
  Avatar,
  Button,
  Checkbox,
  HStack,
  Img,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { TiDelete } from "react-icons/ti";

import CustomIcons from "~/app/components/Icon";
import useUserInfo, { UserInfoState } from "~/hooks/useUserInfo";
import _ from "lodash";
import requestApi from "~/utils/api";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function ModalAddPeople({
  conversationMembers,
  isOpenModalAddPeople,
  onCloseModalAddPeople,
  conversationId,
}: any) {
  const [listSelected, setListSelected] = useState<any[]>([]);

  const listFriends = useUserInfo((state: UserInfoState) => state.friends);
  const canBeAddedToGroupUsers = _.differenceWith(
    listFriends,
    conversationMembers,
    (a: any, b: any) => a._id === b._id
  );

  const pathName = usePathname();

  const handleSubmitAddPeople = async (e: any) => {
    e.preventDefault();
    const listChecked: string[] = [];
    canBeAddedToGroupUsers.forEach((user: any) => {
      if (e.target.elements[user._id].checked) {
        listChecked.push(e.target.elements[user._id].value);
      }
    });
    try {
      await requestApi(`conversations/add-members/${conversationId}`, "PATCH", {
        members: listChecked,
      });

      onCloseModalAddPeople();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setListSelected([]);
  }, [isOpenModalAddPeople]);

  return (
    <Modal isOpen={isOpenModalAddPeople} onClose={onCloseModalAddPeople}>
      <ModalOverlay />
      <ModalContent
        maxW="548px"
        maxH="572px"
        w="548px"
        h="572px"
        mt="calc(50vh - 286px)"
        borderRadius="10px"
        bgColor={pathName.split("/")[1] === "appchatcucmanh" ? "#212427" : ""}
      >
        <ModalHeader
          fontSize="1.6rem"
          fontWeight="500"
          p="16px 60px"
          textAlign="center"
        >
          Thêm người
        </ModalHeader>
        <ModalCloseButton
          top="10px"
          right="10px"
          w="36px"
          h="36px"
          borderRadius="50%"
          fontSize="1rem"
        />
        <ModalBody p="0 16px">
          <HStack
            as="form"
            h="36px"
            border="1px solid"
            borderColor={
              pathName.split("/")[1] === "appchatcucmanh" ? "gray" : "#CED0D4"
            }
            borderRadius="8px"
            p="0 8px"
          >
            <CustomIcons.icon_search />
            <Input
              placeholder="Tìm kiếm"
              h="100%"
              fontSize="inherit"
              border="none"
              _focusVisible={{
                outline: "none",
              }}
            />
          </HStack>
          <HStack
            p="16px 16px 0"
            w="100%"
            h="120px"
            justifyContent={listSelected.length === 0 ? "center" : "flex-start"}
            gap="20px"
          >
            {listSelected.length === 0 && (
              <Text fontSize="1.2rem" fontWeight="300">
                Chưa chọn người dùng nào
              </Text>
            )}
            {listSelected.map((user) => {
              return (
                <VStack key={user._id} position="relative">
                  <Avatar src={user.avatar} />
                  <Text fontSize="1.2rem" fontWeight="300">
                    {user.displayName}
                  </Text>
                  {/* <Button
                    position="absolute"
                    top="-10px"
                    right="-5px"
                    p="0"
                    fontSize="1.6rem"
                    borderRadius="50%"
                    bgColor="transparent"
                  >
                    <TiDelete />
                  </Button> */}
                </VStack>
              );
            })}
          </HStack>
          <VStack as="form" onSubmit={handleSubmitAddPeople} h="330px">
            <Text>Gợi ý</Text>
            {canBeAddedToGroupUsers.map((user) => {
              return (
                <Button
                  key={user._id}
                  w="100%"
                  h="52px"
                  bgColor="transparent"
                  justifyContent="flex-start"
                  _hover={{
                    bgColor: "bgLightActive.100",
                  }}
                >
                  <Img
                    src={
                      user.avatar
                        ? user.avatar
                        : "https://scontent.fhan14-5.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=YknWlsUwj4wAX9Xrcoh&_nc_ht=scontent.fhan14-5.fna&oh=00_AfDXmRAlUkJnACxAqR1G5BxGq7Zeaun_IC3chAlXLs0LWA&oe=6617F9F8"
                    }
                    alt="avt"
                    w="36px"
                    h="36px"
                    borderRadius="50%"
                  />
                  <label htmlFor={user._id}>
                    <Text
                      cursor="pointer"
                      ml="8px"
                      fontSize="1.4rem"
                      fontWeight="500"
                    >
                      {user.displayName}
                    </Text>
                  </label>
                  <Checkbox
                    value={user._id}
                    name={user._id}
                    id={user._id}
                    ml="auto"
                    size="lg"
                    colorScheme={
                      pathName.split("/")[1] === "appchatcucmanh"
                        ? "green"
                        : "blue"
                    }
                    onChange={(e) => {
                      if (e.target.checked) {
                        setListSelected((prev) => {
                          return [...prev, user];
                        });
                      } else {
                        setListSelected((prev) => {
                          return prev.filter((item) => item._id !== user._id);
                        });
                      }
                    }}
                  />
                </Button>
              );
            })}
            <Button
              type="submit"
              mt="auto"
              colorScheme={
                pathName.split("/")[1] === "appchatcucmanh" ? "green" : "gray"
              }
              fontSize="1.2rem"
            >
              Thêm người
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalAddPeople;
