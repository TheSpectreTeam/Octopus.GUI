import {
    DragHandleIcon,
    TriangleDownIcon,
    TriangleUpIcon,
} from "@chakra-ui/icons";
import {
    Flex,
    Heading,
    IconButton,
    Table as ChakraTable,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    chakra,
} from "@chakra-ui/react";

import { useTable, useSortBy, Column } from "react-table";
import React from "react";
import Card from "../../common/Card";

const DynamicEntities = () => {
    return (
        <Card width={900} height={600}>
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
                <Table />
            </Flex>
        </Card>
    );
};

export default DynamicEntities;

const Table = () => {
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
                ],
            },
            {
                entityName: "Car",
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
                ],
            },
        ],
        []
    );

    const columns = React.useMemo<Column<Data>[]>(
        () => [
            {
                Header: "Name",
                accessor: "entityName",
            },
            {
                Header: "Propertyes",
                accessor: "properties",
                Cell: ({ value }) => <span>{value[0].propertyName}</span>,
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: { expanded },
    } = useTable({ columns, data }, useSortBy);

    return (
        <ChakraTable {...getTableProps()}>
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
                        <Tr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                                <Td {...cell.getCellProps()}>
                                    {cell.render("Cell")}
                                </Td>
                            ))}
                        </Tr>
                    );
                })}
            </Tbody>
        </ChakraTable>
    );
};
