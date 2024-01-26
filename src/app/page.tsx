"use client";

import {
  Box,
  Button,
  HStack,
  Img,
  Link,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import AuthForm from "./components/AuthForm";
import { useEffect, useState } from "react";
import { Variant } from "./types";
import useConversations, { ConversationsState } from "~/hooks/useConversations";

export default function Home() {
  const [variant, setVariant] = useState<Variant>(Variant.LOGIN);

  const { colorMode, toggleColorMode } = useColorMode();

  const currConversation = useConversations(
    (state: ConversationsState) => state.currConversation
  );

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && currConversation) {
      window.location.href =
        "/messenger/conversations/" + currConversation?._id;
    }
  }, [currConversation]);

  return (
    <Box p={"24vh 0"} h="100vh" overflow="hidden">
      <Button onClick={toggleColorMode}>doi mau</Button>
      <Box display={"flex"} justifyContent={"center"}>
        <Img
          src="https://static.xx.fbcdn.net/rsrc.php/yd/r/hlvibnBVrEb.svg"
          w={"75px"}
          h={"75px"}
          mb={"24px"}
        />
      </Box>
      {variant === "LOGIN" && (
        <Text
          fontSize={"35px"}
          fontWeight={"350"}
          lineHeight={"40px"}
          m={"24px 45px 48px"}
          textAlign={"center"}
        >
          Kết nối với những người bạn yêu quý.
        </Text>
      )}
      <AuthForm variant={variant} setVariant={setVariant} />
      <HStack
        justifyContent={"center"}
        position={"fixed"}
        bottom={"10px"}
        w={"100vw"}
        fontSize={"15px"}
        fontWeight={"300"}
      >
        <Link
          mr={"30px"}
          overflow={"hidden"}
          onClick={() => {
            setVariant(Variant.REGISTER);
          }}
        >
          Chưa dùng FaceBook? (Đăng ký)
        </Link>
        <Link mr={"30px"} overflow={"hidden"}>
          Quên mật khẩu
        </Link>
        <Link mr={"30px"} overflow={"hidden"}>
          Chính sách quyền riêng tư
        </Link>
        <Link mr={"30px"} overflow={"hidden"}>
          Điều khoản
        </Link>
        <Link mr={"30px"} overflow={"hidden"}>
          Chính sách cookie
        </Link>
        <Link mr={"30px"} overflow={"hidden"}>
          {" "}
          © Meta 2023
        </Link>
      </HStack>
    </Box>
  );
}
