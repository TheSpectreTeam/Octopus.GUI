import React from "react";
import { useMemo } from "react";
import {
    Column,
    Hooks,
    Row,
    useExpanded,
    useSortBy,
    useTable,
} from "react-table";
import { DynamicEntitiesData } from "../..";
import { useSetSelectedState } from "../../context";
import { useDelete } from "../../mutations";
import { renderActionButtons, renderCell, renderExpandIcon } from "./helpers";
import TableLayout from "./TableLayout";

type TableInstanceProps = {
    tableData: Array<DynamicEntitiesData>;
};

const TableInstance: React.FC<TableInstanceProps> = ({ tableData }) => {
    const { handleSelect, handleOpen } = useSetSelectedState();

    const mutation = useDelete();

    const handleDelete = React.useCallback((id: string) => {
        mutation.mutate(id);
    }, []);

    const handleEdited = React.useCallback((id: string) => {
        handleSelect(id);
        handleOpen();
    }, []);

    const [columns, data] = useMemo(() => {
        const columns: Array<Column> = [
            {
                Header: () => null,
                id: "expander",
                Cell: ({ row }: { row: Row }) => renderExpandIcon(row),
                width: 50,
                minWidth: 50,
                maxWidth: 50,
            },
            {
                id: "entityName",
                Header: "Name",
                accessor: "entityName",
                width: 200,
            },
            {
                id: "properties",
                Header: "Propertyes",
                accessor: "properties",
                width: 60,
                Cell: ({ value }) => renderCell(value),
            },
        ];
        return [columns, tableData];
    }, [tableData]);

    const tableHooks = React.useCallback((hooks: Hooks) => {
        hooks.visibleColumns.push(() => [
            ...columns,
            {
                id: "Actions",
                Header: "Actions",
                Cell: ({ row }: { row: Row }) =>
                    renderActionButtons(row, handleDelete, handleEdited),
            },
        ]);
    }, []);

    const tableInstance = useTable(
        { columns, data },
        useSortBy,
        useExpanded,
        tableHooks
    );

    return <TableLayout {...tableInstance} />;
};

export default TableInstance;
