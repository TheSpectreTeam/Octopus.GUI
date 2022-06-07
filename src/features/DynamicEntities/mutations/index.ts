import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

import { DynamicEntitiesData } from "..";
import { useToastHook } from "../../../common/Toast";

export const useAdd = () => {
    const [_, newToast] = useToastHook();
    const queryClient = useQueryClient();
    return useMutation(
        (data: DynamicEntitiesData) => {
            return axios.post("http://localhost:3004/de", data);
        },
        {
            onSuccess: (entity) => {
                queryClient.invalidateQueries("dynamic-entities");
                newToast({
                    title: "Entity success added!",
                    message: `${JSON.stringify(entity.data, null, 2)}`,
                    status: "success",
                });
            },
        }
    );
};
export const useDelete = () => {
    const [_, newToast] = useToastHook();
    const queryClient = useQueryClient();
    return useMutation(
        (id: string) =>
            axios.delete(`http://localhost:3004/de/${id}`).catch((error) => {
                throw new Error(error);
            }),
        {
            onSuccess: (entity) => {
                queryClient.invalidateQueries("dynamic-entities");
                newToast({
                    title: "Entity success deleted!",
                    message: `${JSON.stringify(entity, null, 2)}`,
                    status: "info",
                });
            },
            onError: (error) => {
                newToast({
                    title: "Entity deleted error!",
                    message: `${error}`,
                    status: "error",
                });
            },
        }
    );
};

export const useUpdate = () => {
    const [_, newToast] = useToastHook();
    const queryClient = useQueryClient();

    return useMutation(
        (params: { id: string; data: DynamicEntitiesData }): any => {
            const { id, data } = params;
            return axios
                .patch(`http://localhost:3004/de/${id}`, data)
                .catch((error) => {
                    throw new Error(error?.message);
                });
        },
        {
            onSuccess: (entity: DynamicEntitiesData) => {
                queryClient.invalidateQueries("dynamic-entities");
                queryClient.setQueryData(["entity", entity.entityName], entity);
                newToast({
                    title: "Entity success updated!",
                    message: `${JSON.stringify(entity, null, 2)}`,
                    status: "info",
                });
            },

            onError: (error) => {
                newToast({
                    title: "Entity updated error!",
                    message: `${error}`,
                    status: "error",
                });
            },
        }
    );
};
