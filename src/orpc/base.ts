import { os } from "@orpc/server";

export const base = os.errors({
  UNAUTHORIZED: {
    message: "You're not signed in",
  },
});
