import { useQuery } from "react-query";
import axios from "axios";

const getDynamicEntities = () => axios.get("http://localhost:3004/de");

export const useGetDynamicEntities = () => {
    return useQuery("dynamic-entities", async () => {
        const { data } = await getDynamicEntities();
        return data;
    });
};
