import React, { useRef } from "react";
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

import { DynamicEntitiesData } from "..";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const ActionModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const {
        control,
        handleSubmit,
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

    const handleSendData=(data:DynamicEntitiesData)=>{
        //TODO: replace to mock data send
        console.log(data)
    }

    return (
        <>
            <Modal
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
                                control={control}
                                errors={errors}
                                remove={remove}
                                fields={fields}
                                append={append}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" type="submit" mr={3}>
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
