import React from "react";

import { Flex } from "@chakra-ui/react";

import PageTitle from "../../layouts/PageTitle";
import MotionWrapper from "../../components/MotionWrapper";
import Conductor from "../../features/Conductor";

const Administration: React.FC = () => {
    return (
        <MotionWrapper data-testid="administration-page">
            <PageTitle />
            <Flex gap={6} width="" flexWrap={"wrap"}>
                <Conductor />
            </Flex>
        </MotionWrapper>
    );
};

export default Administration;
