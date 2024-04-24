"use client";

import {
  Avatar,
  Box,
  Divider,
  HStack,
  Icon,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { RiHome5Line } from "react-icons/ri";
import { GoDotFill } from "react-icons/go";
import { RiContactsBookUploadLine } from "react-icons/ri";
import { AiOutlineTeam } from "react-icons/ai";
import { BiMessageSquareDots } from "react-icons/bi";
import { RiTaskLine } from "react-icons/ri";
import { LuCalendar } from "react-icons/lu";
import { GiBackwardTime } from "react-icons/gi";
import { TbReportAnalytics } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { usePathname, useRouter } from "next/navigation";
import useConversations, { ConversationsState } from "~/hooks/useConversations";
import useLogic, { LogicState } from "~/hooks/useLogic";
import { memo, useEffect } from "react";
import { Conversation } from "~/hooks/useUserInfo";
import { is } from "date-fns/locale";
import AlertLogout from "../components/AlertLogout";

function SideBar() {
  const conversations = useConversations(
    (state: ConversationsState) => state.conversations
  );
  const notSeenMessages = useLogic(
    (state: LogicState) => state.notSeenMessages
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const bg = useColorModeValue("#e5e5e5", "#212427");
  const pathName = usePathname();

  return (
    <Box
      w={{ base: "60px", lg: "200px", xl: "240px" }}
      h="100%"
      borderRadius="20px"
      bgColor={bg}
      flexShrink={0}
    >
      <HStack
        w="100%"
        h="90px"
        alignItems="center"
        justifyContent={{ base: "center", lg: "flex-start" }}
        ml={{ base: "0", lg: "28px", xl: "42px" }}
        gap="10px"
      >
        <svg
          enableBackground="new 0 0 64 64"
          viewBox="0 0 64 64"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "36px", height: "36px" }}
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
        <Text
          display={{ base: "none", lg: "block" }}
          fontSize="2.4rem"
          fontWeight="700"
        >
          Chatchit
        </Text>
      </HStack>
      <Link href={"/appchatcucmanh"}>
        <Avatar
          icon={<></>}
          w="100%"
          height="44px"
          fontSize="1.4rem"
          justifyContent={{ base: "center", lg: "flex-start" }}
          pl={{ base: "0", lg: "42px" }}
          bgColor="transparent"
          bgImage={
            pathName.split("/").length < 3
              ? "linear-gradient(to right, rgba(68, 41, 51, 1), rgba(68, 41, 51, 0))"
              : "transparent"
          }
          borderRadius="0"
          borderRight={
            pathName.split("/").length < 3 ? "3px solid #db4663" : "transparent"
          }
          role="group"
        >
          <Box
            opacity={pathName.split("/").length < 3 ? 1 : 0.5}
            _groupHover={{ opacity: 1 }}
            fontSize={{ base: "2.4rem", lg: "1.4rem" }}
          >
            <RiHome5Line />
          </Box>
          <Text
            display={{ base: "none", lg: "block" }}
            ml="10px"
            textTransform="none"
            opacity={pathName.split("/").length < 3 ? 1 : 0.5}
            _groupHover={{ opacity: 1 }}
          >
            Home
          </Text>
          <Icon
            display={{
              base: "none",
              lg: pathName.split("/").length < 3 ? "block" : "none",
            }}
            as={GoDotFill}
            color="#53aa91"
            ml="auto"
            mr="10px"
          />
        </Avatar>
      </Link>
      <Link href={"/appchatcucmanh/contacts"}>
        <Avatar
          icon={<></>}
          w="100%"
          height="44px"
          fontSize="1.4rem"
          justifyContent={{ base: "center", lg: "flex-start" }}
          pl={{ base: "0", lg: "42px" }}
          bgColor="transparent"
          bgImage={
            pathName.split("/")[2] === "contacts"
              ? "linear-gradient(to right, rgba(68, 41, 51, 1), rgba(68, 41, 51, 0))"
              : "transparent"
          }
          borderRadius="0"
          borderRight={
            pathName.split("/")[2] === "contacts" ? "3px solid #db4663" : "none"
          }
          role="group"
        >
          <Box
            opacity={pathName.split("/")[2] === "contacts" ? 1 : 0.5}
            _groupHover={{ opacity: 1 }}
            fontSize={{ base: "2.4rem", lg: "1.4rem" }}
          >
            <RiContactsBookUploadLine />
          </Box>
          <Text
            display={{ base: "none", lg: "block" }}
            ml="10px"
            textTransform="none"
            opacity={pathName.split("/")[2] === "contacts" ? 1 : 0.5}
            _groupHover={{ opacity: 1 }}
          >
            Contacts
          </Text>
          <Icon
            display={{
              base: "none",
              lg: pathName.split("/")[2] === "contacts" ? "block" : "none",
            }}
            as={GoDotFill}
            color="#53aa91"
            ml="auto"
            mr="10px"
          />
        </Avatar>
      </Link>
      <Link href={"/appchatcucmanh/myteam"}>
        <Avatar
          icon={<></>}
          w="100%"
          height="44px"
          fontSize="1.4rem"
          justifyContent={{ base: "center", lg: "flex-start" }}
          pl={{ base: "0", lg: "42px" }}
          bgColor="transparent"
          bgImage={
            pathName.split("/")[2] === "myteam"
              ? "linear-gradient(to right, rgba(68, 41, 51, 1), rgba(68, 41, 51, 0))"
              : "transparent"
          }
          borderRadius="0"
          borderRight={
            pathName.split("/")[2] === "myteam" ? "3px solid #db4663" : "none"
          }
          role="group"
        >
          <Box
            opacity={pathName.split("/")[2] === "myteam" ? 1 : 0.5}
            _groupHover={{ opacity: 1 }}
            fontSize={{ base: "2.4rem", lg: "1.4rem" }}
          >
            <AiOutlineTeam />
          </Box>
          <Text
            display={{ base: "none", lg: "block" }}
            ml="10px"
            textTransform="none"
            opacity={pathName.split("/")[2] === "myteam" ? 1 : 0.5}
            _groupHover={{ opacity: 1 }}
          >
            My Team
          </Text>
          <Icon
            display={{
              base: "none",
              lg: pathName.split("/")[2] === "myteam" ? "block" : "none",
            }}
            as={GoDotFill}
            color="#53aa91"
            ml="auto"
            mr="10px"
          />
        </Avatar>
      </Link>
      <Link
        href={`/appchatcucmanh/messages/${
          conversations.find(
            (val: Conversation) => !notSeenMessages.includes(val._id)
          )?._id
        }`}
      >
        <Avatar
          icon={<></>}
          w="100%"
          height="44px"
          fontSize="1.4rem"
          justifyContent={{ base: "center", lg: "flex-start" }}
          pl={{ base: "0", lg: "42px" }}
          bgColor="transparent"
          bgImage={
            pathName.split("/")[2] === "messages"
              ? "linear-gradient(to right, rgba(68, 41, 51, 1), rgba(68, 41, 51, 0))"
              : "transparent"
          }
          borderRadius="0"
          borderRight={
            pathName.split("/")[2] === "messages" ? "3px solid #db4663" : "none"
          }
          role="group"
        >
          <Box
            opacity={pathName.split("/")[2] === "messages" ? 1 : 0.5}
            _groupHover={{ opacity: 1 }}
            fontSize={{ base: "2.4rem", lg: "1.4rem" }}
          >
            <BiMessageSquareDots />
          </Box>
          <Text
            display={{ base: "none", lg: "block" }}
            ml="10px"
            textTransform="none"
            opacity={pathName.split("/")[2] === "messages" ? 1 : 0.5}
            _groupHover={{ opacity: 1 }}
          >
            Messages
          </Text>
          <Icon
            display={{
              base: "none",
              lg: pathName.split("/")[2] === "messages" ? "block" : "none",
            }}
            as={GoDotFill}
            color="#53aa91"
            ml="auto"
            mr="10px"
          />
        </Avatar>
      </Link>
      <Link href={"/appchatcucmanh/tasks"}>
        <Avatar
          icon={<></>}
          w="100%"
          height="44px"
          fontSize="1.4rem"
          justifyContent={{ base: "center", lg: "flex-start" }}
          pl={{ base: "0", lg: "42px" }}
          bgColor="transparent"
          bgImage={
            pathName.split("/")[2] === "tasks"
              ? "linear-gradient(to right, rgba(68, 41, 51, 1), rgba(68, 41, 51, 0))"
              : "transparent"
          }
          borderRadius="0"
          borderRight={
            pathName.split("/")[2] === "tasks" ? "3px solid #db4663" : "none"
          }
          role="group"
        >
          <Box
            opacity={pathName.split("/")[2] === "tasks" ? 1 : 0.5}
            _groupHover={{ opacity: 1 }}
            fontSize={{ base: "2.4rem", lg: "1.4rem" }}
          >
            <RiTaskLine />
          </Box>
          <Text
            display={{ base: "none", lg: "block" }}
            ml="10px"
            textTransform="none"
            opacity={pathName.split("/")[2] === "tasks" ? 1 : 0.5}
            _groupHover={{ opacity: 1 }}
          >
            Tasks
          </Text>
          <Icon
            display={{
              base: "none",
              lg: pathName.split("/")[2] === "tasks" ? "block" : "none",
            }}
            as={GoDotFill}
            color="#53aa91"
            ml="auto"
            mr="10px"
          />
        </Avatar>
      </Link>
      <Link href={"/appchatcucmanh/calendar"}>
        <Avatar
          icon={<></>}
          w="100%"
          height="44px"
          fontSize="1.4rem"
          justifyContent={{ base: "center", lg: "flex-start" }}
          pl={{ base: "0", lg: "42px" }}
          bgColor="transparent"
          bgImage={
            pathName.split("/")[2] === "calendar"
              ? "linear-gradient(to right, rgba(68, 41, 51, 1), rgba(68, 41, 51, 0))"
              : "transparent"
          }
          borderRadius="0"
          borderRight={
            pathName.split("/")[2] === "calendar" ? "3px solid #db4663" : "none"
          }
          role="group"
        >
          <Box
            opacity={pathName.split("/")[2] === "calendar" ? 1 : 0.5}
            _groupHover={{ opacity: 1 }}
            fontSize={{ base: "2.4rem", lg: "1.4rem" }}
          >
            <LuCalendar />
          </Box>
          <Text
            display={{ base: "none", lg: "block" }}
            ml="10px"
            textTransform="none"
            opacity={pathName.split("/")[2] === "calendar" ? 1 : 0.5}
            _groupHover={{ opacity: 1 }}
          >
            Calendar
          </Text>
          <Icon
            display={{
              base: "none",
              lg: pathName.split("/")[2] === "calendar" ? "block" : "none",
            }}
            as={GoDotFill}
            color="#53aa91"
            ml="auto"
            mr="10px"
          />
        </Avatar>
      </Link>
      <Link href={"/appchatcucmanh/activity"}>
        <Avatar
          icon={<></>}
          w="100%"
          height="44px"
          fontSize="1.4rem"
          justifyContent={{ base: "center", lg: "flex-start" }}
          pl={{ base: "0", lg: "42px" }}
          bgColor="transparent"
          bgImage={
            pathName.split("/")[2] === "activity"
              ? "linear-gradient(to right, rgba(68, 41, 51, 1), rgba(68, 41, 51, 0))"
              : "transparent"
          }
          borderRadius="0"
          borderRight={
            pathName.split("/")[2] === "activity" ? "3px solid #db4663" : "none"
          }
          role="group"
        >
          <Box
            opacity={pathName.split("/")[2] === "activity" ? 1 : 0.5}
            _groupHover={{ opacity: 1 }}
            fontSize={{ base: "2.4rem", lg: "1.4rem" }}
          >
            <GiBackwardTime />
          </Box>
          <Text
            display={{ base: "none", lg: "block" }}
            ml="10px"
            textTransform="none"
            opacity={pathName.split("/")[2] === "activity" ? 1 : 0.5}
            _groupHover={{ opacity: 1 }}
          >
            Activity
          </Text>
          <Icon
            display={{
              base: "none",
              lg: pathName.split("/")[2] === "activity" ? "block" : "none",
            }}
            as={GoDotFill}
            color="#53aa91"
            ml="auto"
            mr="10px"
          />
        </Avatar>
      </Link>
      <Link href={"/appchatcucmanh/reports"}>
        <Avatar
          icon={<></>}
          w="100%"
          height="44px"
          fontSize="1.4rem"
          justifyContent={{ base: "center", lg: "flex-start" }}
          pl={{ base: "0", lg: "42px" }}
          bgColor="transparent"
          bgImage={
            pathName.split("/")[2] === "reports"
              ? "linear-gradient(to right, rgba(68, 41, 51, 1), rgba(68, 41, 51, 0))"
              : "transparent"
          }
          borderRadius="0"
          borderRight={
            pathName.split("/")[2] === "reports" ? "3px solid #db4663" : "none"
          }
          role="group"
        >
          <Box
            opacity={pathName.split("/")[2] === "reports" ? 1 : 0.5}
            _groupHover={{ opacity: 1 }}
            fontSize={{ base: "2.4rem", lg: "1.4rem" }}
          >
            <TbReportAnalytics />
          </Box>
          <Text
            display={{ base: "none", lg: "block" }}
            ml="10px"
            textTransform="none"
            opacity={pathName.split("/")[2] === "reports" ? 1 : 0.5}
            _groupHover={{ opacity: 1 }}
          >
            Reports
          </Text>
          <Icon
            display={{
              base: "none",
              lg: pathName.split("/")[2] === "reports" ? "block" : "none",
            }}
            as={GoDotFill}
            color="#53aa91"
            ml="auto"
            mr="10px"
          />
        </Avatar>
      </Link>
      <Box w="100%" p="10px 0">
        <Divider />
      </Box>
      <Link href={"/appchatcucmanh/myprofile"}>
        <Avatar
          icon={<></>}
          w="100%"
          height="44px"
          fontSize="1.4rem"
          justifyContent={{ base: "center", lg: "flex-start" }}
          pl={{ base: "0", lg: "42px" }}
          bgColor="transparent"
          bgImage={
            pathName.split("/")[2] === "myprofile"
              ? "linear-gradient(to right, rgba(68, 41, 51, 1), rgba(68, 41, 51, 0))"
              : "transparent"
          }
          borderRadius="0"
          borderRight={
            pathName.split("/")[2] === "myprofile"
              ? "3px solid #db4663"
              : "none"
          }
          role="group"
        >
          <Box
            opacity={pathName.split("/")[2] === "myprofile" ? 1 : 0.5}
            _groupHover={{ opacity: 1 }}
            fontSize={{ base: "2.4rem", lg: "1.4rem" }}
          >
            <FaRegUserCircle />
          </Box>
          <Text
            display={{ base: "none", lg: "block" }}
            ml="10px"
            textTransform="none"
            opacity={pathName.split("/")[2] === "myprofile" ? 1 : 0.5}
            _groupHover={{ opacity: 1 }}
          >
            My Profile
          </Text>
          <Icon
            display={{
              base: "none",
              lg: pathName.split("/")[2] === "myprofile" ? "block" : "none",
            }}
            as={GoDotFill}
            color="#53aa91"
            ml="auto"
            mr="10px"
          />
        </Avatar>
      </Link>
      <Avatar
        icon={<></>}
        w="100%"
        height="44px"
        fontSize="1.4rem"
        justifyContent={{ base: "center", lg: "flex-start" }}
        pl={{ base: "0", lg: "42px" }}
        bgColor="transparent"
        borderRadius="0"
        role="group"
        cursor="pointer"
        onClick={onOpen}
      >
        <Box
          opacity={0.5}
          _groupHover={{ opacity: 1 }}
          fontSize={{ base: "2.4rem", lg: "1.4rem" }}
        >
          <BiLogOutCircle />
        </Box>
        <Text
          display={{ base: "none", lg: "block" }}
          ml="10px"
          textTransform="none"
          opacity={0.5}
          _groupHover={{ opacity: 1 }}
        >
          Log out
        </Text>
      </Avatar>
      <AlertLogout isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default memo(SideBar);
