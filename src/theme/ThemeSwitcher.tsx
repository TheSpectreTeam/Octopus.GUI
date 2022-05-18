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
            data-testid="theme-switcher"
            variant={"ghost"}
            onClick={toggleColorMode}
            icon={
                colorMode === "light" ? (
                    <MoonIcon
                        data-tesid="to-dark-theme"
                        color="gray.300"
                        width={"24px"}
                        height={"24px"}
                    />
                ) : (
                    <SunIcon
                        data-testid="to-ligth-theme"
                        color="gray.300"
                        width={"24px"}
                        height={"24px"}
                    />
                )
            }
        />
    );
};
