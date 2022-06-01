import React from "react";
import {
    Flex,
    Heading,
    IconButton,
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useDisclosure,
    Skeleton as ChakraSkeleton,
    Tag,
    ButtonGroup,
} from "@chakra-ui/react";
import {
    BsDashSquareDotted,
    BsPlusSquareDotted,
    BsThreeDots,
} from "react-icons/bs";
import { Column } from "react-table";
import { AddIcon } from "@chakra-ui/icons";

import Card, {
    CardContent,
    CardHeader,
    CardHeaderActions,
} from "../../common/Card";
import HoverIcon from "../../common/HoverIcon";

import { EditIcon, TrashIcon } from "../../assets";

import {
    ActionModal,
    Skeleton,
    ConfirmPopover,
    ExpandTable,
} from "./components";
import { useGetDynamicEntities } from "./querys";
import { useDelete } from "./mutations";

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

const SKELETON_ROWS = 5;

const DynamicEntities = () => {
    const { isOpen: isOpenAction, onClose, onOpen } = useDisclosure();

    const { data, isLoading } = useGetDynamicEntities();

    const mutation = useDelete();

    const handleUserKeyPress = React.useCallback((event: KeyboardEvent) => {
        const { code } = event;
        if (event.ctrlKey && code === "KeyA") {
            event.preventDefault();
            onOpen();
        }
    }, []);

    React.useEffect(() => {
        window.addEventListener("keydown", handleUserKeyPress);
        return () => {
            window.removeEventListener("keydown", handleUserKeyPress);
        };
    }, [handleUserKeyPress]);

    const handleDelete = React.useCallback(
        (id: any) => {
            mutation.mutate(id);
        },
        [mutation]
    );

    const tableData: DynamicEntitiesData[] = React.useMemo(
        (): DynamicEntitiesData[] => data ?? null,
        [data]
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
                            <Tag colorScheme={"blue"} key={index}>
                                {item.propertyName}
                            </Tag>
                        ))}
                    </Flex>
                ),
            },
        ],
        []
    );

    const tableHooks = React.useCallback((hooks: any) => {
        hooks.visibleColumns.push((column: Column<DynamicEntitiesData>) => [
            ...columns,
            {
                id: "Actions",
                Header: "Actions",
                Cell: ({ row }: any) => (
                    <ButtonGroup gap={3}>
                        <IconButton
                            variant="ghost"
                            aria-label="edit-entity"
                            className="hovered-icon-btn"
                            icon={
                                <HoverIcon
                                    icon={EditIcon}
                                    hoverColor="blue.400"
                                />
                            }
                        />
                        <ConfirmPopover
                            onConfirm={() => handleDelete(row?.original?.id)}
                            targetIcon={TrashIcon}
                        />
                    </ButtonGroup>
                ),
            },
        ]);
    }, []);

    return (
        <>
            <Card
                overflowX={"auto"}
                width={{ base: "100%", md: "60%" }}
                height={"fit-content"}
            >
                <CardHeader isLoaded={true} title="Dynamic Entities">
                    <CardHeaderActions>
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label="Options"
                                icon={<BsThreeDots />}
                                size="sm"
                                variant={"ghost"}
                            />
                            <MenuList>
                                <MenuItem
                                    icon={<AddIcon />}
                                    onClick={onOpen}
                                    command="CTRL+A"
                                >
                                    New Entity
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </CardHeaderActions>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <Skeleton
                            rows={SKELETON_ROWS}
                            columns={columns.length + 1}
                        />
                    ) : (
                        <ExpandTable
                            data={tableData}
                            columns={columns}
                            tableHooks={tableHooks}
                        />
                    )}
                </CardContent>
            </Card>
            <ActionModal isOpen={isOpenAction} onClose={onClose} />
        </>
    );
};

export default DynamicEntities;
