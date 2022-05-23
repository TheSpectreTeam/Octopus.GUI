import React from "react";

import PageTitle from "../../layouts/PageTitle";
import MotionWrapper from "../../components/MotionWrapper";
import Card from "../../components/Card";
import { Flex } from "@chakra-ui/react";

const Administration: React.FC = () => {
    return (
        <MotionWrapper data-testid="administration-page">
            <PageTitle />

            <Flex gap={6} width="" flexWrap={"wrap"}>
                <Card variant="flat" height={200} width={400}>Conductor</Card>
                <Card variant="flat" width={600}>Dynamic Entitys</Card>
            </Flex>
        </MotionWrapper>
    );
};

export default Administration;
