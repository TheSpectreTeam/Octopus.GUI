import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes";
import { variants } from "../../theme/animations";

const Administration = () => {
    return (
        <motion.div initial="exit" animate="enter" exit="exit">
            <motion.div variants={variants}>
                <Link to={ROUTES.home}>← Back</Link>
            </motion.div>
        </motion.div>
    );
};

export default Administration;
