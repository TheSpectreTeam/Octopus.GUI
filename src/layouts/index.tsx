import { Box, Button, chakra, Flex } from "@chakra-ui/react";
import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

type Props = {
    children?: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <Box minH={"100vh"}>
            <Navbar />
            <Flex flexDirection={{ base: "column", md: "row" }}>
                <Sidebar>
                    <NavItems />
                </Sidebar>
                <chakra.main
                    width={"full"}
                    role={"main"}
                    padding={"1rem"}
                    marginLeft={{ base: "none", md: 20 }}
                >
                    {children}
                </chakra.main>
            </Flex>
        </Box>
    );
};
//TODO: Remove this demo component
const NavItems = () => {
    return (
        <>
            {Array(5)
                .fill(1)
                .map(() => (
                    <div>NAV</div>
                ))}
        </>
    );
};
export default Layout;
