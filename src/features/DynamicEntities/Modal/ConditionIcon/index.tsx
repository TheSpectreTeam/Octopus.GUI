import { Flex, Icon, Tooltip, Text } from "@chakra-ui/react";
import React from "react";
import { useWatch } from "react-hook-form";
import { IconType } from "react-icons";

const ConditionIcon = React.forwardRef(
    (
        {
            control,
            index,
            label,
            icon,
            field,
            text,
            color,
            ...rest
        }: {
            control: any;
            index: number;
            label: string;
            icon?: IconType;
            text?: string;
            field: string;
            color: string;
        },
        ref: any
    ) => {
        const output = useWatch<any>({
            name: "properties",
            control,
            defaultValue: false,
        });
        return output[index]?.dynamicEntityDataBaseProperty?.[field] ===
            true ? (
            <Tooltip label={label}>
                <Flex
                    cursor={"pointer"}
                    alignItems="center"
                    justifyItems={"center"}
                    ref={ref}
                    {...rest}
                >
                    {icon && (
                        <Icon
                            width={6}
                            h={6}
                            color={"gray.400"}
                            _hover={{ color: color }}
                            as={icon}
                        />
                    )}
                    {text && (
                        <Text fontWeight={"bold"} color={"red.400"}>
                            {text}
                        </Text>
                    )}
                </Flex>
            </Tooltip>
        ) : null;
    }
);

export default ConditionIcon;
