import {
  Slide,
  Box,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Checkbox,
  Button,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

interface DashboardProps {
  isModal?: boolean;
  selectedTab?: number;
  dashData?: any;
  list?: any;
  handleCheckbox?: any;
  tabChange?: any;
  onUpdate?: () => void;
}

function AddWidget({
  isModal,
  selectedTab,
  dashData,
  list,
  tabChange,
  handleCheckbox,
  onUpdate,
}: DashboardProps) {
  return (
    <>
      <Slide direction="right" in={isModal} style={{ zIndex: 10 }}>
        <Box
          w="50%"
          h="100vh"
          bg="white"
          boxShadow="md"
          position="fixed"
          top="0"
          right="0"
          overflowY="auto"
        >
          <Flex bgColor={"blue"} justifyContent={"flex-start"} p={4}>
            <Text color={"white"}>Add Widget</Text>
          </Flex>
          <Flex p={3} flexDir={"column"}>
            <Text mb={4}>
              Personalize your dashboard by adding the following widget:
            </Text>
            <Tabs index={selectedTab} onChange={(index) => tabChange(index)}>
              <TabList>
                {dashData.dashboard?.sections.map(
                  (section: any, index: number) => (
                    <Tab key={section.title}>{section.title}</Tab>
                  )
                )}
              </TabList>
              <TabPanels>
                {dashData.dashboard?.sections.map(
                  (section: any, index: number) => (
                    <TabPanel key={section.title}>
                      {selectedTab === index && list.length > 0 ? (
                        list.map((item: any, itemIndex: number) => {
                          console.log("item:", item);
                          return (
                            <Flex
                              key={itemIndex}
                              alignItems={"center"}
                              mb={2}
                              p={1}
                              px={2}
                              borderRadius={"5px"}
                              border={"1px solid gray"}
                            >
                              <Checkbox
                                isChecked={item.status}
                                onChange={() => {
                                  handleCheckbox(item.title, index);
                                }}
                              >
                                <Text>{item.title}</Text>
                              </Checkbox>
                            </Flex>
                          );
                        })
                      ) : (
                        <Text>No widgets available for this section.</Text>
                      )}
                    </TabPanel>
                  )
                )}
              </TabPanels>
            </Tabs>
          </Flex>
          <Button onClick={onUpdate} mb={4}>
            Close
          </Button>
        </Box>
      </Slide>
    </>
  );
}

export default AddWidget;
