/** biome-ignore-all lint/suspicious/useAwait: _ */

"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { executeWithAuth } from "@/lib/data-access/helpers";
import { createSuccessReturn } from "@/lib/data-access/types";

export async function getUser() {
  return executeWithAuth(async ({ user }) => createSuccessReturn(user));
}

export async function getSessions() {
  return executeWithAuth(async ({ session: currentSession }) => {
    const allSessions = await auth.api.listSessions({
      headers: await headers(),
    });

    const otherSessions = allSessions.filter((s) => s.id !== currentSession.id);

    return createSuccessReturn({
      currentSession,
      otherSessions,
    });
  });
}
