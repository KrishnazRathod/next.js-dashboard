"use client";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  Text,
  InputLeftElement,
  Button,
  Grid,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import PlusIcon from "../components/icons/PlusIcon";
import Reload from "../components/icons/Reload";
import MenuIcon from "../components/icons/MenuIcon";
import ArrowDown from "../components/icons/ArrowDown";
import TimeIcon from "../components/icons/TimeIcon";
import PieChart from "../components/PieChart";
import GraphIcon from "../components/icons/GraphIcon";
import dashboardData from "../dashboard.json";

import SearchIcon from "../components/icons/SerachIcon";
import AddWidget from "../components/AddWidget";

const DashboardV2 = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tabList, setTabList] = useState<any[]>([]);
  const [tabSelect, setTabSelect] = useState<string>("");
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const home: any = "Home";
  const dashboardV2: any = "DashboardV2";
  const donutHoleSize: any = 70;
  const [dashboardJsonData, setDashboardJsonData] =
    useState<any>(dashboardData);

  useEffect(() => {
    setDashboardJsonData(dashboardData);
    const tabData = dashboardJsonData.dashboard.sections[0];
    setTabList(tabData.widgets);
  }, [dashboardData]);

  const onTabChange = (index: number) => {
    const tabData = dashboardJsonData.dashboard.sections[index];
    setTabList(tabData.widgets);
    setTabSelect(tabData.title);
    setSelectedTabIndex(index);
  };

  function updateStatus(
    dashboardJsonData: any,
    sectionTitle: string,
    widgetTitle: string
  ) {
    const updatedDashboard = {
      ...dashboardJsonData,
      dashboard: {
        ...dashboardJsonData.dashboard,
        sections: dashboardJsonData.dashboard.sections.map((section: any) => {
          if (section.title === sectionTitle) {
            return {
              ...section,
              widgets: section.widgets.map((widget: any) => {
                if (widget.title === widgetTitle) {
                  return { ...widget, status: !widget.status };
                }
                return widget;
              }),
            };
          }
          return section;
        }),
      },
    };

    return updatedDashboard;
  }

  const handleCheckBoxChange = (title: any, index: any) => {
    const updatedData = updateStatus(dashboardJsonData, tabSelect, title);
    setDashboardJsonData(updatedData);
    const updateData = { ...updatedData };
    const updatedTabList = updateData.dashboard.sections[index].widgets;
    setTabList([...updatedTabList]);
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
    onClose();
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
                  {dashboardJsonData?.controls?.date_range_selector.options[0]}
                </Button>
              </Flex>
            </Flex>
          </Flex>
          {dashboardJsonData?.dashboard?.sections.map(
            (section: any, sectionIndex: any) => (
              <Flex px={5} flexDir={"column"} key={sectionIndex}>
                <Text fontWeight={600} my={1}>
                  {section.title}
                </Text>
                <Grid
                  borderRadius={"10px"}
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                  }}
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
                  <Flex
                    borderRadius={"10px"}
                    minWidth={"450px"}
                    height={"280px"}
                    p={3}
                    bgColor={"#F0F0F5"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Button
                      colorScheme="teal"
                      variant="outline"
                      rightIcon={<PlusIcon />}
                      onClick={onOpen}
                    >
                      Add Widget
                    </Button>
                  </Flex>
                </Grid>
              </Flex>
            )
          )}
        </Flex>
      </Box>
      <AddWidget
        isModal={isOpen}
        selectedTab={selectedTabIndex}
        dashData={dashboardData}
        list={tabList}
        handleCheckbox={handleCheckBoxChange}
        onUpdate={handleUpdate}
        tabChange={onTabChange}
      />
    </>
  );
};

export default DashboardV2;
