"use client";
import {
  Box,
  Button,
  Checkbox,
  Input,
  Link,
  Text,
  Toast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Variant } from "../page";
import requestApi from "~/utils/api";
import useUserInfo, { UserInfoState } from "~/hooks/useUserInfo";
import { useRouter } from "next/navigation";

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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const setBasicUserInfo = useUserInfo(
    (state: UserInfoState) => state.setBasicUserInfo
  );
  const setFriends = useUserInfo((state: UserInfoState) => state.setFriends);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm<Inputs>();

  const handleResgister: SubmitHandler<Inputs> = async (data) => {
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
      }
      console.log(response);
      reset();
      Toast({
        position: "top",
        render: () => (
          <Box
            color="white"
            p={5}
            bg="#4c7cff"
            borderRadius={"5px"}
            mt={"30px"}
          >
            Đăng ký thành công!
          </Box>
        ),
        duration: 1000,
      });
    } catch (error) {
      console.log(error);
      // if (error.message.includes("ER_EMAIL_HAD_ACC")) {
      //   setError("ER_EMAIL_HAD_ACC", {
      //     type: "emaildatontai",
      //   });
      // }
    }
  };

  const handleLogin: SubmitHandler<Inputs> = async (data) => {
    try {
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

        const { data: allUser } = await requestApi("users", "GET", null);

        const { data: usersData } = await requestApi("users/me", "GET", null);
        setBasicUserInfo({
          firstName: usersData.metadata.firstName,
          lastName: usersData.metadata.lastName,
          avatar: usersData.metadata.avatar,
          _id: usersData.metadata._id,
          displayName: usersData.metadata.displayName,
          email: usersData.metadata.email,
        });

        setFriends(allUser);

        router.push("/messenger");
      }

      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box m={"0 auto"} w={"318px"}>
      {variant === Variant.REGISTER && (
        <Text fontSize={"20px"} textAlign={"center"}>
          Đăng ký
        </Text>
      )}
      <form
        onSubmit={handleSubmit(
          variant === "LOGIN" ? handleLogin : handleResgister
        )}
      >
        {variant === Variant.REGISTER && (
          <>
            <Input
              h={"42px"}
              p={"0 16px"}
              mb={"12px"}
              placeholder="Họ"
              {...register("lastName", { pattern: /^[A-Za-z]+$/i })}
            />
            <Input
              h={"42px"}
              p={"0 16px"}
              mb={"12px"}
              placeholder="Tên"
              {...register("firstName", { required: true, maxLength: 20 })}
            />
          </>
        )}
        <Input
          h={"42px"}
          p={"0 16px"}
          mb={"12px"}
          type="email"
          id="email"
          placeholder={
            variant === Variant.LOGIN ? "Email hoặc số điện thoại" : "Email"
          }
          {...register("email", {
            required: true,
            pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/i,
          })}
        />
        <Input
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
            // if (errors.ER_PASS_IN_COR) clearErrors('ER_PASS_IN_COR');
          }}
        />
        {variant === Variant.REGISTER && (
          <Input
            h={"42px"}
            p={"0 16px"}
            mb={"12px"}
            type="password"
            id="confirm_password"
            placeholder="Mật khẩu nhập lại"
            value={confirmPassword}
            {...register("confirm_password", { required: true, minLength: 6 })}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (e.target.value !== password)
                setError("confirm_password", {
                  type: "manual",
                  message: "Mật khẩu không khớp",
                });
              // if (errors.ER_PASS_IN_COR) clearErrors('ER_PASS_IN_COR');
            }}
          />
        )}
        <Button type="submit" colorScheme="blue" display={"flex"} m={"0 auto"}>
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
              setVariant(Variant.LOGIN);
            }}
          >
            Quay lại đăng nhập
          </Link>
        )}
      </form>
    </Box>
  );
};

export default AuthForm;
