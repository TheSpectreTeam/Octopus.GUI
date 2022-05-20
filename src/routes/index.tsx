
import React from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Routes} from "react-router-dom";

import Loader from "../common/Loader";

const AdministrationPage = React.lazy(() => import("../pages/Administration"));
const NotFoundPage = React.lazy(()=> import("../pages/NotFound"))

export const ROUTES = {
    administration: "/admin",
    home: "/",
};

const Routing = () => {
    return (
        <AnimatePresence exitBeforeEnter>
            <React.Suspense fallback={<Loader />}>
                <Routes >
                    <Route
                        path={ROUTES.administration}
                        element={<AdministrationPage />}
                    />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </React.Suspense>
        </AnimatePresence>
    );
};

export default Routing;
