import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { chakra, Table, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import {
    MotionComponent,
    TbodyMotion,
    TdMotion,
    TheadMotion,
    ThMotion,
    TrMotion,
} from "./helpers";
import NestedTable from "./NestedTable";

const TableLayout = ({
    getTableProps,
    headerGroups,
    getTableBodyProps,
    prepareRow,
    rows,
    visibleColumns,
}: any) => {
    const spring = React.useMemo(
        () => ({
            type: "spring",
            damping: 10,
            stiffness: 100,
        }),
        []
    );

    const animateProps = React.useMemo(
        () => ({
            initial: { height: 0, opacity: 0 },
            animate: {
                height: "auto",
                opacity: 1,
            },
            exit: { height: 0, opacity: 0 },
        }),
        []
    );
    return (
        <AnimatePresence exitBeforeEnter>
            <Table as={motion.table} {...getTableProps()} {...animateProps}>
                <TheadMotion as={Thead}>
                    {headerGroups.map((headerGroup: any) => (
                        <TrMotion
                            as={Tr}
                            {...headerGroup.getHeaderGroupProps()}
                        >
                            {headerGroup.headers.map((column: any) => (
                                <ThMotion
                                    as={Th}
                                    {...column.getHeaderProps({
                                        ...column.getSortByToggleProps(),
                                        style: {
                                            width: column.width,
                                        },
                                    })}
                                >
                                    {column.render("Header")}
                                    <chakra.span pl="4">
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <TriangleDownIcon aria-label="sorted descending" />
                                            ) : (
                                                <TriangleUpIcon aria-label="sorted ascending" />
                                            )
                                        ) : null}
                                    </chakra.span>
                                </ThMotion>
                            ))}
                        </TrMotion>
                    ))}
                </TheadMotion>
                <TbodyMotion {...getTableBodyProps()} {...animateProps}>
                    <AnimatePresence>
                        {rows.map((row: any, index: number | string) => {
                            prepareRow(row);
                            return (
                                <React.Fragment key={index}>
                                    <TrMotion
                                        as={Tr}
                                        borderRadius={"lg"}
                                        {...row.getRowProps()}
                                        {...animateProps}
                                    >
                                        {row.cells.map((cell: any) => (
                                            <TdMotion
                                                as={Td}
                                                bg={
                                                    row.isExpanded &&
                                                    "blackAlpha.100"
                                                }
                                                {...cell.getCellProps()}
                                                {...animateProps}
                                            >
                                                {cell.render("Cell")}
                                            </TdMotion>
                                        ))}
                                    </TrMotion>
                                    {row.isExpanded ? (
                                        <AnimatePresence exitBeforeEnter>
                                            <MotionComponent as={Tr}>
                                                <MotionComponent
                                                    as={Td}
                                                    isNumeric
                                                    margin="0"
                                                    padding="0"
                                                    transition={spring}
                                                    colSpan={
                                                        visibleColumns.length
                                                    }
                                                    {...animateProps}
                                                >
                                                    {<NestedTable row={row} />}
                                                </MotionComponent>
                                            </MotionComponent>
                                        </AnimatePresence>
                                    ) : null}
                                </React.Fragment>
                            );
                        })}
                    </AnimatePresence>
                </TbodyMotion>
            </Table>
        </AnimatePresence>
    );
};

export default TableLayout;
