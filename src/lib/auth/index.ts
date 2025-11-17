import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

import { db } from "@/db";
import {
  generateResetPasswordEmail,
  generateVerifyEmail,
  sendEmail,
} from "@/lib/email";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password on Storewise",
        text: generateResetPasswordEmail({
          name: user.name,
          url,
        }),
      });
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email on Storewise",
        text: generateVerifyEmail({
          name: user.name,
          url,
        }),
      });
    },
  },
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
