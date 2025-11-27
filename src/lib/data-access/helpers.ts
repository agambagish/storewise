import { headers } from "next/headers";
import { redirect } from "next/navigation";

import type { Session } from "better-auth";
import { DrizzleQueryError } from "drizzle-orm";

import type { UserRole } from "@/db/schema/users";
import type { User } from "@/lib/auth";
import { auth } from "@/lib/auth";

import type { DalError, DalReturn } from "./types";
import {
  createErrorReturn,
  createSuccessReturn,
  ThrowableDalError,
} from "./types";

const SIGN_IN_URL = "/sign-in";

/**
 * The function `requireLoginRedirect` checks if a `DalReturn` object indicates a user is not logged in and redirects to a sign-in URL if necessary.
 */
export function requireLoginRedirect<T, E extends DalError>(
  dalReturn: DalReturn<T, E>,
) {
  if (dalReturn.success) return dalReturn;
  if (dalReturn.error.type === "no-user") return redirect(SIGN_IN_URL);

  return dalReturn as DalReturn<T, Exclude<E, { type: "no-user" }>>;
}

/**
 * The function `requireAccessRedirect` redirects to a specified path if there is a "no-access" error in the `DalReturn`.
 */
export function requireAccessRedirect<T, E extends DalError>(
  dalReturn: DalReturn<T, E>,
  redirectPath = "/",
) {
  if (dalReturn.success) return dalReturn;
  if (dalReturn.error.type === "no-access") return redirect(redirectPath);

  return dalReturn as DalReturn<T, Exclude<E, { type: "no-access" }>>;
}

/**
 * The function `throwIfError` checks if a `DalReturn` object contains an error and throws it if present.
 */
export function throwIfError<T, E extends DalError>(
  dalReturn: DalReturn<T, E>,
) {
  if (dalReturn.success) return dalReturn;
  throw dalReturn.error;
}

/**
 * The function `assertSuccess` ensures that a DAL operation is successful and returns the data if successful.
 */
export function assertSuccess<T, E extends DalError>(
  dalReturn: DalReturn<T, E>,
  { noAccessRedirectPath }: { noAccessRedirectPath?: string } = {},
) {
  const res = throwIfError(
    requireAccessRedirect(
      requireLoginRedirect(dalReturn),
      noAccessRedirectPath,
    ),
  );

  return res.data;
}

/**
 * The function `executeWithAuth` executes a given operation with authentication and role-based access control.
 */
export async function executeWithAuth<T, E extends DalError>(
  operation: ({
    user,
    session,
  }: {
    user: User;
    session: Session;
  }) => Promise<DalReturn<T, E>>,
  { allowedRoles }: { allowedRoles?: UserRole[] } = {},
) {
  const data = await auth.api.getSession({
    headers: await headers(),
  });

  const ctx = data && {
    session: data.session,
    user: data.user as User,
  };

  if (ctx === null) {
    return createErrorReturn({ type: "no-user" });
  }

  if (allowedRoles && !allowedRoles.includes(ctx.user.role)) {
    return createErrorReturn({ type: "no-access" });
  }

  return operation({
    user: ctx.user,
    session: ctx.session,
  });
}

/**
 * The function `executeDbOperation` handles asynchronous database operations and returns success or error results based on the operation outcome.
 */
export async function executeDbOperation<T>(operation: () => Promise<T>) {
  try {
    const data = await operation();
    return createSuccessReturn(data);
  } catch (e) {
    if (e instanceof ThrowableDalError) {
      return createErrorReturn(e.dalError);
    }

    if (e instanceof DrizzleQueryError) {
      return createErrorReturn({ type: "drizzle-error", error: e });
    }

    return createErrorReturn({ type: "unknown-error", error: e });
  }
}
