import React from "react";

import { Box, Flex, Heading } from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";
import { Route, ROUTES } from "../routes";

type Props = {
    pageTitle?: string;
    icon?: React.ReactNode;
};

const PageTitle: React.FC<Props> = () => {
    const location = useLocation();

    const ROUTE = Object.values(ROUTES).find(
        (item: Route) => item.pathname === location.pathname
    );

    return (
        <Box paddingY={5}>
            <Flex
                direction={"row"}
                alignContent="center"
                gap={3}
                alignItems={"center"}
            >
                {ROUTE?.icon || <WarningTwoIcon w={30} h={30} />}
                <Heading as={"h2"} size={"md"}>
                    {ROUTE?.title || "Undefined Page"}
                </Heading>
            </Flex>
        </Box>
    );
};

export default PageTitle;
