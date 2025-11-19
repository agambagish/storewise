"use server";

import { revalidatePath } from "next/cache";

// biome-ignore lint/suspicious/useAwait: _
export async function revalidateUser() {
  revalidatePath("/account");
}
