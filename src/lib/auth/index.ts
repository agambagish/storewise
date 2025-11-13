import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

import { db } from "@/db";

export const auth = betterAuth({
  rateLimit: { enabled: false },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 1,
    },
  },
  plugins: [nextCookies()],
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  logger: { disabled: true },
  advanced: {
    cookiePrefix: "storewise",
  },
});
