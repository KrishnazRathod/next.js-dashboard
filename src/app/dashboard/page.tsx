"use client";
import {
  Box,
  Flex,
  Grid,
  Text,
  Input,
  Button,
  InputGroup,
  useDisclosure,
  CloseButton,
  InputLeftElement,
  IconButton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import PieChart from "../components/PieChart";
import dashboardData from "../dashboard.json";
import AddWidget from "../components/AddWidget";
import Reload from "../components/icons/Reload";
import TimeIcon from "../components/icons/TimeIcon";
import PlusIcon from "../components/icons/PlusIcon";
import MenuIcon from "../components/icons/MenuIcon";
import ArrowDown from "../components/icons/ArrowDown";
import GraphIcon from "../components/icons/GraphIcon";
import SearchIcon from "../components/icons/SerachIcon";

const DashboardV2 = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tabList, setTabList] = useState<any[]>([]);
  const [tabSelect, setTabSelect] = useState<string>("");
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [search, setSearch] = useState("");
  const homeText: any = "Home";
  const dashboardV2Text: any = "DashboardV2";
  const donutHoleSize: any = 70;
  const [dashboardJsonData, setDashboardJsonData] =
    useState<any>(dashboardData);

  useEffect(() => {
    PlusIcon;
    setDashboardJsonData(dashboardData);
    const tabData = dashboardData.dashboard.sections[0];
    setTabList(tabData.widgets);
  }, []);

  const onTabChange = (index: number) => {
    const tabData = dashboardJsonData.dashboard.sections[index];
    setTabList(tabData.widgets);
    setTabSelect(tabData.title);
    setSelectedTabIndex(index);
  };

  const removeWidget = (
    dashboardJsonData: any,
    sectionTitle: string,
    widgetTitle: string
  ) => {
    const updatedDashboard = {
      ...dashboardJsonData,
      dashboard: {
        ...dashboardJsonData.dashboard,
        sections: dashboardJsonData.dashboard.sections.map((section: any) => {
          if (section.title === sectionTitle) {
            return {
              ...section,
              widgets: section.widgets.filter(
                (widget: any) => widget.title !== widgetTitle
              ),
            };
          }
          return section;
        }),
      },
    };

    return updatedDashboard;
  };

  const updateStatus = (
    dashboardJsonData: any,
    sectionTitle: string,
    widgetTitle: string
  ) => {
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
  };

  const handleCheckBoxChange = (title: any, index: any) => {
    const updatedData = updateStatus(dashboardJsonData, tabSelect, title);
    setDashboardJsonData(updatedData);
    const updatedTabList = updatedData.dashboard.sections[index].widgets;
    setTabList([...updatedTabList]);
  };

  const addWidget = (
    dashboardJsonData: any,
    sectionTitle: string,
    newWidget: any
  ) => {
    const updatedDashboard = {
      ...dashboardJsonData,
      dashboard: {
        ...dashboardJsonData.dashboard,
        sections: dashboardJsonData.dashboard.sections.map((section: any) => {
          if (section.title === sectionTitle) {
            return {
              ...section,
              widgets: [...section.widgets, newWidget],
            };
          }
          return section;
        }),
      },
    };

    return updatedDashboard;
  };

  const handleAddWidget = (tabIndex: string, widgetName: string) => {
    const tabName = dashboardJsonData.dashboard.sections[tabIndex].title;
    const tabType =
      dashboardJsonData.dashboard.sections[tabIndex].widgets[0].type;
    let newWidget: any;
    if (tabType === "empty_state") {
      newWidget = {
        title: widgetName,
        status: true,
        type: tabType,
        message: "No Graph data available!",
      };
    } else if (tabType === "doughnut_chart") {
      newWidget = {
        title: widgetName,
        status: true,
        type: tabType,
        data: {
          total: 2,
          segments: [
            {
              label: "Connected",
              value: 2,
              color: "#0088FE",
            },
            {
              label: "Not Connected",
              value: 2,
              color: "#BBDEFB",
            },
          ],
        },
      };
    }
    const updatedDashboardData = addWidget(
      dashboardJsonData,
      tabName,
      newWidget
    );
    setDashboardJsonData(updatedDashboardData);
    const updatedTabList =
      updatedDashboardData.dashboard.sections[selectedTabIndex].widgets;
    setTabList([...updatedTabList]);
  };

  const handleRemoveWidget = (
    sectionTitle: string,
    widgetTitle: string,
    index: number
  ) => {
    const updatedDashboardData = removeWidget(
      dashboardJsonData,
      sectionTitle,
      widgetTitle
    );
    setDashboardJsonData(updatedDashboardData);
    const updatedTabList =
      updatedDashboardData.dashboard.sections[index].widgets;
    setTabList([...updatedTabList]);
  };

  const handleReload = () => {
    setDashboardJsonData(dashboardData);
    const tabData = dashboardData.dashboard.sections[selectedTabIndex];
    setTabList(tabData.widgets);
  };

  const filteredWidgets = (widgets: any[]) =>
    widgets.filter((widget) =>
      widget?.title?.toLowerCase().includes(search?.toLowerCase())
    );

  return (
    <>
      <Box borderTop={"2px solid blue"} p={2}>
        <Flex mb={2}>
          <Flex width={"40%"} alignItems={"center"}>
            <Text fontWeight={200} mr={1}>{`${homeText} `}</Text>
            <Text fontWeight={400}>{`> ${dashboardV2Text}`}</Text>
          </Flex>
          <Flex width={"60%"}>
            <Box width={"50%"}>
              <InputGroup>
                <InputLeftElement pointerEvents="none" h="100%">
                  <SearchIcon />
                </InputLeftElement>
                <Input
                  variant="filled"
                  placeholder="Search anything..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
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
                  onClick={handleReload}
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
                    lg: "repeat(3, 1fr)",
                  }}
                  gap={1}
                  flexDir={"column"}
                >
                  {filteredWidgets(section.widgets).map(
                    (widget: any, widgetIndex: any) => {
                      if (widget.status) {
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
                              <Flex
                                width={"100%"}
                                h={"100%"}
                                flexDir={"column"}
                              >
                                <Flex justifyContent={"space-between"}>
                                  <Text fontWeight={600} mb={2}>
                                    {widget.title}
                                  </Text>
                                  <CloseButton
                                    size="sm"
                                    onClick={() =>
                                      handleRemoveWidget(
                                        section.title,
                                        widget.title,
                                        widgetIndex
                                      )
                                    }
                                    aria-label={""}
                                  />
                                </Flex>
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
                      }
                    }
                  )}
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
        onUpdate={onClose}
        addNewWidget={handleAddWidget}
        tabChange={onTabChange}
      />
    </>
  );
};

export default DashboardV2;
