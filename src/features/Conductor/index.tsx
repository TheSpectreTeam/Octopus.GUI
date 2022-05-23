import React from "react";
import { DragHandleIcon } from "@chakra-ui/icons";
import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    IconButton,
    Input,
    Text,
} from "@chakra-ui/react";

import { BsFolder } from "react-icons/bs";

import Card from "../../common/Card";

const Conductor = () => {
    const [value, setValue] = React.useState<number>(0);

    return (
        <Card width={900}>
            <Flex
                width={"full"}
                as={Box}
                justifyContent={"space-between"}
                alignItems={"center"}
            >
                <Flex direction={"column"}>
                    <Heading as="h2" size="md">
                        Conductor
                    </Heading>
                    <Text color="gray.500">Entity Description</Text>
                </Flex>
                <Flex>
                    <IconButton
                        aria-label="button"
                        size="sm"
                        variant={"ghost"}
                        icon={<DragHandleIcon />}
                    />
                </Flex>
            </Flex>
            <FormControl>
                <Flex
                    width={"full"}
                    justifyContent="space-between"
                    direction={{ base: "column", md: "row" }}
                    alignItems={{ base: "flex-start", md: "center" }}
                >
                    <FormLabel as="legend">Input path</FormLabel>
                    <Flex width={{ base: "100%", md: "60%" }} gap={3}>
                        <Input id="email" type="text" />
                        <IconButton
                            aria-label="folder"
                            variant={"ghost"}
                            icon={<BsFolder />}
                        ></IconButton>
                    </Flex>
                </Flex>
            </FormControl>
        </Card>
    );
};

export default Conductor;
