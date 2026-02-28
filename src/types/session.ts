import { User } from "./user";

export interface Session {
  id: number;
  sessionToken: string;
  userId: number;
  expires: Date;
  updatedAt: Date;

  user?: User;
}
