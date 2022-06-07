import React, { SetStateAction } from "react";

export const DynamicEntitiesContext = React.createContext<any>(null);
export const UpdatesContext = React.createContext<any>(null);

export function useSelectedState() {
    const { selected, open } = React.useContext(DynamicEntitiesContext);

    return { selected, open };
}
export function useSetSelectedState() {
    const { setSelected, setOpen } = React.useContext(UpdatesContext);

    const handleSelect = React.useCallback(
        (id: any) => setSelected(id),
        [setSelected]
    );
    const handleOpen = React.useCallback(() => {
        setOpen((prev: boolean) => !prev);
    }, []);
    const handleClose = React.useCallback(() => {
        setOpen(false);
    }, []);

    return { handleSelect, handleOpen, handleClose };
}

interface ContextProvider {
    children: React.ReactNode;
}

export const DynamicEntitiesProvider: React.FC<ContextProvider> = ({
    children,
}) => {
    const [selected, setSelected] = React.useState({});
    const [open, setOpen] = React.useState(false);

    const value = React.useMemo(
        () => ({
            selected,
            open,
        }),
        [selected, open]
    );

    const updates = React.useMemo(() => ({ setSelected, setOpen }), []);

    return (
        <DynamicEntitiesContext.Provider value={value}>
            <UpdatesContext.Provider value={updates}>
                {children}
            </UpdatesContext.Provider>
        </DynamicEntitiesContext.Provider>
    );
};
