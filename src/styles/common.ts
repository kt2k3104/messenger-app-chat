import { SystemStyleObject } from "@chakra-ui/react";

interface CommonStyles {
  flexCenter: SystemStyleObject;
  textFont: SystemStyleObject;
}

export const commonStyles: CommonStyles = {
  flexCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textFont: {
    fontSize: "1.4rem",
    fontWeight: "normal",
  },
};
