"use client";
import {
  Slide,
  Box,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  IconButton,
  TabPanel,
  ButtonGroup,
  Checkbox,
  Button,
  Text,
  Input,
  useStatStyles,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import PlusIcon from "./icons/PlusIcon";

interface DashboardProps {
  isModal?: boolean;
  selectedTab?: number;
  dashData?: any;
  list?: any;
  addNewWidget?: any;
  handleCheckbox?: any;
  tabChange?: any;
  onUpdate?: () => void;
}

function AddWidget({
  isModal,
  selectedTab,
  dashData,
  addNewWidget,
  list,
  tabChange,
  handleCheckbox,
  onUpdate,
}: DashboardProps) {
  const [value, setValue] = React.useState("");
  const handleChange = (event: any) => setValue(event.target.value);
  useEffect(() => {
    tabChange(0);
  }, []);

  return (
    <>
      <Slide direction="right" in={isModal} style={{ zIndex: 10 }}>
        <Flex
          justifyContent={"space-between"}
          flexDir={"column"}
          w="50%"
          h="100vh"
          bg="white"
          boxShadow="md"
          position="fixed"
          top="0"
          right="0"
          overflowY="auto"
        >
          <Box>
            <Flex bgColor={"blue"} justifyContent={"flex-start"} p={3}>
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
            <Box p={5}>
              <Text mb="8px">Add Name :-</Text>
              <Input
                mb={2}
                value={value}
                placeholder="Enter name here"
                onChange={handleChange}
                size="lg"
              />
              <Button
                onClick={() => {
                  addNewWidget(selectedTab, value);
                  setValue("");
                }}
              >
                Add
              </Button>
            </Box>
          </Box>
          <Flex justifyContent={"flex-end"} p={3}>
            <Button
              width={100}
              colorScheme="teal"
              variant="solid"
              onClick={onUpdate}
            >
              Close
            </Button>
          </Flex>
        </Flex>
      </Slide>
    </>
  );
}

export default AddWidget;
