import React from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";

import Loader from "../common/Loader";
import { DonutIcon } from "../assets";
import PageTitle from "../layouts/PageTitle";

const AdministrationPage = React.lazy(() => import("../pages/Administration"));
const NotFoundPage = React.lazy(() => import("../pages/NotFound"));

export type Route = {
    pathname: string;
    icon: React.ReactNode;
    title: string;
    page: React.ReactNode;
};

export type Routes = {
    [x: string]: Route;
};

export const ROUTES: Routes = {
    administration: {
        pathname: "/admin",
        icon: <DonutIcon w={30} h={30} />,
        title: "Administration",
        page: <AdministrationPage />,
    },
    statistics: {
        pathname: "/statistic",
        icon: "",
        title: "Statistic",
        //FIXME: Remove this element
        page: <PageTitle />,
    },
};

const Routing = () => {
    return (
        <AnimatePresence exitBeforeEnter>
            <React.Suspense fallback={<Loader />}>
                <Routes>
                    {Object.values(ROUTES).map((item: Route, index: number) => (
                        <Route
                            key={index}
                            path={item.pathname}
                            element={item.page}
                        />
                    ))}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </React.Suspense>
        </AnimatePresence>
    );
};

export default Routing;
