import { base } from "@/orpc/base";

export const getOne = base.handler(async () => {
  await new Promise((resolve) => setTimeout(resolve, 3_000));
  return false;
});
