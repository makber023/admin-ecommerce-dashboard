import { User } from "./user";
import { Product } from "./product";

export interface CartItem {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;

  user?: User;
  product?: Product;
}
