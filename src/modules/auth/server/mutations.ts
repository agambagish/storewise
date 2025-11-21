"use server";

import { revalidatePath } from "next/cache";

// biome-ignore lint/suspicious/useAwait: _
export async function revalidate(path: string) {
  revalidatePath(path);
}
