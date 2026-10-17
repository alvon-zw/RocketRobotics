import type { CartItem } from "./types";

const KEY = "rr_cart";
const listeners = new Set<() => void>();

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

/** Raw JSON string; a primitive so useSyncExternalStore sees stable snapshots. */
export function getSnapshot(): string {
  try {
    return localStorage.getItem(KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

export const getServerSnapshot = (): string => "[]";

export function parseCart(raw: string): CartItem[] {
  try {
    const data: unknown = JSON.parse(raw);
    return Array.isArray(data) ? (data as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function writeCart(items: CartItem[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // Storage unavailable (private mode / quota); cart simply won't persist.
  }
  listeners.forEach((l) => l());
}
