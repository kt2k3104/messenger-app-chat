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
import { usePathname } from "next/navigation";
import requestApi from "~/utils/api";

function ModalLeaveConversation({
  isOpenModalLeaveConversation,
  onCloseModalLeaveConversation,
  conversationId,
}: any) {
  const pathName = usePathname();

  return (
    <Modal
      isOpen={isOpenModalLeaveConversation}
      onClose={onCloseModalLeaveConversation}
    >
      <ModalOverlay />
      <ModalContent
        maxW="548px"
        maxH="223px"
        w="548px"
        h="165px"
        mt="39vh"
        borderRadius="10px"
        bgColor={pathName.split("/")[1] === "appchatcucmanh" ? "#212427" : ""}
      >
        <ModalHeader p="16px 60px">
          <Text fontSize="1.6rem" fontWeight="500" textAlign="center">
            Rời khỏi nhóm chat?
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
            Bạn sẽ không nhận được tin nhắn từ cuộc trò chuyện này nữa và mọi
            người sẽ thấy bạn rời nhóm.
          </Text>
          <Button
            as="div"
            type="submit"
            w="254px"
            h="36px"
            borderRadius="5px"
            colorScheme="gray"
            fontSize="1.4rem"
            fontWeight="500"
            cursor="pointer"
            color="textPrimary.100"
            onClick={onCloseModalLeaveConversation}
          >
            Hủy
          </Button>
          <Button
            ml="10px"
            type="submit"
            w="254px"
            h="36px"
            borderRadius="5px"
            colorScheme={
              pathName.split("/")[1] === "appchatcucmanh" ? "green" : "blue"
            }
            fontSize="1.4rem"
            fontWeight="500"
            cursor="pointer"
            onClick={() => {
              try {
                requestApi(
                  `conversations/leave-conversation/${conversationId}`,
                  "PATCH",
                  {}
                );
                onCloseModalLeaveConversation();
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Rời khỏi
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalLeaveConversation;
