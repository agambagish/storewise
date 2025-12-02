/** biome-ignore-all lint/suspicious/useAwait: _ */

"use server";

import { redirect } from "next/navigation";

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
      columns: { status: true },
    });

    if (store !== undefined) {
      if (store.status !== "PENDING") {
        redirect("/dashboard");
      } else {
        return createErrorReturn({ type: "conflict" });
      }
    }

    return createSuccessReturn("ok");
  });
}
