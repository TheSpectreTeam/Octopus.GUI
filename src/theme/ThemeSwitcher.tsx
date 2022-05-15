import React from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";

export const ThemeSwitcher: React.FC = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <IconButton
            mx="2em"
            size={"sm"}
            aria-label="Switch theme"
            variant={"ghost"}
            onClick={toggleColorMode}
            icon={
                colorMode === "light" ? (
                    <MoonIcon color="gray.300" width={"24px"} height={"24px"} />
                ) : (
                    <SunIcon color="gray.300" width={"24px"} height={"24px"} />
                )
            }
        />
    );
};
