import React, { HTMLInputTypeAttribute } from "react";
import { DragHandleIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Icon,
    IconButton,
    Input,
    Text,
} from "@chakra-ui/react";

import { BsCheckLg, BsFolder } from "react-icons/bs";
import Card from "../../common/Card";

const Conductor = () => {
    return (
        <Card width={600}>
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
            <ConductorInput
                ariaLabel="input-folder"
                icon={<BsFolder />}
                label="Input folder"
                inputType="text"
            />
            <ConductorInput
                ariaLabel="output-folder"
                label="Output folder"
                icon={<BsFolder />}
            />
            <ConductorInput
                ariaLabel="model-name"
                label="Model name"
                icon={<Icon as={BsCheckLg} color="green.400" />}
            />
            <Flex width="100%" justifyContent={"flex-end"}>
                <HStack>
                    <Button variant={"solid"} colorScheme="blue">
                        Save
                    </Button>
                    <Button>Cancel</Button>
                </HStack>
            </Flex>
        </Card>
    );
};

export default Conductor;

type Props = {
    icon:
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | undefined;
    isIcon?: boolean;
    inputType?: HTMLInputTypeAttribute;
    ariaLabel: string;
    label?: string;
};

const ConductorInput: React.FC<Props> = ({
    icon,
    isIcon = true,
    inputType = "text",
    label = "Field label",
    ariaLabel,
}) => {
    return (
        <FormControl>
            <Flex
                width={"full"}
                justifyContent="space-between"
                direction={{ base: "column", md: "row" }}
                alignItems={{ base: "flex-start", md: "center" }}
            >
                <FormLabel as="legend">{label || "field label"}</FormLabel>
                <Flex width={{ base: "100%", md: "60%" }} gap={3}>
                    <Input id="email" type={inputType} />
                    {isIcon && (
                        <IconButton
                            aria-label={ariaLabel}
                            variant={"ghost"}
                            icon={icon}
                        />
                    )}
                </Flex>
            </Flex>
        </FormControl>
    );
};
