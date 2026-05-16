"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

export type CartLine = {
  slug: string;
  name: string;
  price: number;
  qty: number;
};

type State = { lines: CartLine[] };

type Action =
  | { type: "add"; line: Omit<CartLine, "qty">; qty?: number }
  | { type: "remove"; slug: string }
  | { type: "setQty"; slug: string; qty: number }
  | { type: "clear" }
  | { type: "hydrate"; state: State };

const KEY = "z2s-cart-v1";

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return action.state;
    case "add": {
      const existing = state.lines.find((l) => l.slug === action.line.slug);
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.slug === action.line.slug
              ? { ...l, qty: l.qty + (action.qty ?? 1) }
              : l
          ),
        };
      }
      return {
        lines: [...state.lines, { ...action.line, qty: action.qty ?? 1 }],
      };
    }
    case "remove":
      return { lines: state.lines.filter((l) => l.slug !== action.slug) };
    case "setQty":
      return {
        lines: state.lines
          .map((l) =>
            l.slug === action.slug
              ? { ...l, qty: Math.max(1, action.qty) }
              : l
          )
          .filter((l) => l.qty > 0),
      };
    case "clear":
      return { lines: [] };
    default:
      return state;
  }
}

type CartContext = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (line: Omit<CartLine, "qty">, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
};

const Ctx = createContext<CartContext | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) dispatch({ type: "hydrate", state: JSON.parse(raw) });
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable */
    }
  }, [state]);

  const value = useMemo<CartContext>(() => {
    const count = state.lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = state.lines.reduce((n, l) => n + l.qty * l.price, 0);
    return {
      lines: state.lines,
      count,
      subtotal,
      add: (line, qty) => dispatch({ type: "add", line, qty }),
      remove: (slug) => dispatch({ type: "remove", slug }),
      setQty: (slug, qty) => dispatch({ type: "setQty", slug, qty }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [state]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
