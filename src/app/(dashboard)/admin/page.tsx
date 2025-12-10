import { Suspense } from "react";
import type { Metadata } from "next";

import type { SearchParams } from "nuqs/server";

import { Container } from "@/components/container";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { getValidFilters } from "@/lib/data-table/utils";
import { getStoreApplications } from "@/modules/admin/server/queries";
import { StoreApplicationsTable } from "@/modules/admin/tables/store-applications-table";

import { searchParamsCache } from "./_lib/validations";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function (props: Props) {
  const searchParams = await props.searchParams;
  const search = searchParamsCache.parse(searchParams);
  const validFilters = getValidFilters(search.filters);

  const promises = Promise.all([
    getStoreApplications({
      ...search,
      filters: validFilters,
    }),
  ]);

  return (
    <Container>
      <Suspense
        fallback={
          <DataTableSkeleton columnCount={6} filterCount={2} shrinkZero />
        }
      >
        <StoreApplicationsTable promises={promises} />
      </Suspense>
    </Container>
  );
}
