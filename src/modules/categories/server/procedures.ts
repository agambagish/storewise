import { db } from "@/db";
import { tryCatch } from "@/lib/try-catch";
import { base } from "@/orpc/base";

export const getMany = base.handler(async () => {
  const categories = await tryCatch(
    db.query.categories.findMany({
      with: { subcategories: { columns: { categoryId: false } } },
    }),
  );

  if (categories.error) return [];

  return categories.data;
});
