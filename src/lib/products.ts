export type Category =
  | "big-brake-kits"
  | "rotors"
  | "pads"
  | "calipers"
  | "lines"
  | "fluid";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  tagline: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  badge?: string;
  spec: { label: string; value: string }[];
  description: string;
  features: string[];
  fitment: string;
  stock: number;
};

export const CATEGORIES: { id: Category; label: string; blurb: string }[] = [
  { id: "big-brake-kits", label: "Big Brake Kits", blurb: "Complete stopping systems" },
  { id: "rotors", label: "Rotors", blurb: "Slotted, drilled & 2-piece" },
  { id: "pads", label: "Brake Pads", blurb: "Street to full race compounds" },
  { id: "calipers", label: "Calipers", blurb: "Forged monobloc clamping force" },
  { id: "lines", label: "Brake Lines", blurb: "Stainless braided, zero flex" },
  { id: "fluid", label: "Fluid", blurb: "High dry-boil race fluid" },
];

export const PRODUCTS: Product[] = [
  {
    slug: "apex-6-big-brake-kit",
    name: "APEX-6 Big Brake Kit",
    category: "big-brake-kits",
    tagline: "6-piston front. Track-day annihilator.",
    price: 3299,
    compareAt: 3799,
    rating: 4.9,
    reviews: 214,
    badge: "FLAGSHIP",
    spec: [
      { label: "Rotor", value: '380mm 2-piece' },
      { label: "Pistons", value: "6-piston monobloc" },
      { label: "Pad area", value: "+62% vs OEM" },
      { label: "Weight saved", value: "9.4 kg / axle" },
    ],
    description:
      "The APEX-6 is our halo system — a 380mm two-piece floating rotor clamped by a forged 6-piston monobloc caliper. Engineered for repeated 100-0 stops without a hint of fade. This is the kit that ends braking as your limiting factor.",
    features: [
      "Forged 6-piston monobloc calipers",
      "380mm directional-vane 2-piece floating rotors",
      "Stainless braided lines + ZX racing fluid included",
      "Track-validated, street-legal hardware",
      "Bolt-on — no fabrication required",
    ],
    fitment: "Most performance platforms — confirm at checkout",
    stock: 12,
  },
  {
    slug: "trackspec-4-big-brake-kit",
    name: "TrackSpec-4 Big Brake Kit",
    category: "big-brake-kits",
    tagline: "4-piston bite. Daily-to-apex.",
    price: 2199,
    rating: 4.8,
    reviews: 168,
    badge: "BEST SELLER",
    spec: [
      { label: "Rotor", value: "355mm 2-piece" },
      { label: "Pistons", value: "4-piston monobloc" },
      { label: "Pad area", value: "+44% vs OEM" },
      { label: "Weight saved", value: "6.1 kg / axle" },
    ],
    description:
      "All the confidence, none of the compromise. The TrackSpec-4 pairs a 355mm two-piece rotor with a 4-piston caliper for a pedal that's firm in traffic and brutal at the limit.",
    features: [
      "Forged 4-piston monobloc calipers",
      "355mm slotted 2-piece rotors",
      "Stainless braided lines included",
      "Street-friendly low-dust pads",
      "Direct bolt-on fitment",
    ],
    fitment: "Most performance platforms — confirm at checkout",
    stock: 21,
  },
  {
    slug: "g-slot-2pc-rotor",
    name: "G-Slot 2-Piece Rotor",
    category: "rotors",
    tagline: "Floating disc. Zero coning.",
    price: 489,
    compareAt: 559,
    rating: 4.9,
    reviews: 311,
    badge: "STAFF PICK",
    spec: [
      { label: "Diameter", value: "355mm" },
      { label: "Construction", value: "Floating 2-piece" },
      { label: "Hat", value: "6061-T6 aluminum" },
      { label: "Sold", value: "Per rotor" },
    ],
    description:
      "A directional-vane floating rotor with an aluminum hat that sheds rotational mass and runs cooler under sustained abuse. Curved slots scrub gas and refresh the pad face every revolution.",
    features: [
      "Floating ring eliminates thermal coning",
      "Directional internal vanes for airflow",
      "Anti-corrosion coated hat",
      "Precision-balanced, ready to bolt",
    ],
    fitment: "Multiple bolt patterns available",
    stock: 64,
  },
  {
    slug: "cryo-drilled-rotor",
    name: "Cryo Cross-Drilled Rotor",
    category: "rotors",
    tagline: "Cryo-treated. Crack-resistant.",
    price: 279,
    rating: 4.7,
    reviews: 142,
    spec: [
      { label: "Diameter", value: "330mm" },
      { label: "Treatment", value: "Deep cryogenic" },
      { label: "Pattern", value: "Cross-drilled" },
      { label: "Sold", value: "Per rotor" },
    ],
    description:
      "Cryogenically treated cast iron for dramatically improved crack resistance and wear life. Cross-drilled for bite and looks that fill the wheel.",
    features: [
      "Deep cryo process for grain stability",
      "Chamfered drill holes resist cracking",
      "Black anti-rust coating",
    ],
    fitment: "Multiple bolt patterns available",
    stock: 88,
  },
  {
    slug: "rp-race-pads",
    name: "RP-Race Brake Pads",
    category: "pads",
    tagline: "Full race compound. Endurance bite.",
    price: 219,
    rating: 4.9,
    reviews: 276,
    badge: "TRACK",
    spec: [
      { label: "Compound", value: "RP-10 race" },
      { label: "Temp range", value: "100–820°C" },
      { label: "Friction", value: "µ 0.62" },
      { label: "Sold", value: "Axle set" },
    ],
    description:
      "A full endurance-race compound with a flat torque curve from cold pit-out to a glowing third stint. Aggressive, consistent, and built to outlast the field.",
    features: [
      "Stable µ across a huge temp window",
      "Low compressibility for a rock pedal",
      "Rotor-friendly for the compound class",
    ],
    fitment: "Caliper-specific — select at checkout",
    stock: 130,
  },
  {
    slug: "sport-street-pads",
    name: "Sport-Street Brake Pads",
    category: "pads",
    tagline: "Daily-quiet. Canyon-ready.",
    price: 139,
    compareAt: 169,
    rating: 4.8,
    reviews: 401,
    badge: "BEST SELLER",
    spec: [
      { label: "Compound", value: "SS-4 ceramic" },
      { label: "Temp range", value: "20–540°C" },
      { label: "Friction", value: "µ 0.45" },
      { label: "Sold", value: "Axle set" },
    ],
    description:
      "Cold bite for the morning commute, low dust for clean wheels, and enough headroom to hammer your favorite road. The everyday upgrade.",
    features: [
      "Strong cold initial bite",
      "Ultra-low dust ceramic formula",
      "Near-silent operation",
    ],
    fitment: "Caliper-specific — select at checkout",
    stock: 240,
  },
  {
    slug: "monobloc-6-caliper",
    name: "Monobloc-6 Caliper",
    category: "calipers",
    tagline: "Forged single-piece. No flex.",
    price: 899,
    rating: 4.9,
    reviews: 97,
    badge: "FORGED",
    spec: [
      { label: "Pistons", value: "6 differential" },
      { label: "Body", value: "Forged monobloc" },
      { label: "Stiffness", value: "+38% vs 2-pc" },
      { label: "Sold", value: "Per caliper" },
    ],
    description:
      "Machined from a single forged billet for the stiffest possible structure. Differential pistons equalize pad wear and deliver a pedal that doesn't move.",
    features: [
      "One-piece forged construction",
      "Differential-bore pistons",
      "Stainless pistons resist heat soak",
      "Anodized in stealth black or blue",
    ],
    fitment: "Requires matching bracket — confirm at checkout",
    stock: 18,
  },
  {
    slug: "stainless-brake-lines",
    name: "Stainless Braided Lines",
    category: "lines",
    tagline: "PTFE core. Zero pedal swell.",
    price: 129,
    rating: 4.8,
    reviews: 358,
    spec: [
      { label: "Core", value: "PTFE" },
      { label: "Sheath", value: "304 stainless" },
      { label: "Cover", value: "Abrasion sleeve" },
      { label: "Sold", value: "Full vehicle set" },
    ],
    description:
      "Replace mushy rubber with a stainless braided PTFE line that refuses to balloon under pressure. Instantly firmer pedal, sharper modulation.",
    features: [
      "DOT-compliant PTFE construction",
      "Stainless over-braid + protective sleeve",
      "Vehicle-specific lengths and fittings",
    ],
    fitment: "Vehicle-specific kit — confirm at checkout",
    stock: 175,
  },
  {
    slug: "zx-racing-fluid",
    name: "ZX Racing Brake Fluid",
    category: "fluid",
    tagline: "326°C dry boil. Pedal stays high.",
    price: 34,
    rating: 4.9,
    reviews: 520,
    badge: "TRACK",
    spec: [
      { label: "Dry boil", value: "326°C" },
      { label: "Wet boil", value: "215°C" },
      { label: "Spec", value: "DOT 4 racing" },
      { label: "Volume", value: "500ml" },
    ],
    description:
      "An ultra-high dry boiling point racing fluid that keeps the pedal firm when everything else is glowing. Low compressibility, fast-bleed formula.",
    features: [
      "326°C dry boiling point",
      "Low compressibility for pedal feel",
      "Mixes with standard DOT 4",
    ],
    fitment: "Universal — DOT 4 systems",
    stock: 600,
  },
];

/* Real product photography (Unsplash, free for commercial use,
   every URL verified resolving HTTP 200 image/jpeg). */
const U = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

const IMAGE_BY_CATEGORY: Record<Category, string> = {
  "big-brake-kits": U("photo-1746968989993-6b3fc7b534d9"),
  rotors: U("photo-1757910869199-c5832bd15f11"),
  pads: U("photo-1760689033990-2462d7ab40d0"),
  calipers: U("photo-1750492764558-1e1b8f4f211d"),
  lines: U("photo-1774066811788-8b9ae29ae09d"),
  fluid: U("photo-1757910869199-c5832bd15f11"),
};

// Per-product overrides so products in the same category differ.
const IMAGE_BY_SLUG: Record<string, string> = {
  "trackspec-4-big-brake-kit": U("photo-1750492764558-1e1b8f4f211d"),
  "cryo-drilled-rotor": U("photo-1774066811788-8b9ae29ae09d"),
  "sport-street-pads": U("photo-1746968989993-6b3fc7b534d9"),
};

export function productImage(p: Product): string {
  return IMAGE_BY_SLUG[p.slug] ?? IMAGE_BY_CATEGORY[p.category];
}

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getByCategory(category: Category | "all") {
  if (category === "all") return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === category);
}
