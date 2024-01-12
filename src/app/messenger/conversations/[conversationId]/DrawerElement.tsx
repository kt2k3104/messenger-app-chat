"use client";
import { IoMdArrowBack } from "react-icons/io";

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Img,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { OptionOpenDrawer } from "./SidebarRight";
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
  isOpenDrawer,
  onCloseDrawer,
  btnRef,
  optionOpenDrawer,
  setOptionOpenDrawer,
  conversationId,
}: any) {
  const [allImages, setAllImages] = useState<ImageInfo[]>([]);
  const [allLinks, setAllLinks] = useState<LinkInfo[]>([]);

  const bgDrawer = useColorModeValue("#ffffff", "#1a202c");
  const bgTabs = useColorModeValue("#e5e5e5", "transparent");
  const TextColor = useColorModeValue("inherits", "primary.100");

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
  }, [optionOpenDrawer]);
  return (
    <Drawer
      isOpen={isOpenDrawer}
      placement="right"
      onClose={onCloseDrawer}
      finalFocusRef={btnRef}
      closeOnOverlayClick={false}
      variant={"alwaysOpen"}
      trapFocus={false}
      blockScrollOnMount={false}
    >
      <DrawerContent
        bgColor={bgDrawer}
        maxW={{ base: "266px", xl: "384px" }}
        boxShadow="none"
      >
        <DrawerHeader display="flex" alignItems="center">
          <Button
            as="div"
            w="32px"
            h="32px"
            borderRadius="50%"
            onClick={onCloseDrawer}
            bgColor="transparent"
            cursor="pointer"
            p="0"
            fontSize="18px"
          >
            <IoMdArrowBack />
          </Button>
          <Text fontSize="1.6rem">File phương tiện, file và liên kết</Text>
        </DrawerHeader>
        <DrawerBody>
          <Tabs
            variant="soft-rounded"
            colorScheme="blue"
            isFitted
            index={optionOpenDrawer}
          >
            <TabList w="100%">
              <Tab
                h="36px"
                fontSize="1.4rem"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                _selected={{
                  bgColor: bgTabs,
                  color: TextColor,
                }}
                onClick={() => {
                  setOptionOpenDrawer(OptionOpenDrawer.MediaFiles);
                }}
              >
                File phương tiện
              </Tab>
              <Tab
                h="36px"
                fontSize="1.4rem"
                _selected={{
                  bgColor: bgTabs,
                  color: TextColor,
                }}
                onClick={() => {
                  setOptionOpenDrawer(OptionOpenDrawer.File);
                }}
              >
                File
              </Tab>
              <Tab
                h="36px"
                fontSize="1.4rem"
                _selected={{
                  bgColor: bgTabs,
                  color: TextColor,
                }}
                onClick={() => {
                  setOptionOpenDrawer(OptionOpenDrawer.Link);
                }}
              >
                Liên kết
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {allImages.length === 0 && (
                  <Text fontSize="1.4rem" textAlign="center">
                    Không có hình ảnh hoặc video
                  </Text>
                )}
                {allImages.map((image) => (
                  <div key={image.messageId}>
                    <Img src={image.image} alt="img" />
                  </div>
                ))}
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
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
export default DrawerElement;
