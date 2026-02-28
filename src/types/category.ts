import { Product } from "./product";

export interface Category {
  id: number;
  slug: string;
  name: string;

  products?: Product[];
}
