import React from "react";
import Layout from "../layouts";
import Routing from "../routes";
import { withProviders } from "./providers";

const App = () => {
    return (
        <Layout>
            <Routing />
        </Layout>
    );
};

export default withProviders(App);
