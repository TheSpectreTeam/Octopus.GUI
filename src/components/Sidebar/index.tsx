import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

type Props = {
    children: React.ReactNode;
};

const Sidebar: React.FC<Props> = ({ children }) => {
    return (
        <Box
            minHeight="100vh-20px"
            minW={"min-content"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Box
                zIndex={2}
                borderTop={{ base: "1px solid", md: "none" }}
                borderColor={{
                    base: useColorModeValue("gray.200", "gray.700"),
                    md: "none",
                }}
                width={{ base: "full", md: 20 }}
                height={{ base: 20, md: "inherit" }}
                position="fixed"
                bottom={{ base: 0, md: "none" }}
                top={{ base: "none", md: 20 }}
                background={useColorModeValue("gray.50", "gray.900")}
                role="complementary"
            >
                <Box role="navigation" padding={"1rem"} display="flex">
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default Sidebar;
