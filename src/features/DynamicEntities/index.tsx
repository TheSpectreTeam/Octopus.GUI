import React from "react";
import {
    Flex,
    Heading,
    IconButton,
    Button,
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useDisclosure,
    Skeleton as ChakraSkeleton,
    Tag,
} from "@chakra-ui/react";
import {
    BsDashSquareDotted,
    BsFillTrashFill,
    BsPlusSquareDotted,
    BsThreeDots,
} from "react-icons/bs";
import { Column } from "react-table";
import { AddIcon } from "@chakra-ui/icons";

import Card from "../../common/Card";
import ExpandTable from "./ExpandTable";

import ActionModal from "./Modal";
import { useGetDynamicEntities } from "./querys";
import Skeleton from "./Skeleton";
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
    const [isEdit, setIsEdit] = React.useState<boolean>(false);
    const [selectedData, setSelectedData] = React.useState(null);

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

    const tableData: DynamicEntitiesData[] = React.useMemo(
        (): DynamicEntitiesData[] => data,
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
                    <Flex gap={3}>
                        <Button
                            onClick={()=>console.log(row.original)}
                        >
                            Edit
                        </Button>
                        <IconButton
                            aria-label="delete-entity"
                            icon={<BsFillTrashFill />}
                            onClick={() => {
                                mutation.mutate(row?.original?.id);
                            }}
                        />
                    </Flex>
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
                <Flex
                    width={"100%"}
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent="space-between"
                >
                    <Flex>
                        <ChakraSkeleton isLoaded={!isLoading}>
                            <Heading as="h2" size="sm">
                                Dynaminc entities
                            </Heading>
                        </ChakraSkeleton>
                    </Flex>
                    <Flex gap={3}>
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
                    </Flex>
                </Flex>
                <Flex width={"100%"}>
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
                </Flex>
            </Card>
            <ActionModal isOpen={isOpenAction} onClose={onClose} />
        </>
    );
};

export default DynamicEntities;
