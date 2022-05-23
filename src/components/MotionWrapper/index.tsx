import React from "react";

import { motion } from "framer-motion";
import { variants } from "../../theme/animations";

type Props = {
    children: React.ReactNode;
    as?: React.ElementType;
};

const MotionWrapper: React.FC<Props> = ({ children, as = "div", ...props }) => {
    const MotionElement = motion(as);
    return (
        <MotionElement
            initial="exit"
            animate="enter"
            exit="exit"
            variants={variants}
            {...props}
        >
            {children}
        </MotionElement>
    );
};

export default MotionWrapper;
