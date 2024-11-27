import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBrowserEnv(key: string): string | undefined {
  if (typeof window !== "undefined" && window.ENV) {
    return window.ENV?.[key];
  }
  return undefined;
}
