import type { StateCreator } from "zustand";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartStore } from "../types";

const cartStore: StateCreator<CartStore> = (set, get) => ({
  cart: [],

  setCart: (newcart) => set({ cart: newcart }),

  clearcart: () => set({ cart: [] }),

  addToCart: (item) => {
    if (!item || !item.id) {
      return;
    }

    const cart = get().cart;
    const exists = cart.find((i) => i.id === item.id);

    const updatedCart = exists
      ? cart.map((p) =>
          p.id === item.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
        )
      : [...cart, { ...item, quantity: 1 }];

    set({ cart: updatedCart });
    return updatedCart;
  },

  decrement: (item) => {
    const cart = get().cart;

    const updatedCart = cart.map((p) =>
      p.id === item.id
        ? { ...p, quantity: p.quantity - 1 }
        : p
    );

    set({ cart: updatedCart });
    return updatedCart;
  },

  removeitem: (item) => {
    const cart = get().cart;

    const updatedCart = cart.filter((p) => p.id !== item.id);

    set({ cart: updatedCart });
    return updatedCart;
  },
});

export const useCartStore = create<CartStore>()(
  persist(cartStore, {
    name: "cart-storage",
  })
);
