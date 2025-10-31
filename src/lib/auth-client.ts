import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { env } from "@/env";
import { ac, admin, seller, user } from "@/lib/permissions";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BASE_URL,
  plugins: [
    adminClient({
      ac,
      roles: {
        user,
        seller,
        admin,
      },
    }),
  ],
});
