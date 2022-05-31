import React, { memo } from "react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
    chakra,
    Table,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";

import { useTable, useSortBy, useExpanded, Column } from "react-table";
import { AnimatePresence, motion } from "framer-motion";

import { type DynamicEntitiesData } from "../../";
import NestedTable from "./NestedTable";

const TdMotion = motion(chakra.td);
const TrMotion = motion(chakra.tr);
const ThMotion = motion(chakra.th);
const TheadMotion = motion(chakra.thead);
const TbodyMotion = motion(chakra.tbody);
const MotionComponent = motion(chakra.div);

type ExpandTableProps = {
    columns: Column<DynamicEntitiesData>[];
    data: DynamicEntitiesData[];
    tableHooks: any;
};

const ExpandTable: React.FC<ExpandTableProps> = ({
    columns,
    data,
    tableHooks,
}) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        visibleColumns,
    } = useTable({ columns, data }, useSortBy, useExpanded, tableHooks);

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
                    {headerGroups.map((headerGroup) => (
                        <TrMotion
                            as={Tr}
                            {...headerGroup.getHeaderGroupProps()}
                        >
                            {headerGroup.headers.map((column) => (
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
                        {rows.map((row, index) => {
                            prepareRow(row);
                            return (
                                <React.Fragment key={index}>
                                    <TrMotion
                                        as={Tr}
                                        borderRadius={"lg"}
                                        {...row.getRowProps()}
                                        {...animateProps}
                                    >
                                        {row.cells.map((cell) => (
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

export default memo(ExpandTable);
