import { EditIcon } from "@chakra-ui/icons";
import {
    ButtonGroup,
    chakra,
    Flex,
    Icon,
    IconButton,
    Tag,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { BsDashSquareDotted, BsPlusSquareDotted } from "react-icons/bs";
import { TrashIcon } from "../../../../assets";
import HoverIcon from "../../../../common/HoverIcon";
import ConfirmPopover from "../ConfirmPopover";

const TdMotion = motion(chakra.td);
const TrMotion = motion(chakra.tr);
const ThMotion = motion(chakra.th);
const TheadMotion = motion(chakra.thead);
const TbodyMotion = motion(chakra.tbody);
const MotionComponent = motion(chakra.div);

export {
    TdMotion,
    TrMotion,
    ThMotion,
    TheadMotion,
    TbodyMotion,
    MotionComponent,
};

export const renderExpandIcon = (row: any) => {
    return (
        <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? (
                <Icon as={BsDashSquareDotted} />
            ) : (
                <Icon as={BsPlusSquareDotted} />
            )}
        </span>
    );
};

export const renderCell = (value: any) => {
    return (
        <Flex gap={2}>
            {value.map((item: any, index: number) => (
                <Tag colorScheme={"blue"} key={index}>
                    {item.propertyName}
                </Tag>
            ))}
        </Flex>
    );
};

export const renderActionButtons = (row: any,handleDelete:any,handleEdit:any) => { 
    return (
        <ButtonGroup gap={3}>
            <IconButton
                variant="ghost"
                aria-label="edit-entity"
                className="hovered-icon-btn"
                onClick={()=>handleEdit(row?.original)}
                icon={<HoverIcon icon={EditIcon} hoverColor="blue.400" />}
            />
            <ConfirmPopover
                onConfirm={() => handleDelete(row?.original?.id)}
                targetIcon={TrashIcon}
            />
        </ButtonGroup>
    );
};
