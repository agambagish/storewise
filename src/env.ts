/** biome-ignore-all lint/style/noProcessEnv: _ */

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    RESEND_API_KEY: z.string(),
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  },
  emptyStringAsUndefined: true,
  onValidationError: (issues) => {
    // biome-ignore lint/suspicious/noConsole: _
    console.error(z.prettifyError({ issues }));
    process.exit(1);
  },
  onInvalidAccess: () => {
    throw new Error(
      "❌ Attempted to access a server-side environment variable on the client",
    );
  },
});
