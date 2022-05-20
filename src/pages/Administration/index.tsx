import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { ROUTES } from "../../routes";
import { variants } from "../../theme/animations";

const Administration = () => {
    return (
        <motion.div initial="exit" animate="enter" exit="exit">
            <motion.div variants={variants} data-testid="administration-page">
                <Box background={useColorModeValue('white','gray.800')} borderRadius={'md'} padding={5}>
                    <h2>Administration Page</h2>
                    <Link to={ROUTES.home}>← Back</Link>
                </Box>
            </motion.div>
        </motion.div>
    );
};

export default Administration;
