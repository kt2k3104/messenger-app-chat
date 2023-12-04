"use client";

import { Button, Text } from "@chakra-ui/react";
import { use } from "react";
import useUserInfo from "~/hooks/useUserInfo";
import { commonStyles } from "~/styles/common";

export default function Home() {
  const name = useUserInfo((state) => state.name);
  const setname = useUserInfo((state) => state.setName);
  return (
    <div>
      <h1>Next.js</h1>
      <Text sx={{ ...commonStyles.textFont, color: "primary.100" }}>
        {name}
      </Text>
      <Button
        onClick={() => {
          if (name === "thinh") setname("khai");
          else setname("thinh");
        }}
      >
        Đổi tên
      </Button>
    </div>
  );
}
