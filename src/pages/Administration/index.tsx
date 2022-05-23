import React from "react";

import PageTitle from "../../layouts/PageTitle";
import MotionWrapper from "../../components/MotionWrapper";

const Administration: React.FC = () => {
    return (
        <MotionWrapper data-testid="administration-page">
            <PageTitle />
        </MotionWrapper>
    );
};

export default Administration;
