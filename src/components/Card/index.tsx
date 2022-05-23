import { Box, useStyleConfig } from "@chakra-ui/react";
import React from "react";

type Props = {
    variant?: any;
    children: React.ReactNode;
};

const Card: React.FC<Props> = ({ variant = "rounded", children, ...props }) => {
    const styles = useStyleConfig("Card", { variant });

    return (
        <Box __css={styles} {...props}>
            {children}
        </Box>
    );
};

export default Card;
