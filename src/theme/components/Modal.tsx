import { mode } from "@chakra-ui/theme-tools";

const Modal = {
    baseStyle: (props: any) => ({
        bg: "red",
        dialog: {
            background: mode("white", "gray.800")(props),
        },
    }),
};
export default Modal;
