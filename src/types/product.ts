import { Category } from "./category";
import { CartItem } from "./cartItem";

export interface Product {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  price: number;
  stock: number;
  categoryId?: number | null;
  createdAt: Date;
  updatedAt: Date;

  category?: Category | null;
  cartItems?: CartItem[];
}
