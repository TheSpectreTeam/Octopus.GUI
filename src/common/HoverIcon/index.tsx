import { Icon, useColorModeValue } from "@chakra-ui/react";
import React from "react";

type HoverIconProps = {
    icon: any;
    lightColor?: string;
    darkColor?: string;
    hoverColor: string;
    [x: string]: any;
};

const HoverIcon: React.FC<HoverIconProps> = ({
    icon,
    lightColor='gray.300',
    darkColor='gray.500',
    hoverColor,
    ...rest
}) => {
    return (
        <Icon
            as={icon}
            h={5}
            w={5}
            color={useColorModeValue(lightColor, darkColor)}
            sx={{
                ".hovered-icon-btn:hover &": {
                    color: hoverColor,
                },
            }}
            {...rest}
        />
    );
};

export default HoverIcon;
