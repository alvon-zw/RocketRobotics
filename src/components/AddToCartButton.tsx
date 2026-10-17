"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import type { Product } from "@/lib/types";

export default function AddToCartButton({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        add(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }}
      className={`btn-lift px-4 py-2 rounded-lg text-white ${added ? "bg-green-600" : "bg-indigo-600 hover:bg-indigo-700"}`}
    >
      {added ? "Added ✓" : "Add to Cart"}
    </button>
  );
}
