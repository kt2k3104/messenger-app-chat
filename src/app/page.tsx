"use client";

import {
  Box,
  Button,
  HStack,
  Img,
  Link,
  Spinner,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import AuthForm from "./components/AuthForm";
import { useEffect, useState } from "react";
import { Variant } from "./types";
import useConversations, { ConversationsState } from "~/hooks/useConversations";
import useLogic, { LogicState } from "~/hooks/useLogic";

export default function Home() {
  const [variant, setVariant] = useState<Variant>(Variant.LOGIN);

  const { colorMode, toggleColorMode } = useColorMode();

  const currConversation = useConversations(
    (state: ConversationsState) => state.currConversation
  );
  const setIsInitLogin = useLogic((state: LogicState) => state.setIsInitLogin);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && currConversation) {
      window.location.href =
        "/messenger/conversations/" + currConversation?._id;
    } else setIsInitLogin(false);
  }, [currConversation, setIsInitLogin]);

  return (
    <Box p={"24vh 0"} h="100vh" overflow="hidden">
      <Button onClick={toggleColorMode}>doi mau</Button>
      <Box display={"flex"} justifyContent={"center"}>
        {/* <Img
          src="https://static.xx.fbcdn.net/rsrc.php/yd/r/hlvibnBVrEb.svg"
          w={"75px"}
          h={"75px"}
          mb={"24px"}
        /> */}
        <svg
          enableBackground="new 0 0 64 64"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "75px", height: "75px" }}
        >
          <circle cx="32" cy="32" fill="#77b3d4" r="32" />
          <path
            d="m52 32c0-9.9-9-18-20-18s-20 8.1-20 18c0 9.6 8.3 17.4 18.8 17.9.7 3.7 1.2 6.1 1.2 6.1s5-3 9.6-8.2c6.2-3.1 10.4-9 10.4-15.8z"
            fill="#231f20"
            opacity=".2"
          />
          <path
            d="m49 28.8c0 15-17 25.2-17 25.2s-9.4-42 0-42 17 7.5 17 16.8z"
            fill="#fff"
          />
          <ellipse cx="32" cy="30" fill="#fff" rx="20" ry="18" />
          <g fill="#4f5d73">
            <circle cx="32" cy="30" r="2" />
            <circle cx="40" cy="30" r="2" />
            <circle cx="24" cy="30" r="2" />
          </g>
        </svg>
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
