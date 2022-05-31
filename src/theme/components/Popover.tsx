import { mode } from "@chakra-ui/theme-tools";

const Popover = {
    baseStyle: (props: any) => ({
        content: { bg: mode("white", "gray.800")(props), arrow:{bg:'red'} },
    }),
};
export default Popover;
