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
    const recentApplication = await db.query.storeApplications.findFirst({
      where: (storeApplications, { eq }) =>
        eq(storeApplications.userId, user.id),
      orderBy: (storeApplications, { desc }) =>
        desc(storeApplications.submittedAt),
      columns: { status: true },
    });

    const status = recentApplication?.status;

    return status === "PENDING"
      ? createErrorReturn({ type: "conflict" })
      : status === "APPROVED"
        ? redirect("/dashboard")
        : createSuccessReturn("ok");
  });
}
