import { Flex, Skeleton as ChakraSkeleton } from "@chakra-ui/react";
import React from "react";

const Skeleton = ({ columns, rows }: { columns: number; rows: number }) => {
    return (
        <Flex width={"full"} flexDirection="column" gap={3}>
            <ChakraSkeleton height={20} width={"full"}></ChakraSkeleton>
            {Array(rows)
                .fill("")
                .map((item, index) => (
                    <Flex key={index} direction={"row"} gap={3}>
                        {Array(columns)
                            .fill("")
                            .map((item, index) => (
                                <ChakraSkeleton
                                    height={"8"}
                                    key={index}
                                    width={"full"}
                                ></ChakraSkeleton>
                            ))}
                    </Flex>
                ))}
        </Flex>
    );
};

export default Skeleton;
