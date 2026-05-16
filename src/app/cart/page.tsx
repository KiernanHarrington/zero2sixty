"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart";
import { money } from "@/lib/format";
import { getProduct, productImage } from "@/lib/products";
import RotorArt from "@/components/RotorArt";

export default function CartPage() {
  const { lines, subtotal, setQty, remove, clear, count } = useCart();
  const shipping = subtotal > 0 && subtotal < 500 ? 49 : 0;
  const total = subtotal + shipping;

  if (count === 0) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-28 text-center">
        <div className="w-40 h-40 mx-auto opacity-50">
          <RotorArt className="w-full h-full" />
        </div>
        <h1 className="headline text-4xl mt-8">Your cart is empty</h1>
        <p className="mt-3 text-muted">
          Nothing slowing you down yet. Let&apos;s fix that.
        </p>
        <Link href="/shop" className="btn btn-primary mt-8">
          Shop the Arsenal
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-14">
      <h1 className="headline text-5xl sm:text-6xl mb-10">Your Cart</h1>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {lines.map((l) => {
            const product = getProduct(l.slug);
            return (
            <div
              key={l.slug}
              className="panel cut-corner p-4 sm:p-5 flex items-center gap-4 sm:gap-5"
            >
              <Link
                href={`/shop/${l.slug}`}
                className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 overflow-hidden bg-[#05070b]"
              >
                {product ? (
                  <Image
                    src={productImage(product)}
                    alt={l.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : (
                  <RotorArt className="w-full h-full" />
                )}
              </Link>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/shop/${l.slug}`}
                  className="font-display text-lg hover:text-blue-bright transition-colors"
                >
                  {l.name}
                </Link>
                <div className="text-sm text-muted">{money(l.price)} each</div>
                <button
                  onClick={() => remove(l.slug)}
                  className="mt-2 text-xs uppercase tracking-widest text-muted hover:text-danger transition-colors"
                >
                  Remove
                </button>
              </div>
              <div className="flex items-center border border-line">
                <button
                  onClick={() => setQty(l.slug, l.qty - 1)}
                  className="w-9 h-9 grid place-items-center hover:bg-panel-2"
                  aria-label="Decrease"
                >
                  −
                </button>
                <span className="w-9 text-center font-display">{l.qty}</span>
                <button
                  onClick={() => setQty(l.slug, l.qty + 1)}
                  className="w-9 h-9 grid place-items-center hover:bg-panel-2"
                  aria-label="Increase"
                >
                  +
                </button>
              </div>
              <div className="font-display text-lg w-24 text-right hidden sm:block">
                {money(l.price * l.qty)}
              </div>
            </div>
            );
          })}

          <button
            onClick={clear}
            className="text-xs uppercase tracking-widest text-muted hover:text-danger transition-colors"
          >
            Clear cart
          </button>
        </div>

        {/* summary */}
        <aside className="panel cut-corner p-6 h-fit lg:sticky lg:top-24">
          <h2 className="font-display text-2xl mb-5">Order Summary</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd>{money(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Shipping</dt>
              <dd>{shipping === 0 ? "FREE" : money(shipping)}</dd>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-cyan">
                Add {money(500 - subtotal)} for free shipping.
              </p>
            )}
            <div className="border-t border-line pt-3 flex justify-between font-display text-xl">
              <dt>Total</dt>
              <dd className="text-glow">{money(total)}</dd>
            </div>
          </dl>
          <Link href="/checkout" className="btn btn-primary w-full mt-6">
            Checkout
          </Link>
          <Link
            href="/shop"
            className="block text-center mt-3 text-xs uppercase tracking-widest text-muted hover:text-fg"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
