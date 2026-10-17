"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  getServerSnapshot,
  getSnapshot,
  parseCart,
  subscribe,
  writeCart,
} from "@/lib/cart-store";
import type { CartItem, Product } from "@/lib/types";

interface CartContextValue {
  items: CartItem[];
  count: number;
  add: (product: Product) => void;
  setQuantity: (id: string, quantity: number) => void;
  remove: (id: string) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const items = useMemo(() => parseCart(raw), [raw]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((sum, i) => sum + i.quantity, 0),
      add: (product) => {
        const existing = items.find((i) => i.id === product.id);
        writeCart(
          existing
            ? items.map((i) =>
                i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
              )
            : [
                ...items,
                {
                  id: product.id,
                  name: product.name,
                  price: Number(product.price),
                  quantity: 1,
                  skill_level: product.skill_level,
                },
              ],
        );
      },
      setQuantity: (id, quantity) =>
        writeCart(
          items.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i,
          ),
        ),
      remove: (id) => writeCart(items.filter((i) => i.id !== id)),
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
