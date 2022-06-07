import { ToastPosition, useToast } from "@chakra-ui/react";
import React from "react";

type NewToast = {
    message: string;
    status: "info" | "warning" | "success" | "error" | "loading";
    position?: ToastPosition;
    title: string;
};

export function useToastHook(): [
    NewToast | undefined,
    React.Dispatch<React.SetStateAction<NewToast | undefined>>
] {
    const [state, setState] = React.useState<NewToast>();
    const toast = useToast();

    React.useEffect(() => {
        if (state) {
            const { message, status, position = "top" } = state;

            toast({
                title: status,
                description: message ?? "",
                status: status ?? "error",
                duration: 5_000,
                position,
                isClosable: true,
            });
        }
    }, [state, toast]);

    return [state, setState];
}
