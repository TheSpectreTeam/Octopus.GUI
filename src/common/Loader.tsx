import { Box, CircularProgress } from "@chakra-ui/react";
import React from "react";

const Loader: React.FC = () => {
    return (
        <Box
            height={"calc(100vh - 160px)"}
            display="flex"
            justifyContent={"center"}
            alignItems="center"
        >
            <CircularProgress isIndeterminate color="blue.300" />
        </Box>
    );
};

export default Loader;
