import { getSession } from "@/lib/auth-helpers";
import { base } from "@/orpc/base";

export const me = base.handler(async ({ errors }) => {
  const { data: session } = await getSession();

  if (!session) {
    throw errors.UNAUTHORIZED();
  }

  return session.user;
});
