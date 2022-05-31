import {
    Button,
    IconButton,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    useDisclosure,
    PopoverCloseButton,
    ButtonGroup,
    PopoverFooter,
    Box,
    useColorModeValue,
    type ComponentWithAs,
    type IconProps,
} from "@chakra-ui/react";
import React from "react";
import HoverIcon from "../../../../common/HoverIcon";

type ConfirmPopoverProps = {
    onConfirm: ()=>void;
    onCancel?: () => void;
    targetIcon: ComponentWithAs<"svg", IconProps>;
    description?: string;
    title?: string;
    cancelText?: string;
    confirmText?: string;
};

const ConfirmPopover: React.FC<ConfirmPopoverProps> = ({
    onConfirm,
    onCancel,
    targetIcon,
    description,
    title,
    cancelText,
    confirmText,
}) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };
    return (
        <Box>
            <Popover
                returnFocusOnClose={false}
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
                placement="auto"
                closeOnBlur={true}
            >
                <PopoverTrigger>
                    <IconButton
                        className="hovered-icon-btn"
                        size="md"
                        variant="ghost"
                        aria-label="delete-entity"
                        icon={
                            <HoverIcon
                                icon={targetIcon}
                                lightColor="gray.300"
                                darkColor="gray.500"
                                hoverColor="red.300"
                            />
                        }
                    />
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverHeader fontWeight="semibold">
                        {title || "Confirmation"}
                    </PopoverHeader>
                    <PopoverArrow
                        bg={useColorModeValue("grey.100", "grey.800")}
                    />
                    <PopoverCloseButton />
                    <PopoverBody>
                        {description ||
                            "Are you sure you want to continue with your action?"}
                    </PopoverBody>
                    <PopoverFooter display="flex" justifyContent="flex-end">
                        <ButtonGroup size="sm">
                            <Button
                                variant="outline"
                                onClick={onCancel || onClose}
                            >
                                {cancelText || "Cancel"}
                            </Button>
                            <Button colorScheme="red" onClick={handleConfirm}>
                                {confirmText || " Apply"}
                            </Button>
                        </ButtonGroup>
                    </PopoverFooter>
                </PopoverContent>
            </Popover>
        </Box>
    );
};

export default ConfirmPopover;
