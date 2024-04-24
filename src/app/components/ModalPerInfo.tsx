"use client";

import {
  Box,
  Button,
  HStack,
  Img,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Switch,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import useUserInfo, { UserInfoState } from "~/hooks/useUserInfo";
import CustomIcons from "./Icon";
import requestApi from "~/utils/api";
import { useForm } from "react-hook-form";
import { MdLogout } from "react-icons/md";
import { usePathname } from "next/navigation";
import AlertLogout from "./AlertLogout";

function ModalPerInfo({
  isOpenModalPerInfo,
  onCloseModalPerInfo,
}: {
  isOpenModalPerInfo: boolean;
  onCloseModalPerInfo: () => void;
}) {
  const userInfo = useUserInfo((state: UserInfoState) => state.userInfo);
  const setUserInfo = useUserInfo((state: UserInfoState) => state.setUserInfo);

  const bg = useColorModeValue("#e5e5e5", "#ffffff1a");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const pathName = usePathname();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm<any>();

  const handleChangePassword = async (data: any) => {
    try {
      if (data["new-password"] !== data["confirm-new-password"]) {
        setError("confirm_new_password_does_not_match", {
          type: "validate",
          message: "Mật khẩu không khớp",
        });
        return;
      }
      const token = localStorage.getItem("accessToken");
      const response = await requestApi(
        `auth/reset-password?token=${token}`,
        "POST",
        {
          password: data["new-password"],
        }
      );
      console.log(response);
      reset();
      toast({
        position: "top",
        render: () => (
          <Box
            color="white"
            p={5}
            bg="#4c7cff"
            borderRadius={"5px"}
            mt={"30px"}
          >
            Đổi mật khẩu thành công!
          </Box>
        ),
        duration: 1000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpenModalPerInfo} onClose={onCloseModalPerInfo}>
      <ModalOverlay />
      <ModalContent
        maxW="548px"
        mt="calc((100vh - 639px)/2)"
        borderRadius="10px"
        overflow="auto"
        bgColor={pathName.split("/")[1] === "appchatcucmanh" ? "#212427" : ""}
      >
        <ModalHeader
          textAlign="center"
          fontSize="1.6rem"
          fontWeight="500"
          w="100%"
          h="100%"
          p="16px 60px"
        >
          Tùy chọn
        </ModalHeader>
        <ModalCloseButton
          w="32px"
          h="32px"
          borderRadius="50%"
          fontSize="10px"
          top="10px"
        />
        <ModalBody p="8px">
          <Text fontSize="1.4rem" fontWeight="500" p="8px">
            Tài khoản
          </Text>
          <Button
            as="div"
            w="100%"
            h="68px"
            p="8px"
            justifyContent="flex-start"
            alignItems="center"
            gap="10px"
            borderRadius="8px"
            bgColor="transparent"
            cursor="pointer"
          >
            <Tooltip
              hasArrow
              label="đổi avatar"
              fontSize="1.4rem"
              p="0 5px"
              borderRadius="5px"
            >
              <label htmlFor="avatar">
                <Img
                  src={
                    userInfo?.avatar
                      ? userInfo.avatar
                      : "https://scontent.fhan14-5.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=YknWlsUwj4wAX9Xrcoh&_nc_ht=scontent.fhan14-5.fna&oh=00_AfDXmRAlUkJnACxAqR1G5BxGq7Zeaun_IC3chAlXLs0LWA&oe=6617F9F8"
                  }
                  alt="avt"
                  w="60px"
                  h="60px"
                  borderRadius="50%"
                  cursor="pointer"
                  _hover={{
                    opacity: "0.8",
                  }}
                />
              </label>
            </Tooltip>
            <Input
              display="none"
              type="file"
              name="avatar"
              id="avatar"
              accept="image/*"
              onChange={(e) => {
                const handleUploadAvartar = async () => {
                  try {
                    if (e.target.files && e.target.files.length > 0) {
                      const formData = new FormData();
                      formData.append("avatar", e.target.files[0]);
                      const response = await requestApi(
                        "users/upload-avt",
                        "POST",
                        formData
                      );
                      e.target.value = "";
                      if (userInfo) {
                        setUserInfo({
                          ...userInfo,
                          avatar: response.data.metadata.url,
                        });
                      }
                    }
                  } catch (error) {
                    console.log(error);
                  }
                };
                handleUploadAvartar();
              }}
            />
            <Box>
              <Text fontSize="1.4rem" fontWeight="500">
                {userInfo?.displayName}
              </Text>
              <Popover placement="right" onClose={reset}>
                <PopoverTrigger>
                  <Text
                    mt="5px"
                    fontSize="1.2rem"
                    fontWeight="300"
                    _hover={{ color: "primary.100" }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Đổi mật khẩu
                  </Text>
                </PopoverTrigger>
                <PopoverContent
                  p="5px"
                  borderRadius="10px"
                  bgColor={
                    pathName.split("/")[1] === "appchatcucmanh" ? "#212427" : ""
                  }
                >
                  <PopoverArrow
                    bgColor={
                      pathName.split("/")[1] === "appchatcucmanh"
                        ? "#212427"
                        : ""
                    }
                  />
                  <PopoverCloseButton />
                  <PopoverHeader fontSize="1.4rem" fontWeight="500">
                    Đổi mật khẩu
                  </PopoverHeader>
                  <PopoverBody
                    as="form"
                    display="flex"
                    flexDirection="column"
                    fontWeight="400"
                    gap="2px"
                    onSubmit={handleSubmit(handleChangePassword)}
                  >
                    <label>Mật khẩu cũ</label>
                    <Input
                      type="password"
                      id="old-password"
                      mb="5px"
                      {...register("old-password", { required: true })}
                    />
                    <label>Mật khẩu mới</label>
                    <Input
                      type="password"
                      id="new-password"
                      mb="5px"
                      {...register("new-password", { required: true })}
                      onChange={() => {
                        if (errors.confirm_new_password_does_not_match)
                          clearErrors("confirm_new_password_does_not_match");
                      }}
                    />
                    <label>Nhập lại mật khẩu mới</label>
                    <Input
                      type="password"
                      id="confirm-new-password"
                      {...register("confirm-new-password", { required: true })}
                      onChange={() => {
                        if (errors.confirm_new_password_does_not_match)
                          clearErrors("confirm_new_password_does_not_match");
                      }}
                    />
                    {errors.confirm_new_password_does_not_match && (
                      <Text color="red.500" fontSize="1.2rem">
                        Mật khẩu không khớp
                      </Text>
                    )}
                    <Button type="submit" mt="5px">
                      Xác nhận
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
          </Button>
          <Box bgColor={bg} h="2px" w="100%" />
          <Button
            as="div"
            w="100%"
            h="52px"
            bgColor="transparent"
            justifyContent="flex-start"
            gap="8px"
            cursor="pointer"
          >
            <Button as="div" w="36px" h="36px" borderRadius="50%" p="0">
              <CustomIcons.icon_active_status />
            </Button>
            <Text fontSize="1.4rem" fontWeight="500">
              Trạng thái hoạt động: ĐANG BẬT
            </Text>
          </Button>
          <Box bgColor={bg} h="1px" w="100%" />
          <Text fontSize="1.4rem" fontWeight="500" p="8px">
            Thông báo
          </Text>
          <HStack
            w="100%"
            h="86px"
            p="10px 8px"
            justifyContent="flex-start"
            gap="8px"
            cursor="pointer"
          >
            <Button
              as="div"
              w="36px"
              h="36px"
              borderRadius="50%"
              flexShrink="0"
            >
              <CustomIcons.icon_volume />
            </Button>
            <Box>
              <Text fontWeight="500" fontSize="1.4rem">
                Âm thanh thông báo
              </Text>
              <Text fontSize="1.2rem" fontWeight="400">
                Dùng thông báo bằng âm thanh để biết về tin nhắn, cuộc gọi đến,
                đoạn chat video và âm thanh trong ứng dụng
              </Text>
            </Box>
            <Switch size="lg" />
          </HStack>
          <HStack
            w="100%"
            h="72px"
            p="10px 8px"
            justifyContent="flex-start"
            gap="8px"
            cursor="pointer"
          >
            <Button as="div" w="36px" h="36px" borderRadius="50%">
              <CustomIcons.icon_volume />
            </Button>
            <Box>
              <Text fontWeight="500" fontSize="1.4rem">
                Không làm phiền
              </Text>
              <Text fontSize="1.2rem" fontWeight="400">
                Tắt thông báo trong một khoảng thời gian cụ thể
              </Text>
            </Box>
            <Switch size="lg" ml="auto" />
          </HStack>
          <Box bgColor={bg} h="1px" w="100%" />
          <Button
            as="div"
            w="100%"
            h="52px"
            gap="8px"
            justifyContent="flex-start"
            bgColor="transparent"
            cursor="pointer"
          >
            <Button as="div" w="36px" h="36px" borderRadius="50%" p="0">
              <CustomIcons.icon_payment_management />
            </Button>
            <Text fontWeight="500" fontSize="1.4rem">
              Quản lý khoản thanh toán
            </Text>
          </Button>
          <Button
            as="div"
            w="100%"
            h="52px"
            gap="8px"
            justifyContent="flex-start"
            bgColor="transparent"
            cursor="pointer"
          >
            <Button as="div" w="36px" h="36px" borderRadius="50%" p="0">
              <CustomIcons.icon_manage_message_sending_activities />
            </Button>
            <Text fontWeight="500" fontSize="1.4rem">
              Quản lý hoạt động gửi tin nhắn
            </Text>
          </Button>
          <Button
            as="div"
            w="100%"
            h="52px"
            gap="8px"
            justifyContent="flex-start"
            bgColor="transparent"
            cursor="pointer"
          >
            <Button as="div" w="36px" h="36px" borderRadius="50%" p="0">
              <CustomIcons.icon_block />
            </Button>
            <Text fontWeight="500" fontSize="1.4rem">
              Quản lý phần Chặn
            </Text>
          </Button>
          <Box bgColor={bg} h="1px" w="100%" mb="2px" />
          <Button
            as="div"
            w="100%"
            h="52px"
            gap="8px"
            justifyContent="flex-start"
            bgColor="transparent"
            cursor="pointer"
            onClick={onOpen}
          >
            <Button
              as="div"
              w="36px"
              h="36px"
              borderRadius="50%"
              p="0"
              fontSize="16px"
            >
              <MdLogout />
            </Button>
            <Text fontWeight="500" fontSize="1.4rem">
              Đăng xuất
            </Text>
          </Button>
          <AlertLogout isOpen={isOpen} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
export default ModalPerInfo;
