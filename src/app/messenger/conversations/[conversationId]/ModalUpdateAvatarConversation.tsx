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
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import requestApi from "~/utils/api";

function ModalUpdateAvatarConversation({
  isOpenModalUpdateAvatarConversation,
  onCloseModalUpdateAvatarConversation,
  conversationId,
}: any) {
  const [image, setImage] = useState<any>(null);
  const [spinner, setSpinner] = useState<boolean>(false);

  const handleSubmitUpdateAvatarConversation = async (e: any) => {
    e.preventDefault();
    setSpinner(true);
    try {
      const formData = new FormData();
      formData.append("thumb", image);
      await requestApi(
        `conversations/update-thumb/${conversationId}`,
        "PATCH",
        formData
      );
      onCloseModalUpdateAvatarConversation();
      setSpinner(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      isOpen={isOpenModalUpdateAvatarConversation}
      onClose={onCloseModalUpdateAvatarConversation}
    >
      <ModalOverlay />
      <ModalContent
        maxW="548px"
        maxH="223px"
        w="548px"
        h="140px"
        mt="39vh"
        borderRadius="10px"
      >
        <ModalHeader>
          <Text fontSize="1.6rem" fontWeight="400" textAlign="center">
            Đổi ảnh đại diện cuộc trò chuyện
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" justifyContent="center">
          {spinner ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
              mt="10px"
            />
          ) : (
            <form
              onSubmit={handleSubmitUpdateAvatarConversation}
              style={{ width: "100%" }}
            >
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImage(e.target.files[0]);
                  }
                }}
                fontSize="1.4rem"
                fontWeight="500"
                mb="20px"
              />
              <Button
                type="submit"
                w="100%"
                h="36px"
                fontSize="1.4rem"
                fontWeight="500"
                colorScheme="blue"
                bgColor="rgba(0, 0, 0, 0.04);"
                color="textPrimary.100"
                _hover={{ bgColor: "rgba(0,0,0,0.08)" }}
              >
                Cập nhật
              </Button>
            </form>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
export default ModalUpdateAvatarConversation;
