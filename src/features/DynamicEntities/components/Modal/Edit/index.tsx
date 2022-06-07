import {
    Button,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Modal,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { DynamicEntitiesData } from "../../..";
import { useSelectedState, useSetSelectedState } from "../../../context";
import { useUpdate } from "../../../mutations";

import BodyContent from "../BodyContent";

const EditModal = () => {
    const { open, selected } = useSelectedState();
    const { handleClose } = useSetSelectedState();

    const mutation = useUpdate();

    const initialRef = useRef(null);

    React.useEffect(() => {
        if (mutation.isSuccess) {
            handleClose();
            mutation.reset();
        }
    }, [mutation]);

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors, isDirty },
    } = useForm<DynamicEntitiesData>({
        defaultValues: { properties: [], entityName: "" },
    });

    React.useEffect(() => {
        setValue("entityName", selected?.entityName);
        setValue("properties", selected?.properties);
    }, [selected]);

    const handleUpdate = (id: string, data: DynamicEntitiesData) => {
        mutation.mutate({ id, data });
    };

    const { fields, append, remove } = useFieldArray({
        control,
        name: "properties",
    });

    return (
        <div>
            <Modal
                initialFocusRef={initialRef}
                isOpen={open}
                onClose={handleClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <form
                        onSubmit={handleSubmit((data) =>
                            handleUpdate(selected.id, data)
                        )}
                    >
                        <ModalHeader>Edit selected Entity</ModalHeader>
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
                                type="submit"
                                isLoading={mutation.isLoading}
                                disabled={!isDirty}
                                mr={3}
                            >
                                Save
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default EditModal;
