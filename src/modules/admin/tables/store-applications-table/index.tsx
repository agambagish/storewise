"use client";
"use no memo";

import { use, useMemo, useState } from "react";

import { DataTable } from "@/components/data-table";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import type { StoreApplication } from "@/db/schema/store-applications";
import { useDataTable } from "@/hooks/use-data-table";
import type { DataTableRowAction } from "@/types/data-table";

import type { getStoreApplications } from "../../server/queries";
import { StoreApplicationsTableActionBar } from "./action-bar";
import { getStoreApplicationsTableColumns } from "./columns";

interface Props {
  promises: Promise<[Awaited<ReturnType<typeof getStoreApplications>>]>;
}

export type StoreApplicationsTableAction = DataTableRowAction<
  StoreApplication,
  "view" | "approve" | "reject"
>;

export function StoreApplicationsTable({ promises }: Props) {
  const [{ data, pageCount }] = use(promises);

  const [rowAction, setRowAction] =
    useState<StoreApplicationsTableAction | null>(null);

  const columns = useMemo(
    () => getStoreApplicationsTableColumns({ setRowAction }),
    [],
  );

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    initialState: {
      sorting: [{ id: "createdAt", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (originalRow) => originalRow.id.toString(),
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <DataTable
      table={table}
      actionBar={<StoreApplicationsTableActionBar table={table} />}
    >
      <DataTableToolbar table={table}>
        <DataTableSortList table={table} align="end" />
      </DataTableToolbar>
    </DataTable>
  );
}
