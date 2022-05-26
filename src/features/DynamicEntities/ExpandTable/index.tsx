import React from "react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
    chakra,
    Code,
    Icon,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";

import { useTable, useSortBy, useExpanded, Column } from "react-table";
import { AnimatePresence, motion } from "framer-motion";

import { BsCheckLg, BsXLg } from "react-icons/bs";
import {type DynamicEntitiesData } from "..";

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

export default ExpandTable;

const NestedTable = ({ row }: any) => {
    const data = React.useMemo(
        () => row.values.properties.map((item: any) => item),

        []
    );
    const columns = React.useMemo<Column<any>[]>(
        () => [
            { Header: "Index", accessor: "valueIndex" },
            { Header: "Name", accessor: "propertyName" },
            { Header: "System Type", accessor: "systemTypeName" },

            {
                Header: "DB Type",
                accessor: "dynamicEntityDataBaseProperty.dataBaseTypeName",
            },
            {
                Header: "Key",
                accessor: "dynamicEntityDataBaseProperty.isKey",
                Cell: ({ value }) => {
                    return (
                        <Icon
                            as={value ? BsCheckLg : BsXLg}
                            color={value ? "green.400" : "red.400"}
                        />
                    );
                },
            },
            {
                Header: "Not null",
                accessor: "dynamicEntityDataBaseProperty.isNotNull",
                Cell: ({ value }) => {
                    return (
                        <Icon
                            as={value ? BsCheckLg : BsXLg}
                            color={value ? "green.400" : "red.400"}
                        />
                    );
                },
            },
            {
                Header: "Length",
                accessor: "dynamicEntityDataBaseProperty.length",
            },
            {
                Header: "Comment",
                accessor: "dynamicEntityDataBaseProperty.comment",
                Cell: ({ value }) => <Code>{value}</Code>,
            },
        ],
        []
    );

    const numericHeaders = ["Index", "Length"];

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data }, useSortBy, useExpanded);

    return (
        <Table {...getTableProps()} paddingLeft={90} width="100%">
            <Thead>
                {headerGroups.map((headerGroup) => (
                    <Tr
                        borderBottom={"1px dashed red"}
                        {...headerGroup.getHeaderGroupProps()}
                    >
                        {headerGroup.headers.map((column) => (
                            <Th
                                isNumeric={numericHeaders.includes(
                                    column.Header as string
                                )}
                                borderBottom={"1px dashed red"}
                                {...column.getHeaderProps()}
                            >
                                {column.render("Header")}
                            </Th>
                        ))}
                    </Tr>
                ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <Tr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                                <Td
                                    isNumeric={typeof cell.value === "number"}
                                    borderBottom={"1px dashed red"}
                                    {...cell.getCellProps()}
                                >
                                    {cell.render("Cell")}
                                </Td>
                            ))}
                        </Tr>
                    );
                })}
            </Tbody>
        </Table>
    );
};
