"use client";

import {
  Box,
  Button,
  Checkbox,
  HStack,
  Img,
  Input,
  Link,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import useUserInfo from "~/hooks/useUserInfo";
import { commonStyles } from "~/styles/common";
import AuthForm from "./components/AuthForm";
import { useState } from "react";

export enum Variant {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
}

export default function Home() {
  const [variant, setVariant] = useState<Variant>(Variant.LOGIN); // ["LOGIN", "REGISTER"

  const { colorMode, toggleColorMode } = useColorMode();

  // const bg = useColorModeValue("#fff", "#242526");
  // const color = useColorModeValue("black", "#050505");
  return (
    <Box p={"24vh 0"}>
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
