/* theme.ts */
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    heading: "var(--font-rubik)",
    body: "var(--font-rubik)",
  },
  colors: {
    primary: {
      100: "#0A7CFF",
      90: "rgba(10, 124, 255, 0.9)",
      80: "rgba(10, 124, 255, 0.8)",
      70: "rgba(10, 124, 255, 0.7)",
      60: "rgba(10, 124, 255, 0.6)",
      50: "rgba(10, 124, 255, 0.5)",
      40: "rgba(10, 124, 255, 0.4)",
      30: "rgba(10, 124, 255, 0.3)",
      20: "rgba(10, 124, 255, 0.2)",
      10: "rgba(10, 124, 255, 0.1)",
    },
    textPrimary: {
      100: "#050505",
    },
    textSecond: {
      100: "#65676B",
    },
    Secondary: {
      100: "#F0F0F0",
    },
    active: {
      100: "#31A24C",
    },
  },
});
