import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { DynamicEntitiesData } from "..";

export const useAddDynamicEntities = () => {
    const queryClient = useQueryClient();
    return useMutation(
        (data: DynamicEntitiesData) => {
            return axios.post("http://localhost:3004/de", data);
        },
        { onSuccess: () => queryClient.invalidateQueries("dynamic-entities") }
    );
};
