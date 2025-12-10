"use client";

import { useCallback } from "react";

import type { Table } from "@tanstack/react-table";
import { ClipboardCheck, ClipboardX, XCircle } from "lucide-react";

import {
  ActionBar,
  ActionBarClose,
  ActionBarGroup,
  ActionBarItem,
  ActionBarSelection,
  ActionBarSeparator,
} from "@/components/ui/action-bar";
import type { StoreApplication } from "@/db/schema/store-applications";

interface Props {
  table: Table<StoreApplication>;
}

export function StoreApplicationsTableActionBar({ table }: Props) {
  const rows = table.getFilteredSelectedRowModel().rows;

  const onOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        table.toggleAllRowsSelected(false);
      }
    },
    [table],
  );

  //   const onReject = useCallback(() => {
  //     (async () => {
  //       const { error } = await deleteTasks({
  //         ids: rows.map((row) => row.original.id),
  //       });

  //       if (error) {
  //         toast.error(error);
  //         return;
  //       }
  //       table.toggleAllRowsSelected(false);
  //     })();
  //   }, [rows, table]);

  return (
    <ActionBar open={rows.length > 0} onOpenChange={onOpenChange}>
      <ActionBarSelection>
        <span className="font-medium">{rows.length}</span>
        selected
        <ActionBarSeparator />
        <ActionBarClose>
          <XCircle />
        </ActionBarClose>
      </ActionBarSelection>
      <ActionBarSeparator />
      <ActionBarGroup>
        <ActionBarItem /*onClick={onApprove}*/>
          <ClipboardCheck />
          Approve ({rows.length})
        </ActionBarItem>
        <ActionBarItem variant="destructive" /*onClick={onReject}*/>
          <ClipboardX />
          Reject ({rows.length})
        </ActionBarItem>
      </ActionBarGroup>
    </ActionBar>
  );
}
