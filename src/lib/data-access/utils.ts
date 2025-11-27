import type { DalError } from "./types";

/**
 * The function `getErrorMessage` takes a `DalError` object and returns a corresponding error message based on the error type.
 */
export function getErrorMessage(error: DalError) {
  const type = error.type;

  switch (error.type) {
    case "no-user":
      return "You must be logged in to perform this action.";
    case "no-access":
      return "You do not have permission to perform this action.";
    case "drizzle-error":
      return "A database error occurred.";
    case "unknown-error":
      return "An unknown error occurred.";
    case "conflict":
      return "A conflict occurred while processing your request.";
    default:
      throw new Error(`Unhandled error type: ${type as never}`);
  }
}
