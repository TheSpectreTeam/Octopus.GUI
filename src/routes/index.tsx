import { AnimatePresence } from "framer-motion";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import NotFoundPage from "../pages/NotFound";

const AdministrationPage = React.lazy(() => import("../pages/Administration"));

export const ROUTES ={
    administration:'/admin',
    home:'/'
}

const Routing = () => {
    const location = useLocation()
    return (
        <AnimatePresence exitBeforeEnter >
            <Routes location={location} key={location.pathname}>
                <Route path={ROUTES.administration} element={<AdministrationPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </AnimatePresence>
    );
};

export default Routing;
