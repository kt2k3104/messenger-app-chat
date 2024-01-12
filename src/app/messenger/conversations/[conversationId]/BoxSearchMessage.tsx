"use client";

import { Button, HStack, Input, useColorModeValue } from "@chakra-ui/react";
import { set } from "lodash";
import { useState } from "react";
import CustomIcons from "~/app/components/Icon";
import useLogic, { LogicState } from "~/hooks/useLogic";
import requestApi from "~/utils/api";

function BoxSearchMessage() {
  const setIsShowBoxSearchMessage = useLogic(
    (state: LogicState) => state.setIsShowBoxSearchMessage
  );
  const borderColor = useColorModeValue("#e5e5e5", "#ffffff1a");
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchMessage = async () => {
    // const res = await requestApi('')
  };
  return (
    <HStack
      w="100%"
      h="56px"
      boxShadow="-3px 4px 3px -4px rgba(0, 0, 0, 0.2)"
      borderTop="1px solid "
      borderColor={borderColor}
      p="8px 12px"
      gap="12px"
      alignItems="center"
      justifyContent={"space-between"}
    >
      <HStack
        as="form"
        flex="1"
        borderRadius="999px"
        h="36px"
        bgColor="rgba(134, 142, 153, 0.1)"
        p="5px 10px"
      >
        <CustomIcons.icon_search />
        <Input
          type="text"
          id="search-input"
          name="search-input"
          placeholder="Tìm kiếm"
          bgColor="transparent"
          outline="none"
          border="none"
          p="0px"
          fontSize="1.4rem"
          display={{ base: "none", lg: "inline" }}
          _placeholder={{
            fontWeight: 300,
            fontSize: "1.5rem",
          }}
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setIsShowBoxSearchMessage(false);
            }
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearchMessage();
            }
          }}
        />
      </HStack>
      <Button w="24px" h="24px" borderRadius="50%"></Button>
      <Button w="24px" h="24px" borderRadius="50%"></Button>
      <Button
        w="60px"
        h="32px"
        fontSize="1.4rem"
        fontWeight="400"
        onClick={() => {
          setIsShowBoxSearchMessage(false);
        }}
      >
        Đóng
      </Button>
    </HStack>
  );
}

export default BoxSearchMessage;
