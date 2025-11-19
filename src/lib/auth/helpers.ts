import { headers } from "next/headers";

import type { UserRole } from "@/db/schema/users";
import { auth } from "@/lib/auth";

export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;

  return {
    ...session.user,
    role: session.user.role as UserRole,
  };
}
