import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSafeRedirect(
  searchParams: URLSearchParams,
  fallback = "/",
  key = "redirect",
) {
  const redirect = searchParams.get(key);

  if (!redirect) return fallback;
  if (!/^\/(?!\/)/.test(redirect)) return fallback;

  return redirect;
}
