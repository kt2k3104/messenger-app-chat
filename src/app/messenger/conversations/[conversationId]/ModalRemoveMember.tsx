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

function ModalRemoveMember({
  isOpenModalRemoveMember,
  onCloseModalRemoveMember,
  conversationId,
  userId,
}: any) {
  return (
    <Modal isOpen={isOpenModalRemoveMember} onClose={onCloseModalRemoveMember}>
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
            Xóa khỏi đoạn chat?
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
            Bạn có chắc chắn muốn xóa người này khỏi cuộc trò chuyện không? Họ
            sẽ không thể gửi hay nhận tin nhắn mới nữa.
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
            onClick={onCloseModalRemoveMember}
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
                  `conversations/remove-member/${conversationId}`,
                  "PATCH",
                  { memberId: userId }
                );
                onCloseModalRemoveMember();
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Xóa khỏi đoạn chat
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalRemoveMember;
