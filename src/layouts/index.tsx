import { Box } from "@chakra-ui/react";
import React from "react";
import Navbar from "../components/Navbar";

const Layout: React.FC = () => {
  return (
    <Box minH={"100vh"}>
      <Navbar />
    </Box>
  );
};

export default Layout;
