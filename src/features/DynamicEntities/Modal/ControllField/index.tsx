import React from "react";
import {
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
} from "@chakra-ui/react";

import { FieldError } from "react-hook-form";

type ControllField = {
    errors?: FieldError | undefined;
    labelKey: string;
    actions?: React.ReactNode;
    title?: string | React.ReactNode;
    controller?: React.ReactElement<any, any>;
    [x: string]: any;
};

const ControllField: React.FC<ControllField> = ({
    errors,
    labelKey,
    controller,
    actions,
    title = "Property Name",
    ...rest
}) => {
    return (
        <FormControl {...rest} isInvalid={!!errors}>
            <FormLabel htmlFor={labelKey}>{title}</FormLabel>
            <Flex direction={"row"} gap={3}>
                <>
                    {controller}
                    {actions ?? null}
                </>
            </Flex>
            {errors ? (
                <FormErrorMessage>{errors?.message}</FormErrorMessage>
            ) : null}
        </FormControl>
    );
};
export default ControllField