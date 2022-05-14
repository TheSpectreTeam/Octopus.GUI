import React from "react";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";

type Props = {
    children: React.ReactNode;
};

const Sidebar: React.FC<Props> = ({ children }) => {
    return (
        <Box
            minHeight="100vh-20px"
            minW={"min-content"}
            bg={useColorModeValue("gray.100", "gray.900")}
        >
            <Box
                width={{ base: "full", md: 20 }}
                height={{ base: 20, md: "inherit" }}
                position="fixed"
                bottom={{ base: 0, md: "none" }}
                top={{ base: "none", md: 20 }}
                role="complementary"
            >
                <Box role="navigation" padding={"1rem"} display="flex">
                    <Flex
                        height={"calc(100vh - 192px)"}
                        width='full'
                        direction={{ base: "row", md: "column" }}
                        justifyContent={{ base: "space-around", md: "center" }}
                    >
                        {children}
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
};

export default Sidebar;
