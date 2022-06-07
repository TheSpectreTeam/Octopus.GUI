import { Button } from "@chakra-ui/react";
import React, { memo, useEffect, useState } from "react";
import { Skeleton } from "../";
import { DynamicEntitiesData } from "../..";
import { useGetDynamicEntities } from "../../querys";
import TableInstance from "./TableInstance";

const SKELETON_ROWS = 5;
const SKELETON_COLUMNS = 3;

const TableQuery = () => {
    const { data, isLoading, isError, refetch } = useGetDynamicEntities();
    const [tableData, setTableData] = useState<Array<DynamicEntitiesData>>();

    useEffect(() => {
        setTableData(data);
    }, [data]);

    const handleRefetch = () => {
        refetch(); 
    };

    if (isError) return <Button onClick={handleRefetch}>Try again!</Button>;

    if (isLoading || !tableData)
        return <Skeleton rows={SKELETON_ROWS} columns={SKELETON_COLUMNS} />;

    return <TableInstance tableData={tableData} />;
};

export default memo(TableQuery);
