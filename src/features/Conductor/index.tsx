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
import Card, { CardContent, CardHeader } from "../../common/Card";

const Conductor = () => {
    return (
        <Card width={600}>
            <CardHeader title="Conductor">
                <IconButton
                    aria-label="button"
                    size="sm"
                    variant={"ghost"}
                    icon={<DragHandleIcon />}
                />
            </CardHeader>

            <CardContent direction="column" gap={3}>
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
            </CardContent>
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
