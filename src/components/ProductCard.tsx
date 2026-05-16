import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { productImage } from "@/lib/products";
import { money } from "@/lib/format";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group panel cut-corner overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-1 hover:[box-shadow:0_24px_60px_-30px_rgba(37,150,190,0.7)]">
      <Link href={`/shop/${product.slug}`} className="relative block">
        <div className="relative aspect-4/3 bg-[#05070b] overflow-hidden">
          <Image
            src={productImage(product)}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#05070b]/70 via-transparent to-transparent" />
        </div>
        {product.badge && (
          <span className="absolute top-3 left-3 skew-tag bg-blue text-white text-[11px] font-bold tracking-widest px-3 py-1">
            <span>{product.badge}</span>
          </span>
        )}
        {product.compareAt && (
          <span className="absolute top-3 right-3 bg-danger/90 text-white text-[11px] font-bold tracking-wider px-2 py-1">
            SAVE {money(product.compareAt - product.price)}
          </span>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <Link href={`/shop/${product.slug}`}>
          <h3 className="font-display text-lg leading-tight group-hover:text-blue-bright transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-muted line-clamp-1">{product.tagline}</p>

        <div className="mt-3 flex items-center gap-1 text-xs text-muted">
          <span className="text-cyan">★</span>
          <span className="text-fg font-semibold">{product.rating}</span>
          <span>({product.reviews})</span>
        </div>

        <div className="mt-auto pt-5 flex items-end justify-between gap-3">
          <div>
            {product.compareAt && (
              <div className="text-xs text-muted line-through">
                {money(product.compareAt)}
              </div>
            )}
            <div className="font-display text-2xl text-glow">
              {money(product.price)}
            </div>
          </div>
          <AddToCartButton
            slug={product.slug}
            name={product.name}
            price={product.price}
            label="Add"
            compact
          />
        </div>
      </div>
    </div>
  );
}
