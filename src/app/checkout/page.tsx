"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { money } from "@/lib/format";

export default function CheckoutPage() {
  const { lines, subtotal, count, clear } = useCart();
  const [done, setDone] = useState(false);
  const [orderId] = useState(
    () => "Z2S-" + Math.random().toString(36).slice(2, 8).toUpperCase()
  );
  const shipping = subtotal > 0 && subtotal < 500 ? 49 : 0;
  const total = subtotal + shipping;

  function placeOrder(e: FormEvent) {
    e.preventDefault();
    setDone(true);
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-28 text-center">
        <div className="w-20 h-20 mx-auto grid place-items-center bg-blue text-white text-4xl cut-corner glow">
          ✓
        </div>
        <h1 className="headline text-4xl sm:text-5xl mt-8">Order Locked In</h1>
        <p className="mt-4 text-muted">
          Confirmation{" "}
          <span className="text-blue-bright font-display">{orderId}</span> is on
          its way to your inbox. Our team will verify fitment before anything
          ships.
        </p>
        <p className="mt-2 text-xs text-muted">
          (Demo store — no payment was processed and no email was sent.)
        </p>
        <div className="mt-9 flex flex-wrap gap-4 justify-center">
          <Link href="/shop" className="btn btn-primary">
            Keep Shopping
          </Link>
          <Link href="/" className="btn btn-ghost">
            Back Home
          </Link>
        </div>
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-28 text-center">
        <h1 className="headline text-4xl">Nothing to check out</h1>
        <p className="mt-3 text-muted">Add some hardware first.</p>
        <Link href="/shop" className="btn btn-primary mt-8">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-14">
      <h1 className="headline text-5xl sm:text-6xl mb-10">Checkout</h1>

      <form onSubmit={placeOrder} className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <fieldset>
            <legend className="kicker mb-5">Contact</legend>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="First name" name="firstName" autoComplete="given-name" />
              <Input label="Last name" name="lastName" autoComplete="family-name" />
              <Input label="Email" name="email" type="email" autoComplete="email" full />
              <Input label="Phone" name="phone" type="tel" autoComplete="tel" full />
            </div>
          </fieldset>

          <fieldset>
            <legend className="kicker mb-5">Shipping Address</legend>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Street address" name="address" autoComplete="street-address" full />
              <Input label="City" name="city" autoComplete="address-level2" />
              <Input label="State / Region" name="state" autoComplete="address-level1" />
              <Input label="ZIP / Postal code" name="zip" autoComplete="postal-code" />
              <Input label="Vehicle (year / make / model)" name="vehicle" full />
            </div>
          </fieldset>

          <fieldset>
            <legend className="kicker mb-5">Payment</legend>
            <div className="panel p-5 text-sm text-muted">
              This is a demo storefront — no real payment is collected. Click
              <span className="text-fg font-semibold"> Place Order </span>
              to simulate a successful purchase.
            </div>
          </fieldset>
        </div>

        <aside className="panel cut-corner p-6 h-fit lg:sticky lg:top-24">
          <h2 className="font-display text-2xl mb-5">Order Summary</h2>
          <ul className="space-y-3 mb-5">
            {lines.map((l) => (
              <li key={l.slug} className="flex justify-between gap-3 text-sm">
                <span className="text-muted">
                  {l.name} <span className="text-fg">×{l.qty}</span>
                </span>
                <span>{money(l.price * l.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="space-y-2 text-sm border-t border-line pt-4">
            <div className="flex justify-between">
              <dt className="text-muted">Subtotal</dt>
              <dd>{money(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Shipping</dt>
              <dd>{shipping === 0 ? "FREE" : money(shipping)}</dd>
            </div>
            <div className="flex justify-between font-display text-xl pt-2">
              <dt>Total</dt>
              <dd className="text-glow">{money(total)}</dd>
            </div>
          </dl>
          <button type="submit" className="btn btn-primary w-full mt-6">
            Place Order
          </button>
          <Link
            href="/cart"
            className="block text-center mt-3 text-xs uppercase tracking-widest text-muted hover:text-fg"
          >
            Back to cart
          </Link>
        </aside>
      </form>
    </div>
  );
}

function Input({
  label,
  name,
  type = "text",
  autoComplete,
  full,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  full?: boolean;
}) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="block text-xs uppercase tracking-widest text-muted mb-2">
        {label}
      </span>
      <input
        required
        name={name}
        type={type}
        autoComplete={autoComplete}
        className="field"
      />
    </label>
  );
}
