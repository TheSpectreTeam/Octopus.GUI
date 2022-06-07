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
import { AddIcon } from "@chakra-ui/icons";

import Card, {
    CardContent,
    CardHeader,
    CardHeaderActions,
} from "../../common/Card";

import { ActionModal } from "./components";
import TableQuery from "./components/Table";

import { useKeyEvent } from "../../utils/hooks";
import { DynamicEntitiesProvider } from "./context";
import EditModal from "./components/Modal/Edit";

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
    const { isOpen: isOpenAction, onClose, onOpen } = useDisclosure();

    useKeyEvent({
        keyCode: "KeyA",
        pressedKey: "ctrlKey",
        fn: () => onOpen(),
    });

    return (
        <DynamicEntitiesProvider>
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
                    <TableQuery />
                </CardContent>
            </Card>
            <ActionModal isOpen={isOpenAction} onClose={onClose} />
            <EditModal />
        </DynamicEntitiesProvider>
    );
};

export default DynamicEntities;
