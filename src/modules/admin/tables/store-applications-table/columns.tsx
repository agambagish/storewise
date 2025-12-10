import type { ColumnDef } from "@tanstack/react-table";
import type { LucideIcon } from "lucide-react";
import {
  CalendarIcon,
  Circle,
  CircleDashed,
  ClipboardClock,
  Ellipsis,
  SquareCheck,
  Text,
  XCircle,
} from "lucide-react";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type {
  StoreApplication,
  StoreApplicationStatus,
} from "@/db/schema/store-applications";
import { storeApplications } from "@/db/schema/store-applications";
import { formatDate } from "@/lib/utils";

import type { StoreApplicationsTableAction } from ".";

interface Props {
  setRowAction: React.Dispatch<
    React.SetStateAction<StoreApplicationsTableAction | null>
  >;
}

export function getStoreApplicationsTableColumns({
  setRowAction,
}: Props): ColumnDef<StoreApplication>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          className="translate-y-0.5"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          className="translate-y-0.5"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 40,
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="#" />
      ),
      cell: ({ row }) => row.getValue("id"),
      enableSorting: false,
      enableHiding: false,
      size: 60,
    },
    {
      id: "name",
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="Store's Name" />
      ),
      cell: ({ row }) => (
        <div className="truncate font-medium">{row.getValue("name")}</div>
      ),
      meta: {
        label: "Store's Name",
        placeholder: "Search store names...",
        variant: "text",
        icon: Text,
      },
      enableColumnFilter: true,
    },
    {
      id: "status",
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="Status" />
      ),
      cell: ({ cell }) => {
        const status = storeApplications.status.enumValues.find(
          (status) => status === cell.getValue<StoreApplication["status"]>(),
        );

        if (!status) return null;

        const Icon = getStatusIcon(status);

        return (
          <Badge variant="outline" className="py-1 [&>svg]:size-3.5">
            <Icon />
            <span className="capitalize">
              {status.charAt(0) + status.slice(1).toLowerCase()}
            </span>
          </Badge>
        );
      },
      meta: {
        label: "Status",
        variant: "multiSelect",
        options: storeApplications.status.enumValues.map((status) => ({
          label: status.charAt(0) + status.slice(1).toLowerCase(),
          value: status,
          count: 0,
          icon: getStatusIcon(status),
        })),
        icon: CircleDashed,
      },
      enableColumnFilter: true,
    },
    {
      id: "createdAt",
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} label="Submitted At" />
      ),
      cell: ({ cell }) => formatDate(cell.getValue<Date>()),
      meta: {
        label: "Submitted At",
        variant: "dateRange",
        icon: CalendarIcon,
      },
      enableColumnFilter: true,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex p-0 data-[state=open]:bg-muted"
              size="icon-sm"
            >
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem
              onSelect={() => setRowAction({ row, variant: "view" })}
            >
              View Application
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Approve</DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => setRowAction({ row, variant: "reject" })}
            >
              Reject
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
      size: 40,
    },
  ];
}

export function getStatusIcon(status: StoreApplicationStatus) {
  const statusIcons: Record<StoreApplicationStatus, LucideIcon> = {
    PENDING: ClipboardClock,
    APPROVED: SquareCheck,
    REJECTED: XCircle,
  };

  return statusIcons[status] || Circle;
}
