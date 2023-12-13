// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

import { Roboto } from "next/font/google";
import { theme } from "./theme";
const roboto = Roboto({
  subsets: ["latin"],
  weight: "300",
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <style jsx global>
        {`
          :root {
            --font-rubik: ${roboto.style.fontFamily};
          }

          html {
            font-size: 62.5%;
          }
          body,
          p {
            font-size: 1.4rem;
          }
        `}
      </style>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
