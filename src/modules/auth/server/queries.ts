/** biome-ignore-all lint/suspicious/useAwait: _ */

"use server";

import { executeWithAuth } from "@/lib/data-access/helpers";
import { createSuccessReturn } from "@/lib/data-access/types";

export async function getUser() {
  return executeWithAuth(async (user) => createSuccessReturn(user));
}
