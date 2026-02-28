import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  variant?: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string, variant?: string) => void;
  updateQuantity: (
    id: string,
    variant: string | undefined,
    quantity: number,
  ) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.id === item.id && i.variant === item.variant,
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id && i.variant === item.variant
                  ? { ...i, quantity: i.quantity + 1 }
                  : i,
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        });
      },

      removeItem: (id, variant) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.id === id && i.variant === variant),
          ),
        }));
      },

      updateQuantity: (id, variant, quantity) => {
        if (quantity < 1) {
          get().removeItem(id, variant);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id && i.variant === variant ? { ...i, quantity } : i,
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: "mahram-cart", // localStorage key
    },
  ),
);
