"use client";
import {
  Box,
  Button,
  Checkbox,
  Input,
  Link,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Variant } from "~/app/types";
import requestApi from "~/utils/api";
import useUserInfo, { UserInfoState } from "~/hooks/useUserInfo";
import { useRouter } from "next/navigation";
import useConversations, { ConversationsState } from "~/hooks/useConversations";
import { stat } from "fs";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm_password: string;
};

interface AuthFormProps {
  variant: Variant;
  setVariant: Dispatch<SetStateAction<Variant>>;
}

const AuthForm = ({ variant, setVariant }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [spinner, setSpinner] = useState(false);

  const router = useRouter();
  const toast = useToast();

  const setUserInfo = useUserInfo((state: UserInfoState) => state.setUserInfo);
  const setFriends = useUserInfo((state: UserInfoState) => state.setFriends);
  const setFriendRequests = useUserInfo(
    (state: UserInfoState) => state.setFriendRequests
  );
  const setStrangeUsers = useUserInfo(
    (state: UserInfoState) => state.setStrangeUsers
  );
  const setConversation = useConversations(
    (state: ConversationsState) => state.setConversations
  );
  const setCurrConversation = useConversations(
    (state: ConversationsState) => state.setCurrConversation
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm<Inputs>();

  const handleResgister: SubmitHandler<Inputs> = async (data) => {
    setSpinner(true);
    if (data.password !== data.confirm_password) {
      toast({
        status: "error",
        position: "top",
        title: `Mật khẩu không khớp`,
        duration: 3000,
      });
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}auth/register`,
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        }
      );
      if (response.data.success) {
        setVariant(Variant.LOGIN);
        setPassword("");
        setConfirmPassword("");
        toast({
          status: "success",
          position: "top",
          title: `Đăng ký thành công`,
          duration: 3000,
        });
        setPassword("");
        setConfirmPassword("");
        reset();
        setSpinner(false);
      }
    } catch (error) {
      console.log(error);
      toast({
        status: "error",
        position: "top",
        title: `Email đã tồn tại`,
        duration: 3000,
      });
    }
  };

  const handleLogin: SubmitHandler<Inputs> = async (data) => {
    try {
      setSpinner(true);
      const { data: responseData } = await requestApi("auth/login", "POST", {
        email: data.email,
        password: data.password,
      });
      if (responseData.success) {
        localStorage.setItem(
          "accessToken",
          responseData.metadata.token.accessToken
        );
        localStorage.setItem(
          "refreshToken",
          responseData.metadata.token.refreshToken
        );
        localStorage.setItem("userId", responseData.metadata.userId);

        const { data: usersData } = await requestApi("users/me", "GET", null);
        setUserInfo({
          firstName: usersData.metadata.firstName,
          lastName: usersData.metadata.lastName,
          avatar: usersData.metadata.avatar,
          _id: usersData.metadata._id,
          displayName: usersData.metadata.displayName,
          email: usersData.metadata.email,
        });
        setFriends(usersData.metadata.friends);
        setFriendRequests(usersData.metadata.friendRequests);
        setStrangeUsers(usersData.metadata.strangers);

        const { data: conversationsData } = await requestApi(
          "conversations",
          "GET",
          null
        );
        setConversation(conversationsData.metadata);
        if (conversationsData.metadata[0]) {
          setCurrConversation(conversationsData.metadata[0]);
          window.location.href =
            "/messenger/conversations/" + conversationsData.metadata[0]._id;
        } else {
          window.location.href = "/messenger/conversations";
        }
      }
      setSpinner(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m={"0 auto"} w={"318px"}>
      {variant === Variant.REGISTER && (
        <Text fontSize={"24px"} textAlign={"center"}>
          Đăng ký
        </Text>
      )}
      {spinner ? (
        <Box w="100%" textAlign="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="primary.100"
            size="xl"
          />
        </Box>
      ) : (
        <form
          onSubmit={handleSubmit(
            variant === "LOGIN" ? handleLogin : handleResgister
          )}
        >
          {variant === Variant.REGISTER && (
            <>
              <Input
                fontSize={"1.4rem"}
                h={"42px"}
                p={"0 16px"}
                mb={"12px"}
                placeholder="Họ"
                {...register("lastName", {
                  required: true,
                  pattern: /^[A-Za-z]+$/i,
                })}
              />
              <Input
                fontSize={"1.4rem"}
                h={"42px"}
                p={"0 16px"}
                mb={"12px"}
                placeholder="Tên"
                {...register("firstName", { required: true, maxLength: 20 })}
              />
            </>
          )}
          <Input
            fontSize={"1.4rem"}
            h={"42px"}
            p={"0 16px"}
            mb={"12px"}
            type="email"
            id="email"
            value={email}
            placeholder={
              variant === Variant.LOGIN ? "Email hoặc số điện thoại" : "Email"
            }
            {...register("email", {
              required: true,
              pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/i,
            })}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(
                  variant === Variant.LOGIN ? handleLogin : handleResgister
                );
              }
            }}
          />
          <Input
            fontSize={"1.4rem"}
            h={"42px"}
            p={"0 16px"}
            mb={"12px"}
            type="password"
            id="password"
            placeholder="Mật khẩu"
            value={password}
            {...register("password", { required: true, minLength: 6 })}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(
                  variant === Variant.LOGIN ? handleLogin : handleResgister
                );
              }
            }}
          />
          {variant === Variant.REGISTER && (
            <Input
              fontSize={"1.4rem"}
              h={"42px"}
              p={"0 16px"}
              mb={"12px"}
              type="password"
              id="confirm_password"
              placeholder="Mật khẩu nhập lại"
              value={confirmPassword}
              {...register("confirm_password", {
                required: true,
                minLength: 6,
              })}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          )}
          <Button
            fontSize={"1.4rem"}
            type="submit"
            colorScheme="blue"
            display={"flex"}
            m={"0 auto"}
          >
            Tiếp tục
          </Button>
          {variant === Variant.LOGIN && (
            <Box display={"flex"} justifyContent={"center"} mt={"30px"}>
              <Checkbox>Duy trì đăng nhập</Checkbox>
            </Box>
          )}
          {variant === Variant.REGISTER && (
            <Link
              display={"flex"}
              justifyContent={"flex-end"}
              mt={"10px"}
              onClick={() => {
                setConfirmPassword("");
                setEmail("");
                setPassword("");
                setVariant(Variant.LOGIN);
              }}
            >
              Quay lại đăng nhập
            </Link>
          )}
        </form>
      )}
    </Box>
  );
};

export default AuthForm;
