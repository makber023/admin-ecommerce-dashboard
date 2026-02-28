import prisma from "@/lib/prisma";
import { User } from "@/types/user";

export async function getUserByEmail(email: string): Promise<User | null> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password, 
    role: user.role as "user" | "admin",
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
