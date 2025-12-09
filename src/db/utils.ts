import type { AnyColumn } from "drizzle-orm";
import { not, sql } from "drizzle-orm";

export function takeFirstOrNull<TData>(data: TData[]) {
  return data[0] ?? null;
}

export function takeFirstOrThrow<TData>(data: TData[]) {
  const first = takeFirstOrNull(data);

  if (!first) {
    throw new Error("Item not found");
  }

  return first;
}

export function isEmpty<TColumn extends AnyColumn>(column: TColumn) {
  return sql<boolean>`
    case
      when ${column} is null then true
      when ${column} = '' then true
      when ${column}::text = '[]' then true
      when ${column}::text = '{}' then true
      else false
    end
  `;
}

export function isNotEmpty<TColumn extends AnyColumn>(column: TColumn) {
  return not(isEmpty(column));
}
