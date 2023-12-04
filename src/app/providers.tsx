// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

import { Rubik } from "next/font/google";
import { theme } from "./theme";
const rubik = Rubik({ subsets: ["latin"] });

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <style jsx global>
        {`
          :root {
            --font-rubik: ${rubik.style.fontFamily};
          }

          html {
            font-size: 62.5%;
          }
        `}
      </style>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}
