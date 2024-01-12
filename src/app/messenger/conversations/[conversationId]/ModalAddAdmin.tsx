"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import requestApi from "~/utils/api";

function ModalAddAdmin({
  isOpenModalAddAdmin,
  onCloseModalAddAdmin,
  conversationId,
  userId,
  userName,
}: any) {
  return (
    <Modal isOpen={isOpenModalAddAdmin} onClose={onCloseModalAddAdmin}>
      <ModalOverlay />
      <ModalContent
        maxW="548px"
        maxH="223px"
        w="548px"
        h="165px"
        mt="39vh"
        borderRadius="10px"
      >
        <ModalHeader p="16px 60px">
          <Text fontSize="1.6rem" fontWeight="500" textAlign="center">
            Thêm quản trị viên nhóm?
          </Text>
        </ModalHeader>
        <ModalCloseButton
          w="32px"
          h="32px"
          borderRadius="50%"
          fontSize="10px"
        />
        <ModalBody>
          <Text
            m="0 10px 16px"
            fontSize="1.2rem"
            fontWeight="400"
            textAlign="center"
          >
            Là quản trị viên nhóm, &quot;{userName}&quot; có thể quyết định ai
            có thể tham gia và tủy chỉnh cuộc trò chuyện này
          </Text>
          <Button
            as="div"
            type="submit"
            w="254px"
            h="36px"
            borderRadius="5px"
            colorScheme="blue"
            fontSize="1.4rem"
            fontWeight="500"
            cursor="pointer"
            bgColor="rgba(0, 0, 0, 0.04);"
            color="textPrimary.100"
            _hover={{ bgColor: "rgba(0,0,0,0.08)" }}
            onClick={onCloseModalAddAdmin}
          >
            Hủy
          </Button>
          <Button
            ml="10px"
            type="submit"
            w="254px"
            h="36px"
            borderRadius="5px"
            colorScheme="blue"
            fontSize="1.4rem"
            fontWeight="500"
            cursor="pointer"
            onClick={() => {
              try {
                requestApi(
                  `conversations/add-admin/${conversationId}`,
                  "PATCH",
                  { memberId: userId }
                );
                onCloseModalAddAdmin();
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Chỉ định làm quản trị viên
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalAddAdmin;
