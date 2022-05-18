import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Loader from "../../common/Loader";

export const withRouter = (component: () => React.ReactNode) => () =>
    (
        <Router>
            <React.Suspense fallback={<Loader/>}>
                {component()}
            </React.Suspense>
        </Router>
    );
