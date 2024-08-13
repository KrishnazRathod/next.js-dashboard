"use client";
import DashboardV2 from "./dashboard/page";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme/components";

export default function Home() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <DashboardV2 />
      </ChakraProvider>
    </>
  );
}
