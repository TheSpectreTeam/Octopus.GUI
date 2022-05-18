import { Box, CircularProgress } from "@chakra-ui/react";
import React from "react";

const Loader: React.FC = () => {
    return (
        <Box
            display={"flex"}
            height="100vh"
            width={"100vw"}
            justifyContent="center"
            alignItems={"center"}
        >
            <CircularProgress isIndeterminate color="blue.300" />
        </Box>
    );
};

export default Loader;
