"use client";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  Text,
  Checkbox,
  InputLeftElement,
  Button,
  Grid,
  Slide,
  useDisclosure,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import PlusIcon from "../components/icons/PlusIcon";
import Reload from "../components/icons/Reload";
import MenuIcon from "../components/icons/MenuIcon";
import ArrowDown from "../components/icons/ArrowDown";
import TimeIcon from "../components/icons/TimeIcon";
import PieChart from "../components/PieChart";
import GraphIcon from "../components/icons/GraphIcon";
import dashboardJson from "../dashboard.json";
console.log("dashboardJson:", dashboardJson);
import SearchIcon from "../components/icons/SerachIcon";

const DashboardV2 = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tabList, setTabList] = useState<any[]>([]);
  const [tabSelect, setTabSelect] = useState<string>("");
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [dashboardJsonData, setDashboardJsonData] = useState<any>({});
  const home: any = "Home";
  const dashboardV2: any = "DashboardV2";
  const donutHoleSize: any = 70;

  useEffect(() => {
    setDashboardJsonData(dashboardJson);
  }, [dashboardJson]);

  const onTabChange = (index: number) => {
    const tabData = dashboardJsonData.dashboard.sections[index];
    console.log("tabData:", tabData);
    setTabList(tabData.widgets);
    setTabSelect(tabData.title);
    setSelectedTabIndex(index);
  };

  const updateStatus = (sectionTitle: any, widgetTitle: any) => {
    const updatedData = { ...dashboardJsonData };

    updatedData.dashboard.sections = updatedData.dashboard.sections.map(
      (section: any) => {
        if (section.title === sectionTitle) {
          return {
            ...section,
            widgets: section.widgets.map((widget: any) => {
              if (widget.title === widgetTitle) {
                return {
                  ...widget,
                  status: !widget.status,
                };
              }
              return widget;
            }),
          };
        }
        return section;
      }
    );
    return updatedData;
  };

  const handleCheckBoxChange = (title: any) => {
    const updatedData = updateStatus(tabSelect, title);
    console.log("Updated Data:", updatedData);
    setDashboardJsonData(updatedData);
  };

  const filterWidgetsByStatus = (data: any) => {
    data.dashboard.sections.forEach((section: any) => {
      section.widgets = section.widgets.filter((widget: any) => widget.status);
    });

    return data;
  };

  const handleUpdate = () => {
    const filteredData = filterWidgetsByStatus(dashboardJsonData);
    setDashboardJsonData(filteredData);
  };

  return (
    <>
      <Box borderTop={"2px solid blue"} p={2}>
        <Flex mb={2}>
          <Flex width={"40%"} alignItems={"center"}>
            <Text fontWeight={200} mr={1}>{`${home} `}</Text>
            <Text fontWeight={400}>{`> ${dashboardV2}`}</Text>
          </Flex>
          <Flex width={"60%"}>
            <Box width={"50%"}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  h="100%"
                  children={<SearchIcon />}
                />
                <Input variant="filled" placeholder="Search anything..." />
              </InputGroup>
            </Box>
          </Flex>
        </Flex>
        <Flex flexDir={"column"} p={5} bgColor={"#F0F5FA"}>
          <Flex justifyContent={"space-between"}>
            <Flex>
              <Text fontWeight={600}>
                {dashboardJsonData?.dashboard?.title}
              </Text>
            </Flex>
            <Flex gap={2}>
              <Button
                rightIcon={<PlusIcon />}
                colorScheme="teal"
                variant="outline"
                onClick={onOpen}
              >
                {dashboardJsonData?.controls?.add_widget_button.label}
              </Button>
              <Flex gap={2}>
                <Button
                  rightIcon={<Reload />}
                  colorScheme="teal"
                  variant="outline"
                  pl={1}
                ></Button>
                <Button
                  rightIcon={<MenuIcon />}
                  colorScheme="teal"
                  variant="outline"
                  pl={2}
                ></Button>
                <Button
                  leftIcon={<TimeIcon />}
                  rightIcon={<ArrowDown />}
                  colorScheme="teal"
                  variant="outline"
                  pl={2}
                >
                  {dashboardJsonData.controls?.date_range_selector.options[0]}
                </Button>
              </Flex>
            </Flex>
          </Flex>
          {dashboardJsonData.dashboard?.sections.map(
            (section: any, sectionIndex: any) => (
              <Flex px={5} flexDir={"column"} key={sectionIndex}>
                <Text fontWeight={600} my={1}>
                  {section.title}
                </Text>
                <Grid
                  borderRadius={"10px"}
                  templateColumns="repeat(3, 1fr)"
                  gap={1}
                  flexDir={"column"}
                >
                  {section.widgets.map((widget: any, widgetIndex: any) => {
                    return (
                      <Flex
                        borderRadius={"10px"}
                        width={"30%"}
                        minWidth={"450px"}
                        height={"280px"}
                        p={3}
                        bgColor={"#F0F0F5"}
                        key={widgetIndex}
                      >
                        <Flex p={2} bgColor={"white"} h={"100%"} w={"100%"}>
                          <Flex width={"100%"} h={"100%"} flexDir={"column"}>
                            <Text fontWeight={600} mb={2}>
                              {widget.title}
                            </Text>
                            {widget.type === "doughnut_chart" && (
                              <Flex justifyContent={"space-between"}>
                                <PieChart
                                  donutSize={donutHoleSize}
                                  data={widget.data.segments}
                                />
                              </Flex>
                            )}
                            {widget.type === "empty_state" && (
                              <Flex
                                h={"100%"}
                                gap={1}
                                flexDir={"column"}
                                justifyContent={"center"}
                                alignItems={"center"}
                              >
                                <Box opacity={"0.3"}>
                                  <GraphIcon />
                                </Box>
                                <Text>{widget.message}</Text>
                              </Flex>
                            )}
                            {widget.type === "button" && (
                              <Flex
                                width={"100%"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                h={"100%"}
                                flexDir={"column"}
                              >
                                <Button rightIcon={<PlusIcon />}>
                                  {widget.label}
                                </Button>
                              </Flex>
                            )}
                          </Flex>
                        </Flex>
                      </Flex>
                    );
                  })}
                </Grid>
              </Flex>
            )
          )}
        </Flex>
      </Box>

      <Slide direction="right" in={isOpen} style={{ zIndex: 10 }}>
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
            <Tabs
              index={selectedTabIndex}
              onChange={(index) => onTabChange(index)}
            >
              <TabList>
                {dashboardJson.dashboard?.sections.map(
                  (section: any, index: number) => (
                    <Tab key={section.title}>{section.title}</Tab>
                  )
                )}
              </TabList>
              <TabPanels>
                {dashboardJson.dashboard?.sections.map(
                  (section: any, index: number) => (
                    <TabPanel key={section.title}>
                      {selectedTabIndex === index && tabList.length > 0 ? (
                        tabList.map((item: any, itemIndex: number) => (
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
                              defaultChecked
                              onChange={() => {
                                handleCheckBoxChange(item.title);
                              }}
                            >
                              <Text>{item.title}</Text>
                            </Checkbox>
                          </Flex>
                        ))
                      ) : (
                        <Text>No widgets available for this section.</Text>
                      )}
                    </TabPanel>
                  )
                )}
              </TabPanels>
            </Tabs>
          </Flex>
          <Button
            onClick={() => {
              handleUpdate();
              onClose();
            }}
            mb={4}
          >
            Close
          </Button>
        </Box>
      </Slide>
    </>
  );
};

export default DashboardV2;
