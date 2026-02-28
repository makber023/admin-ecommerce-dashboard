import { CartItem } from "./cartItem";
import { Account } from "./account";
import { Session } from "./session";

export interface User {
  id: number;
  email: string;
  name?: string | null;
  password?: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;

  cartItems?: CartItem[];
  accounts?: Account[];
  sessions?: Session[];
}
