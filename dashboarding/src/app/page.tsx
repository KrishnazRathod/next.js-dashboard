"use client";
import DashboardV2 from "./dashboard/page";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme/components";
import { Provider } from "react-redux";
import store from "./redux/store/store";

export default function Home() {
  return (
    <>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <DashboardV2 />
        </ChakraProvider>
      </Provider>
    </>
  );
}
