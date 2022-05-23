import { mode } from "@chakra-ui/theme-tools";

const Card = {
    baseStyle: (props: any) => ({
        display: "flex",
        flexDirection: "column",
        background: mode("white", "gray.800")(props),
        alignItems: "center",
        gap: 6,
    }),

    variants: {
        rounded: {
            padding: 8,
            borderRadius: "xl",
            boxShadow: "xl",
        },
        smooth: {
            padding: 6,
            borderRadius: "base",
            boxShadow: "sm",
        },
        flat: {
            padding: 3,
            borderRadius: "md",
            boxShadow: "none",
        },
    },

    defaultProps: {
        variant: "smooth",
    },
};
export default Card;
