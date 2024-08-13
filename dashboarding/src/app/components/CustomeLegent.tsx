import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";

const CustomLegend = ({ labels, colors }: any) => {
  return (
    <Box>
      {labels.map((label: any, index: any) => (
        <HStack key={index} spacing={2} mb={1}>
          <Box
            width={3}
            height={3}
            bg={colors[index]}
            borderRadius="50%"
            flexShrink={0}
          />
          <Text fontSize="sm" fontWeight="500">
            {label}
          </Text>
        </HStack>
      ))}
    </Box>
  );
};

export default CustomLegend;
