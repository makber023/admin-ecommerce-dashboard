import type { User, CartItem, Product } from "@prisma/client";

export type CartItemWithProduct = CartItem & {
  product: Pick<Product, "id" | "name" | "slug" | "price" | "stock" | "image">;
};

export type UserWithCartResponse = Pick<
  User,
  "id" | "email" | "name" | "role"
> & {
  cartItems: CartItemWithProduct[];
};
