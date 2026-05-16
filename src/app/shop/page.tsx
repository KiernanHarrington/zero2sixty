import { Suspense } from "react";
import ShopBrowser from "@/components/ShopBrowser";

export const metadata = {
  title: "Shop — Zero2Sixty",
  description: "Big brake kits, rotors, pads, calipers, lines and fluid.",
};

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-5 py-32 text-center text-muted">
          Loading the arsenal…
        </div>
      }
    >
      <ShopBrowser />
    </Suspense>
  );
}
