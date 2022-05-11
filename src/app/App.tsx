import React from "react";
import Layout from "../layouts";
import { withProviders } from "./providers";

const App = () => {
  return (
    <main>
      <Layout />
    </main>
  );
};

export default withProviders(App);
