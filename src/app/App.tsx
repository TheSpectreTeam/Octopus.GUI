import { Box } from "@chakra-ui/react";
import React from "react";
import Layout from "../layouts";
import { withProviders } from "./providers";

const App = () => {
    return (
        <Layout>
            <Content />
        </Layout>
    );
};

//TODO: Remove this demo component
const Content = () => {
    return <Box height={1500}>CONTENT</Box>;
};

export default withProviders(App);
