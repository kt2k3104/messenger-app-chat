"use client";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useRef } from "react";

function AlertLogout({ isOpen, onClose }: any) {
  const pathName = usePathname();
  const cancelRef = useRef<any>();
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent
          mt="35vh"
          bgColor={pathName.split("/")[1] === "appchatcucmanh" ? "#212427" : ""}
        >
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Đăng xuất
          </AlertDialogHeader>

          <AlertDialogBody>Bạn có chắc chắn muốn đăng xuất?</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Hủy
            </Button>
            <Button
              ml={3}
              colorScheme={
                pathName.split("/")[1] === "appchatcucmanh" ? "green" : "blue"
              }
              onClick={() => {
                localStorage.removeItem("accessToken");
                window.location.href = "/";
              }}
            >
              Đăng xuất
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default AlertLogout;
