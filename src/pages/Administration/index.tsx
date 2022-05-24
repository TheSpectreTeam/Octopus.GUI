import React from "react";

import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { ErrorBoundary } from "react-error-boundary";
import PageTitle from "../../layouts/PageTitle";
import MotionWrapper from "../../components/MotionWrapper";
import Conductor from "../../features/Conductor";
import DynamicEntities from "../../features/DynamicEntities";
import Card from "../../common/Card";

function ErrorFallback({ error }: any) {
    return (
        <Card variant={"flat"} role="alert">
            <Heading size="sm" as="h5">
                Something went wrong:
            </Heading>
            <Flex>
                <Text color={"red.400"}>
                    {JSON.stringify(error.message, null, 2)}
                </Text>
            </Flex>
        </Card>
    );
}

const Administration: React.FC = () => {
    return (
        <MotionWrapper data-testid="administration-page">
            <PageTitle />
            <Flex gap={6} width="" flexWrap={"wrap"}>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <DynamicEntities />
                </ErrorBoundary>
                <Conductor />
            </Flex>
        </MotionWrapper>
    );
};

export default Administration;
