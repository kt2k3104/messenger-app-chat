"use client";
import { IoMdClose } from "react-icons/io";
import { Box, Button, Img } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

function PreviewImage({
  imgFile,
  setImages,
}: {
  imgFile: any;
  setImages: Dispatch<SetStateAction<string[]>>;
}) {
  const imgUrl = URL.createObjectURL(imgFile);
  return (
    <Box w="48px" h="48px" position="relative">
      <Img src={imgUrl} alt="img" w="100%" h="100%" borderRadius="10px" />
      <Button
        position="absolute"
        top="-5px"
        right="-5px"
        w="24px"
        h="24px"
        borderRadius="50%"
        p="0"
        onClick={() => {
          setImages((prev) => {
            return prev.filter((image) => image !== imgFile);
          });
          URL.revokeObjectURL(imgUrl);
        }}
      >
        <IoMdClose />
      </Button>
    </Box>
  );
}

export default PreviewImage;
