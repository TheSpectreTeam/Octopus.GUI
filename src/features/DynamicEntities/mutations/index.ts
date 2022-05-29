import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { DynamicEntitiesData } from "..";
import { useToast } from "@chakra-ui/react";

export const useAdd = () => {
    const toast = useToast();
    const queryClient = useQueryClient();
    return useMutation(
        (data: DynamicEntitiesData) => {
            return axios.post("http://localhost:3004/de", data);
        },
        {
            onSuccess: (entity) => {
                queryClient.invalidateQueries("dynamic-entities");
                toast({
                    title: "Entity created!",
                    description: `${JSON.stringify(entity.data, null, 2)}`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
            },
        }
    );
};
export const useDelete = () => {
    const toast = useToast();
    const queryClient = useQueryClient();
    return useMutation(
        (id: string) =>
            axios.delete(`http://localhost:3004/de/${id}`).catch((error) => {
                throw new Error(error);
            }),
        {
            onSuccess: (entity) => {
                queryClient.invalidateQueries("dynamic-entities");
                toast({
                    title: "Entity deleted!",
                    description: `${JSON.stringify(entity, null, 2)}`,
                    status: "info",
                    duration: 5000,
                    isClosable: true,
                });
            },

            onError: (error) => {
                toast({
                    title: "Deleted error!",
                    description: `${error}`,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            },
        }
    );
};
