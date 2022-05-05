import React from "react";
import { ChakraProvider } from '@chakra-ui/react'

export const withChakra = (component: () => React.ReactNode) => () => 
  <ChakraProvider>
    <React.Suspense fallback="...loading">{component()}</React.Suspense>
  </ChakraProvider>;

