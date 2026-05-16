"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";

type Props = {
  slug: string;
  name: string;
  price: number;
  qty?: number;
  className?: string;
  label?: string;
  compact?: boolean;
};

export default function AddToCartButton({
  slug,
  name,
  price,
  qty = 1,
  className = "",
  label = "Add to Cart",
  compact = false,
}: Props) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  function handle() {
    add({ slug, name, price }, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  return (
    <button
      onClick={handle}
      className={`btn ${added ? "btn-ghost" : "btn-primary"} ${
        compact ? "!px-4 !py-2.5 !text-xs" : ""
      } ${className}`}
      aria-live="polite"
    >
      {added ? "✓ Added" : label}
    </button>
  );
}
