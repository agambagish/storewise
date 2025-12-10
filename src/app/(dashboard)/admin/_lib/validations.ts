import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
} from "nuqs/server";

import type { StoreApplication } from "@/db/schema/store-applications";
import { storeApplications } from "@/db/schema/store-applications";
import {
  getFiltersStateParser,
  getSortingStateParser,
} from "@/lib/data-table/parsers";

export const searchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: getSortingStateParser<StoreApplication>().withDefault([
    { id: "createdAt", desc: true },
  ]),
  name: parseAsString.withDefault(""),
  status: parseAsArrayOf(
    parseAsStringEnum(storeApplications.status.enumValues),
  ).withDefault([]),
  createdAt: parseAsArrayOf(parseAsInteger).withDefault([]),
  filters: getFiltersStateParser().withDefault([]),
  joinOperator: parseAsStringEnum(["and", "or"]).withDefault("and"),
});

export type GetStoreApplicationsSchema = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
