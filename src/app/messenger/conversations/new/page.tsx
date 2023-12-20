"use client";

import {
  Box,
  Button,
  HStack,
  Img,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { NEXT_PUBLIC_API_URL } from "~/const";

function New() {
  const [keyword, setKeyword] = useState<string>("");
  const [searchValue] = useDebounce(keyword, 500);
  const [searchResults, setSearchResults] = useState<any>(null);
  const bg = useColorModeValue("#fff", "#1b202b");
  useEffect(() => {
    if (searchValue.trim()) {
      const handleSearchUsers = async () => {
        const { data: result } = await axios.get(
          `${NEXT_PUBLIC_API_URL}users/search?keyword=${searchValue}`
        );
        console.log(result.metadata);
        setSearchResults(result.metadata);
      };
      handleSearchUsers();
    } else {
      setSearchResults(null);
    }
  }, [searchValue]);
  return (
    <HStack
      as="form"
      h="55px"
      boxShadow="0 0 4px rgba(0,0,0,0.2)"
      p="0 16px"
      position="relative"
    >
      <Text fontSize="1.5rem">Đến:</Text>
      <Input
        value={keyword}
        autoFocus
        fontSize="1.6rem"
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
      />
      {keyword && (
        <Box
          position="absolute"
          top="50px"
          left="55px"
          w="328px"
          h="407px"
          boxShadow="0 12px 28px 0 rgba(0,0,0,0.2), 0 2px 4px 0 rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.5)"
          borderRadius="10px"
          bgColor={bg}
          p="6px"
        >
          {searchResults?.map((user: any) => (
            <Button
              key={user._id}
              p="8px"
              borderBottom="1px solid"
              borderColor="rgba(255,255,255,0.1)"
              w="100%"
              h="52px"
              bgColor="transparent"
              alignItems="center"
              justifyContent="flex-start"
              gap="10px"
            >
              <Img
                src={user.avatar ? user.avatar : "/images/no-image.png"}
                alt="avt"
                w="36px"
                h="36px"
                borderRadius="50%"
              />
              <Text fontWeight="400">{user.displayName}</Text>
            </Button>
          ))}
        </Box>
      )}
    </HStack>
  );
}

export default New;
