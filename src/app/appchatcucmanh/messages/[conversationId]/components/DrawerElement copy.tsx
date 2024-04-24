"use client";
import { IoMdArrowBack } from "react-icons/io";

import {
  Box,
  Button,
  Grid,
  HStack,
  Img,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { OptionOpenDrawer } from "../../../../messenger/conversations/[conversationId]/SidebarRight";
import { useEffect, useState } from "react";
import requestApi from "~/utils/api";
import { UserInfo } from "~/hooks/useUserInfo";

interface ImageInfo {
  messageId: string;
  sender: UserInfo;
  image: string;
  createdAt: string;
}
interface LinkInfo {
  messageId: string;
  sender: UserInfo;
  link: string;
  createdAt: string;
}

function DrawerElement({
  isOpenFiles,
  setIsOpenFiles,
  optionOpenDrawer,
  setOptionOpenDrawer,
  conversationId,
}: any) {
  const [allImages, setAllImages] = useState<ImageInfo[]>([]);
  const [allLinks, setAllLinks] = useState<LinkInfo[]>([]);

  const bgTabs = useColorModeValue("#e5e5e5", "transparent");

  useEffect(() => {
    const callApi = async () => {
      if (optionOpenDrawer === OptionOpenDrawer.MediaFiles) {
        const { data: res } = await requestApi(
          `conversations/images/${conversationId}`,
          "GET",
          {}
        );
        setAllImages(res.metadata);
      }
      if (optionOpenDrawer === OptionOpenDrawer.File) {
        console.log("File");
      }
      if (optionOpenDrawer === OptionOpenDrawer.Link) {
        const { data: res } = await requestApi(
          `conversations/links/${conversationId}`,
          "GET",
          {}
        );
        setAllLinks(res.metadata);
      }
    };
    callApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionOpenDrawer, isOpenFiles]);
  return (
    <Box w="100%" h="100%">
      <HStack alignItems="center" h="60px">
        <Button
          as="div"
          w="32px"
          h="32px"
          borderRadius="50%"
          onClick={() => {
            setIsOpenFiles(false);
          }}
          bgColor="transparent"
          cursor="pointer"
          p="0"
          fontSize="18px"
        >
          <IoMdArrowBack />
        </Button>
        <Text fontSize="1.6rem">File phương tiện, file và liên kết</Text>
      </HStack>
      <Tabs
        variant="soft-rounded"
        colorScheme="blue"
        isFitted
        index={optionOpenDrawer}
      >
        <TabList>
          <Tab
            h="36px"
            fontSize="1.4rem"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
            _selected={{
              bgColor: bgTabs,
              color: "#53aa91",
            }}
            onClick={() => {
              setOptionOpenDrawer(OptionOpenDrawer.MediaFiles);
            }}
            ml="10px"
          >
            File phương tiện
          </Tab>
          <Tab
            h="36px"
            fontSize="1.4rem"
            _selected={{
              bgColor: bgTabs,
              color: "#53aa91",
            }}
            onClick={() => {
              setOptionOpenDrawer(OptionOpenDrawer.File);
            }}
            p="0"
          >
            File
          </Tab>
          <Tab
            h="36px"
            fontSize="1.4rem"
            _selected={{
              bgColor: bgTabs,
              color: "#53aa91",
            }}
            onClick={() => {
              setOptionOpenDrawer(OptionOpenDrawer.Link);
            }}
            p="0"
          >
            Liên kết
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel h="calc(100vh - 100px)" p="10px" overflow="auto">
            {allImages.length === 0 && (
              <Text fontSize="1.4rem" textAlign="center">
                Không có hình ảnh hoặc video
              </Text>
            )}
            <Grid templateColumns="repeat(3, 1fr)" gap={3}>
              {allImages.map((image) => (
                <Img
                  src={image.image}
                  alt="img"
                  key={image.messageId}
                  w="100%"
                  cursor="pointer"
                />
              ))}
            </Grid>
          </TabPanel>
          <TabPanel>
            <Text fontSize="1.4rem" textAlign="center">
              Không có file
            </Text>
          </TabPanel>
          <TabPanel>
            {allLinks.length === 0 && (
              <Text fontSize="1.4rem" textAlign="center">
                Không có liên kết
              </Text>
            )}
            {allLinks.map((link) => (
              <div key={link.messageId}>
                <Text fontSize="1.4rem">{link.link}</Text>
              </div>
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
export default DrawerElement;
