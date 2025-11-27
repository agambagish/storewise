/** biome-ignore-all lint/suspicious/useAwait: _ */

"use server";

import { db } from "@/db";
import { executeWithAuth } from "@/lib/data-access/helpers";
import {
  createErrorReturn,
  createSuccessReturn,
} from "@/lib/data-access/types";

export async function getCurrentStore() {
  return executeWithAuth(async ({ user }) => {
    const store = await db.query.stores.findFirst({
      where: (stores, { eq }) => eq(stores.userId, user.id),
      columns: { id: true },
    });

    if (store !== undefined) {
      return createErrorReturn({
        type: "unknown-error",
        error: "conflict",
      });
    }

    return createSuccessReturn("ok");
  });
}
