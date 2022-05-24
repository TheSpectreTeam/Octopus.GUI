import {
    DragHandleIcon,
    TriangleDownIcon,
    TriangleUpIcon,
} from "@chakra-ui/icons";
import {
    Flex,
    Heading,
    IconButton,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    chakra,
    Badge,
    Code,
} from "@chakra-ui/react";

import { useTable, useSortBy, Column, useExpanded } from "react-table";
import React from "react";
import Card from "../../common/Card";

const DynamicEntities = () => {
    type DynamicEntityDBProperty = {
        dataBaseTypeName: string;
        length: number;
        isNotNull: boolean;
        isKey: boolean;
        comment: string;
    };

    type DataProperty = {
        propertyName: string;
        systemTypeName: string; //union
        valueIndex: number;
        dynamicEntityDataBaseProperty: DynamicEntityDBProperty;
    };

    type Data = {
        entityName: string;
        properties: Array<DataProperty>;
    };

    const data: Data[] = React.useMemo(
        (): Data[] => [
            {
                entityName: "People",
                properties: [
                    {
                        propertyName: "ID",
                        valueIndex: 0,
                        systemTypeName: "Int32",
                        dynamicEntityDataBaseProperty: {
                            comment: "text",
                            dataBaseTypeName: "int",
                            isKey: false,
                            isNotNull: true,
                            length: 25,
                        },
                    },
                    {
                        propertyName: "Type",
                        valueIndex: 1,
                        systemTypeName: "String",
                        dynamicEntityDataBaseProperty: {
                            comment: "entity type",
                            dataBaseTypeName: "string",
                            isKey: false,
                            isNotNull: true,
                            length: 25,
                        },
                    },
                    {
                        propertyName: "Sex",
                        valueIndex: 2,
                        systemTypeName: "String",
                        dynamicEntityDataBaseProperty: {
                            comment: "entity type",
                            dataBaseTypeName: "string",
                            isKey: false,
                            isNotNull: true,
                            length: 25,
                        },
                    },
                ],
            },
            {
                entityName: "Employee",
                properties: [
                    {
                        propertyName: "ID",
                        valueIndex: 3,
                        systemTypeName: "Int32",
                        dynamicEntityDataBaseProperty: {
                            comment: "text",
                            dataBaseTypeName: "int",
                            isKey: false,
                            isNotNull: true,
                            length: 25,
                        },
                    },
                ],
            },
            {
                entityName: "Tank",
                properties: [
                    {
                        propertyName: "ID",
                        valueIndex: 4,
                        systemTypeName: "Int32",
                        dynamicEntityDataBaseProperty: {
                            comment: "text",
                            dataBaseTypeName: "int",
                            isKey: false,
                            isNotNull: true,
                            length: 25,
                        },
                    },
                ],
            },
            {
                entityName: "Car",
                properties: [
                    {
                        propertyName: "ID",
                        valueIndex: 5,
                        systemTypeName: "Int32",
                        dynamicEntityDataBaseProperty: {
                            comment: "text",
                            dataBaseTypeName: "int",
                            isKey: false,
                            isNotNull: true,
                            length: 25,
                        },
                    },
                ],
            },
        ],
        []
    );

    const columns = React.useMemo<Column<Data>[]>(
        () => [
            {
                Header: ({
                    getToggleAllRowsExpandedProps,
                    isAllRowsExpanded,
                }) => (
                    <span {...getToggleAllRowsExpandedProps()}>
                        {isAllRowsExpanded ? "👇" : "👉"}
                    </span>
                ),
                id: "expander",
                Cell: ({ row }: any) => (
                    <span {...row.getToggleRowExpandedProps()}>
                        {row.isExpanded ? "👇" : "👉"}
                    </span>
                ),
                width: 10,
            },
            {
                id: "entityName",
                Header: "Name",
                accessor: "entityName",
                width: 30,
            },
            {
                id: "properties",
                Header: "Propertyes",
                accessor: "properties",
                width: 60,
                Cell: ({ value }) => (
                    <Flex gap={2}>
                        {value.map((item: any, index: number) => (
                            <Badge colorScheme={"blue"} key={index}>
                                {item.propertyName}
                            </Badge>
                        ))}
                    </Flex>
                ),
            },
        ],
        []
    );

    const renderRowSubComponent = React.useCallback(({ row }: any) => {
        return (
            <pre>
                <Code width={"full"}>
                    {JSON.stringify(row.values, null, 2)}
                </Code>
            </pre>
        );
    }, []);

    return (
        <Card overflowX={"auto"} width={1200} height={"fit-content"}>
            <Flex
                width={"100%"}
                direction={"row"}
                alignItems={"center"}
                justifyContent="space-between"
            >
                <Flex>
                    <Heading as="h2" size="sm">
                        Dynaminc entities
                    </Heading>
                </Flex>
                <Flex gap={3}>
                    <IconButton
                        aria-label="button"
                        size="sm"
                        variant={"ghost"}
                        icon={<DragHandleIcon />}
                    />
                </Flex>
            </Flex>
            <Flex width={"100%"}>
                <CustomTable
                    data={data}
                    columns={columns}
                    renderRowSubComponent={renderRowSubComponent}
                />
            </Flex>
        </Card>
    );
};

export default DynamicEntities;

const CustomTable = ({ columns, data, renderRowSubComponent }: any) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        visibleColumns,
    } = useTable({ columns, data }, useSortBy, useExpanded);

    return (
        <Table {...getTableProps()}>
            <Thead>
                {headerGroups.map((headerGroup) => (
                    <Tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <Th
                                {...column.getHeaderProps(
                                    column.getSortByToggleProps()
                                )}
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
                            </Th>
                        ))}
                    </Tr>
                ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <>
                            <Tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <Td {...cell.getCellProps()}>
                                        {cell.render("Cell")}
                                    </Td>
                                ))}
                            </Tr>
                            {row.isExpanded ? (
                                <Tr>
                                    <Td colSpan={visibleColumns.length}>
                                        {renderRowSubComponent({ row })}
                                    </Td>
                                </Tr>
                            ) : null}
                        </>
                    );
                })}
            </Tbody>
        </Table>
    );
};
