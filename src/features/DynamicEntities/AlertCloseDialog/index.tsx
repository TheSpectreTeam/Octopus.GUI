import React from "react";

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from "@chakra-ui/react";

type AlertDialog = {
    onClose: () => void;
    isOpen: boolean;
    leastRef: any;
    onConfirm: () => void;
    onCancel: () => void;
};

const AlertCloseDialog: React.FC<AlertDialog> = ({
    onClose,
    isOpen,
    leastRef,
    onConfirm,
    onCancel,
}) => {
    return (
        <AlertDialog
            motionPreset="slideInBottom"
            onClose={onClose}
            isOpen={isOpen}
            leastDestructiveRef={leastRef}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Are you sure you want to discard all of your data?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button onClick={onCancel}>No</Button>
                        <Button colorScheme="red" onClick={onConfirm} ml={3}>
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default AlertCloseDialog;
