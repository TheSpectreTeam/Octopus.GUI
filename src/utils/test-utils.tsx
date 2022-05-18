import React,{ ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "../theme";

type Props = {
    children: React.ReactNode;
};
export const ChakraWrapper: React.FC<Props> = ({ children }: Props) => {
    return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: ChakraWrapper, ...options });

export * from "@testing-library/react";
export { customRender as render };
