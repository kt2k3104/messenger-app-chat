"use client";

import {
  Box,
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
} from "@chakra-ui/react";
import CustomIcons from "~/app/components/Icon";
import useUserInfo, { UserInfoState } from "~/hooks/useUserInfo";
import _ from "lodash";
import requestApi from "~/utils/api";

function ModalAddPeople({
  conversationMembers,
  isOpenModalAddPeople,
  onCloseModalAddPeople,
  conversationId,
}: any) {
  const listFriends = useUserInfo((state: UserInfoState) => state.friends);
  const canBeAddedToGroupUsers = _.differenceWith(
    listFriends,
    conversationMembers,
    (a: any, b: any) => a._id === b._id
  );

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

  return (
    <Modal isOpen={isOpenModalAddPeople} onClose={onCloseModalAddPeople}>
      <ModalOverlay />
      <ModalContent
        maxW="548px"
        maxH="572px"
        w="548px"
        h="572px"
        mt="10vh"
        borderRadius="10px"
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
            borderColor="#CED0D4"
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
          <Box p="16px 16px 0" w="100%" h="120px" bgColor="#333"></Box>
          <Box as="form" onSubmit={handleSubmitAddPeople}>
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
                        : "https://scontent.fhan20-1.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=2b6aad&_nc_eui2=AeE-4fINDkTKpqp6AeNkaBwWso2H55p0AlGyjYfnmnQCUfpKyWf3qbpWB5GlYHhFJgjq-TbNpyj7ju6QXf36ElkA&_nc_ohc=OgbBqcsBbP8AX_9YNZ3&_nc_ht=scontent.fhan20-1.fna&oh=00_AfCcjusBrJFBUgXvN5BGR4d7_vuMDTjjMsaRcYUIbQaWDA&oe=65BF34F8"
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
                  />
                </Button>
              );
            })}
            <Button type="submit">Thêm người</Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalAddPeople;
