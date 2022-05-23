import React from "react";
import { AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes } from "react-router-dom";

import Loader from "../common/Loader";
import { DonutIcon, InfoIcon, StatsIcon } from "../assets";
import PageTitle from "../layouts/PageTitle";
import { ComponentWithAs, IconProps } from "@chakra-ui/react";

const AdministrationPage = React.lazy(() => import("../pages/Administration"));
const NotFoundPage = React.lazy(() => import("../pages/NotFound"));

export type Route = {
    pathname: string;
    icon: ComponentWithAs<"svg", IconProps>;
    title: string;
    page?: React.ReactNode;
};

export type Routes = {
    [x: string]: Route;
};

export const ROUTES: Routes = {
    administration: {
        pathname: "/admin",
        icon: DonutIcon,
        title: "Administration",
        page: <AdministrationPage />,
    },
    statistics: {
        pathname: "/statistic",
        icon: StatsIcon,
        title: "Statistic",
        //FIXME: Remove this element
        page: <PageTitle />,
    },
    info: {
        pathname: "/info",
        icon: InfoIcon,
        title: "Info",
    },
};

const Routing = () => {
    return (
        <AnimatePresence exitBeforeEnter>
            <React.Suspense fallback={<Loader />}>
                <Routes>
                    {Object.values(ROUTES).map((item: Route, index: number) => {
                        if (!item.page) return;
                        return (
                            <Route
                                key={index}
                                path={item.pathname}
                                element={item.page}
                            />
                        );
                    })}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </React.Suspense>
        </AnimatePresence>
    );
};

export default Routing;
