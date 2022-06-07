import { useQuery } from "react-query";
import axios from "axios";
import { DynamicEntitiesData } from "..";
import { useToastHook } from "../../../common/Toast";

const BASE_URL = "http://localhost:3004/de";

const getDynamicEntities = async (): Promise<Array<DynamicEntitiesData>> => {
    try {
        const res = await axios.get(BASE_URL);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error;
        }
        throw new Error("Unknown Error!");
    }
};

export const useGetDynamicEntities = () => {
    const [, newToast] = useToastHook();
    return useQuery("dynamic-entities", getDynamicEntities, {
        refetchOnWindowFocus: false,
        retry: false,
        onError: (error) => {
            newToast({
                title: "Dynamic entities ",
                message: JSON.stringify(error, null, 2),
                status: "error",
            });
        },
    });
};
