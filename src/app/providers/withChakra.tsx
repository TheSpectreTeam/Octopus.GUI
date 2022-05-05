import React from "react";
import { ChakraProvider } from '@chakra-ui/react'
import theme from "../../theme";

export const withChakra = (component: () => React.ReactNode) => () => 
  <ChakraProvider theme={theme}>
    <React.Suspense fallback="...loading">{component()}</React.Suspense>
  </ChakraProvider>;

