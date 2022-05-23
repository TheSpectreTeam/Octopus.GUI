import React from "react";
import { Box, Button, Heading, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import MotionWrapper from "../../components/MotionWrapper";
import { ROUTES } from "../../routes";

const NotFound = () => {
    return (
        <MotionWrapper data-testid="not-found-page">
            <Box textAlign="center" py={10} px={6}>
                <Heading
                    display="inline-block"
                    as="h2"
                    size="2xl"
                    bgGradient="linear(to-r, blue.400, blue.600)"
                    backgroundClip="text"
                >
                    404
                </Heading>
                <Text fontSize="18px" mt={3} mb={2}>
                    Page Not Found
                </Text>
                <Text color={"gray.500"} mb={6}>
                    The page you're looking for does not seem to exist
                </Text>
                <Link as={RouterLink} to={ROUTES.administration.pathname}>
                    <Button
                        colorScheme="blue"
                        bgGradient="linear(to-r, blue.400, blue.500, blue.600)"
                        color="white"
                        variant="solid"
                    >
                        Go to Administration
                    </Button>
                </Link>
            </Box>
        </MotionWrapper>
    );
};

export default NotFound;
