/** biome-ignore-all lint/suspicious/useAwait: _ */

"use server";

import { db } from "@/db";
import { stores } from "@/db/schema";
import { env } from "@/env";
import { executeDbOperation, executeWithAuth } from "@/lib/data-access/helpers";
import { createErrorReturn } from "@/lib/data-access/types";
import { encrypt } from "@/lib/encryption";

import type { StoreSetupSchema } from "../schema/store-setup-schema";

export async function createStore(values: StoreSetupSchema) {
  return executeWithAuth(
    async ({ user }) => {
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

      return executeDbOperation(async () => {
        await db.insert(stores).values({
          ...values,
          userId: user.id,
          accountNumber: encrypt(values.accountNumber, env.BETTER_AUTH_SECRET),
          ifsc: encrypt(values.ifsc, env.BETTER_AUTH_SECRET),
          pan: encrypt(values.pan, env.BETTER_AUTH_SECRET),
          gst: values.gst ? encrypt(values.gst, env.BETTER_AUTH_SECRET) : null,
        });
      });
    },
    { allowedRoles: ["USER"] },
  );
}
