import React from "react";
import {
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useDisclosure,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { Column } from "react-table";
import { AddIcon } from "@chakra-ui/icons";

import Card, {
    CardContent,
    CardHeader,
    CardHeaderActions,
} from "../../common/Card";

import { ActionModal, Skeleton, ExpandTable } from "./components";
import { useGetDynamicEntities } from "./querys";
import { useDelete } from "./mutations";
import {
    renderActionButtons,
    renderCell,
    renderExpandIcon,
} from "./components/ExpandTable/helpers";
import { useKeyEvent } from "../../utils/hooks";

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
const DynamicEntitiesContext = React.createContext({});
DynamicEntitiesContext.displayName = "DynamicEntitiesCntext";
const DynamicEntitiesProvider = DynamicEntitiesContext.Provider;

const DynamicEntities = () => {
    const { isOpen: isOpenAction, onClose, onOpen } = useDisclosure();

    const { data, isLoading } = useGetDynamicEntities();

    const mutation = useDelete();
    useKeyEvent({
        keyCode: "KeyA",
        pressedKey: "ctrlKey",
        fn: () => onOpen(),
    });

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
                Cell: ({ row }: any) => renderExpandIcon(row),
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
                Cell: ({ value }: any) => renderCell(value),
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
                Cell: ({ row }: any) => renderActionButtons(row, handleDelete),
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