"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart";

export default function ProductBuy({
  slug,
  name,
  price,
}: {
  slug: string;
  name: string;
  price: number;
}) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handle() {
    add({ slug, name, price }, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center border border-line">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="w-11 h-12 grid place-items-center text-xl hover:bg-panel-2 transition-colors"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="w-12 text-center font-display text-lg">{qty}</span>
        <button
          onClick={() => setQty((q) => Math.min(99, q + 1))}
          className="w-11 h-12 grid place-items-center text-xl hover:bg-panel-2 transition-colors"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <button
        onClick={handle}
        className={`btn flex-1 min-w-[200px] ${added ? "btn-ghost" : "btn-primary"}`}
      >
        {added ? "✓ Added to Cart" : "Add to Cart"}
      </button>
    </div>
  );
}
