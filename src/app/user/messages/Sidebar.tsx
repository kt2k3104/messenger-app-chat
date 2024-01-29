"use client";

import {
  Avatar,
  Box,
  HStack,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { RiHome5Line } from "react-icons/ri";
import { GoDotFill } from "react-icons/go";

function SideBar() {
  const bg = useColorModeValue("#e5e5e5", "#212427");

  return (
    <Box w="300px" h="100%" borderRadius="20px" bgColor={bg}>
      <HStack
        w="100%"
        h="90px"
        justifyContent="flex-start"
        alignItems="center"
        ml="42px"
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
        <Text fontSize="2.4rem" fontWeight="700">
          Chatchit
        </Text>
      </HStack>
      <Link href={""}>
        <Avatar
          h=""
          icon={<RiHome5Line />}
          w="100%"
          height="44px"
          fontSize="1.4rem"
          justifyContent="flex-start"
          pl="42px"
          bgColor="transparent"
          bgImage="linear-gradient(to right, rgba(68, 41, 51, 1), rgba(68, 41, 51, 0))"
          borderRadius="0"
          borderRight="3px solid #db4663"
        >
          <Text
            ml="10px"
            textTransform="none"
            opacity={0.5}
            _hover={{ opacity: 1 }}
          >
            Home
          </Text>
          <Icon as={GoDotFill} color="#53aa91" ml="auto" mr="10px" />
        </Avatar>
      </Link>
    </Box>
  );
}

export default SideBar;
