"use client";
import { Box, Flex } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { Chart as ChartJS, Tooltip, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import CustomLegend from "./CustomeLegent";

ChartJS.register(ArcElement, Tooltip, ChartDataLabels);

interface PieChartProps {
  data?: any[];
  donutSize?: number;
}

const defaultData: any[] = [
  {
    label: "No Data",
    value: 100,
    color: "#CCCCCC",
  },
];

function PieChart({ data = defaultData, donutSize = 60 }: PieChartProps) {
  const labels = useMemo(() => data.map((item) => item.label), [data]);
  const chartValue = useMemo(() => data.map((item) => item.value), [data]);
  const chartColor = useMemo(() => data.map((item) => item.color), [data]);
  const combinedArray = labels.map((label, index) => {
    return `${label}(${chartValue[index]})`;
  });
  const chartData = {
    labels,
    datasets: [
      {
        data: chartValue,
        backgroundColor: chartColor,
        borderColor: "rgba(255, 255, 255, 0.5)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Flex
      width={"100%"}
      justifyContent={"space-between"}
      alignItems={"center"}
      p={4}
    >
      <Flex width={"180px"} height={"180px"} justifyContent={"center"}>
        <Doughnut
          data={chartData}
          options={{
            cutout: `${donutSize}%`,
            plugins: {
              tooltip: {
                enabled: true,
              },
              legend: {
                display: false,
              },
              datalabels: {
                display: true,
                color: "black",
                font: {
                  size: 10,
                },
              },
            },
          }}
        />
      </Flex>
      <Flex alignItems={"center"} justifyContent={"center"} width={"50%"}>
        <CustomLegend labels={combinedArray} colors={chartColor} />
      </Flex>
    </Flex>
  );
}

export default PieChart;
