import React from "react";
import { Box, chakra, Flex } from "@chakra-ui/react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import NavMenu from "../components/NavMenu";

type Props = {
    children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <Box minH={"100vh"} minWidth={"320px"}>
            <Navbar />
            <Flex
                flexDirection={{ base: "column", md: "row" }}
                position="relative"
            >
                <Sidebar>
                    <NavMenu />
                </Sidebar>
                <chakra.main
                    width={{ base: "calc(100% - 2em)", md: "calc(100vw - 112px)" }}
                    height={'full'}
                    role={"main"}
                    aria-label="Main content"
                    marginLeft={{ base: "1em", md: 20 }}
                    marginRight={{ base: "1em", md: 5 }}
                    marginBottom={{ base: 20, md: 0 }}
                >
                    {children}
                </chakra.main>
            </Flex>
        </Box>
    );
};

export default Layout;
