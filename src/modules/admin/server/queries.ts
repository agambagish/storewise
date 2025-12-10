"use server";

import { and, asc, count, desc, gte, ilike, inArray, lte } from "drizzle-orm";

import type { GetStoreApplicationsSchema } from "@/app/(dashboard)/admin/_lib/validations";
import { db } from "@/db";
import { storeApplications } from "@/db/schema";
import { filterColumns } from "@/lib/data-table/filter-columns";

export async function getStoreApplications(input: GetStoreApplicationsSchema) {
  try {
    const offset = (input.page - 1) * input.perPage;
    const advancedTable = false;

    const advancedWhere = filterColumns({
      table: storeApplications,
      filters: input.filters,
      joinOperator: input.joinOperator,
    });

    const where = advancedTable
      ? advancedWhere
      : and(
          input.name
            ? ilike(storeApplications.name, `%${input.name}%`)
            : undefined,
          input.status.length > 0
            ? inArray(storeApplications.status, input.status)
            : undefined,
          input.createdAt.length > 0
            ? and(
                input.createdAt[0]
                  ? gte(
                      storeApplications.createdAt,
                      (() => {
                        const date = new Date(input.createdAt[0]);
                        date.setHours(0, 0, 0, 0);
                        return date;
                      })(),
                    )
                  : undefined,
                input.createdAt[1]
                  ? lte(
                      storeApplications.createdAt,
                      (() => {
                        const date = new Date(input.createdAt[1]);
                        date.setHours(23, 59, 59, 999);
                        return date;
                      })(),
                    )
                  : undefined,
              )
            : undefined,
        );

    const orderBy =
      input.sort.length > 0
        ? input.sort.map((item) =>
            item.desc
              ? desc(storeApplications[item.id])
              : asc(storeApplications[item.id]),
          )
        : [asc(storeApplications.createdAt)];

    const { data, total } = await db.transaction(async (tx) => {
      const data = await tx
        .select()
        .from(storeApplications)
        .limit(input.perPage)
        .offset(offset)
        .where(where)
        .orderBy(...orderBy);

      const total = await tx
        .select({
          count: count(),
        })
        .from(storeApplications)
        .where(where)
        .execute()
        .then((res) => res[0]?.count ?? 0);

      return {
        data,
        total,
      };
    });

    const pageCount = Math.ceil(total / input.perPage);
    return { data, pageCount };
  } catch {
    return { data: [], pageCount: 0 };
  }
}
