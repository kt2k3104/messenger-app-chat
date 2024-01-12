"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import requestApi from "~/utils/api";

function ModalRenameConversation({
  isOpenModalRenameConversation,
  onCloseModalRenameConversation,
  conversationId,
  conversationName,
}: any) {
  const [name, setName] = useState(conversationName);
  const handleSubmitRenameConversation = async (e: any) => {
    e.preventDefault();
    try {
      await requestApi(`conversations/update-info/${conversationId}`, "PATCH", {
        name,
      });
      onCloseModalRenameConversation();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      isOpen={isOpenModalRenameConversation}
      onClose={onCloseModalRenameConversation}
    >
      <ModalOverlay />
      <ModalContent
        maxW="548px"
        maxH="223px"
        w="548px"
        h="223px"
        mt="39vh"
        borderRadius="10px"
      >
        <ModalHeader>
          <Text fontSize="1.6rem" fontWeight="400" textAlign="center">
            Đổi tên đoạn chat
          </Text>
        </ModalHeader>
        <ModalCloseButton
          w="32px"
          h="32px"
          borderRadius="50%"
          fontSize="10px"
        />
        <ModalBody>
          <form onSubmit={handleSubmitRenameConversation}>
            <Text fontSize="1.2rem" fontWeight="300">
              Mọi người đều biết khi tên nhóm thay đổi.
            </Text>
            <Input
              mt="16px"
              w="100%"
              h="56px"
              borderRadius="5px"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tên đoạn chat"
              _placeholder={{
                fontSize: "1.6rem",
                fontWeight: "300",
              }}
              fontSize="1.4rem"
              fontWeight="500"
              mb="20px"
            />
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
              onClick={onCloseModalRenameConversation}
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
              cursor={name ? "pointer" : "not-allowed"}
              opacity={name ? 1 : 0.5}
              bgColor="rgba(0, 0, 0, 0.04);"
              color="textPrimary.100"
              _hover={{ bgColor: "rgba(0,0,0,0.08)" }}
            >
              Lưu
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
export default ModalRenameConversation;
