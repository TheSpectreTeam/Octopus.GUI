import React, { memo } from "react";

import { Code, Icon, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import { Column, useExpanded, useSortBy, useTable } from "react-table";

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

export default memo(NestedTable);
