import {
    Box,
    Flex,
    Heading,
    Text,
    useStyleConfig,
    Skeleton as ChakraSkeleton,
} from "@chakra-ui/react";

import React from "react";

type Props = {
    variant?: any;
    children: React.ReactNode;
    [x: string]: any;
};

const Card: React.FC<Props> = ({ variant = "rounded", children, ...props }) => {
    const styles = useStyleConfig("Card", { variant });

    return (
        <Box __css={styles} height={"fit-content"} {...props}>
            {children}
        </Box>
    );
};

export default Card;

export const CardHeader = ({
    isLoaded = true,
    title,
    children,
    description,
}: any) => {
    return (
        <Flex
            width={"100%"}
            direction={"row"}
            alignItems={"center"}
            justifyContent="space-between"
        >
            <Flex direction={"column"}>
                <ChakraSkeleton isLoaded={isLoaded}>
                    <Heading as="h2" size="md">
                        {title ?? null}
                    </Heading>
                    <Text color="gray.500">{description}</Text>
                </ChakraSkeleton>
            </Flex>
            {children}
        </Flex>
    );
};

type WrapperComponentPorps = {
    [x: string]: any;
    children: React.ReactNode;
};

export const CardHeaderActions: React.FC<WrapperComponentPorps> = ({
    children,
    ...rest
}) => {
    return (
        <Flex gap={3} {...rest}>
            {children}
        </Flex>
    );
};

export const CardContent: React.FC<WrapperComponentPorps> = ({
    children,
    ...rest
}) => {
    return (
        <Flex width={"100%"} {...rest}>
            {children}
        </Flex>
    );
};
