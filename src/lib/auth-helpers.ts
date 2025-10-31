import { headers } from "next/headers";

import { authClient } from "./auth-client";

export async function getSession() {
  return await authClient.getSession({
    fetchOptions: { headers: await headers() },
  });
}
