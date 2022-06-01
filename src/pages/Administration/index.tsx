import React from "react";

import { Flex, Heading, Text } from "@chakra-ui/react";
import { ErrorBoundary } from "react-error-boundary";
import PageTitle from "../../layouts/PageTitle";
import MotionWrapper from "../../components/MotionWrapper";
import Conductor from "../../features/Conductor";
import DynamicEntities from "../../features/DynamicEntities";
import Card, { CardContent, CardHeader } from "../../common/Card";

function ErrorFallback({ error }: any) {
    return (
        <Card variant={"flat"} role="alert">
            <CardHeader title="Something went wrong:" />
            <CardContent>
                <Text color={"red.400"}>
                    <pre>{JSON.stringify(error.message, null, 2)}</pre>
                </Text>
            </CardContent>
        </Card>
    );
}

const Administration: React.FC = () => {
    return (
        <MotionWrapper data-testid="administration-page">
            <PageTitle />
            <Flex gap={6} width={"100%"} flexWrap={"wrap"}>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <DynamicEntities />
                </ErrorBoundary>
                <Conductor />
            </Flex>
        </MotionWrapper>
    );
};

export default Administration;
