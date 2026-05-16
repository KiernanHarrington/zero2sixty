import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, PRODUCTS, CATEGORIES } from "@/lib/products";
import { money } from "@/lib/format";
import RotorArt from "@/components/RotorArt";
import ProductBuy from "@/components/ProductBuy";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProduct(slug);
  return {
    title: p ? `${p.name} — Zero2Sixty` : "Not found — Zero2Sixty",
    description: p?.tagline,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const categoryLabel =
    CATEGORIES.find((c) => c.id === product.category)?.label ?? "Shop";
  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  ).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <nav className="text-xs uppercase tracking-widest text-muted mb-8 flex gap-2">
        <Link href="/" className="hover:text-fg">Home</Link>
        <span>/</span>
        <Link href={`/shop?c=${product.category}`} className="hover:text-fg">
          {categoryLabel}
        </Link>
        <span>/</span>
        <span className="text-fg">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* visual */}
        <div className="relative panel cut-corner aspect-square grid place-items-center overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute inset-0 radial-fade" />
          {product.badge && (
            <span className="absolute top-5 left-5 skew-tag bg-blue text-white text-xs font-bold tracking-widest px-4 py-1.5">
              <span>{product.badge}</span>
            </span>
          )}
          <RotorArt className="relative w-[80%] h-[80%]" spin glow />
        </div>

        {/* info */}
        <div>
          <p className="kicker">{categoryLabel}</p>
          <h1 className="headline text-4xl sm:text-6xl mt-3">{product.name}</h1>
          <p className="mt-3 text-lg text-muted">{product.tagline}</p>

          <div className="mt-5 flex items-center gap-3 text-sm">
            <span className="text-cyan text-base">★★★★★</span>
            <span className="font-semibold">{product.rating}</span>
            <span className="text-muted">·</span>
            <span className="text-muted">{product.reviews} reviews</span>
            <span className="text-muted">·</span>
            <span className={product.stock > 0 ? "text-cyan" : "text-danger"}>
              {product.stock > 0 ? "In stock" : "Backorder"}
            </span>
          </div>

          <div className="mt-7 flex items-end gap-4">
            <span className="font-display text-5xl text-glow">
              {money(product.price)}
            </span>
            {product.compareAt && (
              <span className="text-lg text-muted line-through mb-1">
                {money(product.compareAt)}
              </span>
            )}
          </div>

          <div className="mt-7">
            <ProductBuy
              slug={product.slug}
              name={product.name}
              price={product.price}
            />
            <p className="mt-3 text-xs text-muted">
              Free fitment verification · Ships in 1–2 business days
            </p>
          </div>

          <p className="mt-8 leading-relaxed text-muted">
            {product.description}
          </p>

          {/* specs */}
          <div className="mt-8 grid grid-cols-2 gap-px bg-line border border-line">
            {product.spec.map((s) => (
              <div key={s.label} className="bg-panel p-4">
                <div className="text-xs uppercase tracking-widest text-muted">
                  {s.label}
                </div>
                <div className="font-display text-lg mt-1">{s.value}</div>
              </div>
            ))}
          </div>

          {/* features */}
          <ul className="mt-8 space-y-3">
            {product.features.map((f) => (
              <li key={f} className="flex gap-3 text-sm">
                <span className="mt-1.5 w-2 h-2 bg-blue rotate-45 shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 panel p-4 text-sm">
            <span className="text-muted uppercase tracking-widest text-xs">
              Fitment
            </span>
            <p className="mt-1">{product.fitment}</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="headline text-3xl sm:text-4xl mb-8">
            Pairs Well With
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
