"use client";

import { Box } from "@chakra-ui/react";

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Box>{children}</Box>;
}
