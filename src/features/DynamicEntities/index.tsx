import React from "react";
import {
    Flex,
    Heading,
    IconButton,
    Badge,
    Button,
    Icon,
} from "@chakra-ui/react";
import { BsDashSquareDotted, BsPlusSquareDotted } from "react-icons/bs";
import { Column } from "react-table";

import Card from "../../common/Card";
import ExpandTable from "./ExpandTable";
import { DragHandleIcon } from "@chakra-ui/icons";

export type DynamicEntityDBProperty = {
    dataBaseTypeName: string;
    length: number;
    isNotNull: boolean;
    isKey: boolean;
    comment: string;
};

export type DataProperty = {
    propertyName: string;
    //TODO: union type
    systemTypeName: string;
    valueIndex: number;
    dynamicEntityDataBaseProperty: DynamicEntityDBProperty;
};

export type DynamicEntitiesData = {
    entityName: string;
    properties: Array<DataProperty>;
};

const DynamicEntities = () => {
    const data: DynamicEntitiesData[] = React.useMemo(
        (): DynamicEntitiesData[] => [
            {
                entityName: "People",
                properties: [
                    {
                        propertyName: "ID",
                        valueIndex: 0,
                        systemTypeName: "Int32",
                        dynamicEntityDataBaseProperty: {
                            comment: "text",
                            dataBaseTypeName: "Int",
                            isKey: true,
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
                            dataBaseTypeName: "String",
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
                            dataBaseTypeName: "String",
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
                            dataBaseTypeName: "Int",
                            isKey: true,
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
                            dataBaseTypeName: "Int",
                            isKey: false,
                            isNotNull: false,
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
                            dataBaseTypeName: "Int",
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

    const columns = React.useMemo<Column<DynamicEntitiesData>[]>(
        () => [
            {
                Header: () => null,
                id: "expander",
                Cell: ({ row }: any) => (
                    <span {...row.getToggleRowExpandedProps()}>
                        {row.isExpanded ? (
                            <Icon as={BsDashSquareDotted} />
                        ) : (
                            <Icon as={BsPlusSquareDotted} />
                        )}
                    </span>
                ),
                width: 50,
                minWidth: 50,
                maxWidth: 50,
            },
            {
                id: "entityName",
                Header: "Name",
                accessor: "entityName",
                width: 200,
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

    const tableHooks = (hooks: any) => {
        hooks.visibleColumns.push((column: Column<DynamicEntitiesData>) => [
            ...columns,
            {
                id: "Actions",
                Header: "Actions",
                Cell: ({ value }: any) => <Button size={"xs"}>Edit</Button>,
            },
        ]);
    };

    return (
        <Card
            overflowX={"auto"}
            width={{ base: "100%", md: "60%" }}
            height={"fit-content"}
        >
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
                <ExpandTable
                    data={data}
                    columns={columns}
                    tableHooks={tableHooks}
                />
            </Flex>
        </Card>
    );
};

export default DynamicEntities;
