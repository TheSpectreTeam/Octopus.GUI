import React, { useEffect, useRef } from "react";
import {
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    ModalContent,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@chakra-ui/react";
import { useFieldArray, useForm } from "react-hook-form";

import AlertCloseDialog from "../AlertCloseDialog";
import BodyContent from "./BodyContent";

import { DynamicEntitiesData } from "../..";

import { useAdd } from "../../mutations";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const ActionModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const mutation = useAdd();

    useEffect(() => {
        if (mutation.isSuccess) {
            onClose();
            mutation.reset();
            reset();
        }
    }, [mutation]);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<DynamicEntitiesData>({
        defaultValues: {
            properties: [
                {
                    propertyName: "",
                    systemTypeName: "",
                    dynamicEntityDataBaseProperty: {
                        comment: "",
                        dataBaseTypeName: "Int",
                        isKey: false,
                        isNotNull: false,
                        length: 25,
                    },
                },
            ],
            entityName: "",
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "properties",
    });

    const backButtonRef = useRef(null);
    const initialRef = useRef(null);
    const {
        isOpen: isAlertOpen,
        onOpen: onAlertOpen,
        onClose: onAlertClose,
    } = useDisclosure();

    const onModalClose = () => {
        onAlertOpen();
    };
    const onAlertDialogClose = React.useCallback(() => {
        onAlertClose();
    }, []);
    const onAlertDialogConfirm = React.useCallback(() => {
        onClose();
        onAlertClose();
    }, []);

    const handleSendData = (data: DynamicEntitiesData) => {
        mutation.mutate(data);
    };

    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                scrollBehavior="outside"
                closeOnOverlayClick={false}
                blockScrollOnMount={false}
                isOpen={isOpen}
                onClose={onModalClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={handleSubmit(handleSendData)}>
                        <ModalHeader>Add new Entity </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <BodyContent
                                ref={initialRef}
                                control={control}
                                errors={errors}
                                remove={remove}
                                fields={fields}
                                append={append}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                colorScheme="blue"
                                isLoading={mutation.isLoading}
                                type="submit"
                                mr={3}
                            >
                                Save
                            </Button>
                            <Button onClick={onModalClose} variant="ghost">
                                Close
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
            <AlertCloseDialog
                leastRef={backButtonRef}
                isOpen={isAlertOpen}
                onCancel={onAlertDialogClose}
                onClose={onAlertClose}
                onConfirm={onAlertDialogConfirm}
            />
        </>
    );
};

export default ActionModal;
