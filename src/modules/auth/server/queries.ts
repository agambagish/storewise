/** biome-ignore-all lint/suspicious/useAwait: _ */

"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { executeWithAuth } from "@/lib/data-access/helpers";
import {
  createErrorReturn,
  createSuccessReturn,
} from "@/lib/data-access/types";

export async function getUser() {
  return executeWithAuth(async (user) => createSuccessReturn(user));
}

export async function getSessions() {
  return executeWithAuth(async () => {
    const [currentSession, allSessions] = await Promise.all([
      auth.api.getSession({
        headers: await headers(),
      }),
      auth.api.listSessions({
        headers: await headers(),
      }),
    ]);

    if (!currentSession) {
      return createErrorReturn({
        type: "no-user",
      });
    }

    const otherSessions = allSessions.filter(
      (s) => s.id !== currentSession.session.id,
    );

    return createSuccessReturn({
      currentSession: currentSession.session,
      otherSessions,
    });
  });
}
