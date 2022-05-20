import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
    initialColorMode: "dark",
    useSystemColorMode: true,
};

const colors = {
    gray: {
        800: "#1E1E2D",
        900: "#151521",
    },
};

const styles = {
    global: (props: any) => ({
        "html, body": {
            background: mode("gray.50", "gray.900")(props),
        },
    }),
};

const theme = extendTheme({
    config,
    colors,
    styles,
});

export default theme;
