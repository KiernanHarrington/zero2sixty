"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES, PRODUCTS, type Category } from "@/lib/products";
import ProductCard from "./ProductCard";

type Sort = "featured" | "price-asc" | "price-desc" | "rating";

export default function ShopBrowser() {
  const router = useRouter();
  const params = useSearchParams();
  const active = (params.get("c") as Category | null) ?? "all";
  const [sort, setSort] = useState<Sort>("featured");

  function setCategory(c: Category | "all") {
    const q = c === "all" ? "/shop" : `/shop?c=${c}`;
    router.push(q, { scroll: false });
  }

  const list = useMemo(() => {
    const base =
      active === "all"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === active);
    const sorted = [...base];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [active, sort]);

  const activeLabel =
    active === "all"
      ? "All Hardware"
      : CATEGORIES.find((c) => c.id === active)?.label ?? "Shop";

  return (
    <div className="mx-auto max-w-7xl px-5 py-14">
      <header className="mb-10">
        <p className="kicker">The Arsenal</p>
        <h1 className="headline text-5xl sm:text-6xl mt-3">{activeLabel}</h1>
        <p className="mt-3 text-muted">
          {list.length} product{list.length === 1 ? "" : "s"} ready to bolt on.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10">
        <div className="flex flex-wrap gap-2">
          <Chip on={active === "all"} onClick={() => setCategory("all")}>
            All
          </Chip>
          {CATEGORIES.map((c) => (
            <Chip
              key={c.id}
              on={active === c.id}
              onClick={() => setCategory(c.id)}
            >
              {c.label}
            </Chip>
          ))}
        </div>

        <label className="flex items-center gap-3 text-sm">
          <span className="text-muted uppercase tracking-widest text-xs">
            Sort
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="field !py-2 !w-auto cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
            <option value="rating">Top Rated</option>
          </select>
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}

function Chip({
  on,
  onClick,
  children,
}: {
  on: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border transition-colors ${
        on
          ? "bg-blue text-white border-blue glow"
          : "border-line text-muted hover:border-blue-bright hover:text-fg"
      }`}
    >
      {children}
    </button>
  );
}
