import { os } from "@orpc/server";

import { db } from "@/db";
import { tryCatch } from "@/lib/try-catch";

export const getMany = os.handler(async () => {
  const categories = await tryCatch(
    db.query.categories.findMany({
      with: { subcategories: { columns: { categoryId: false } } },
    }),
  );

  if (categories.error) return [];

  return categories.data;
});
