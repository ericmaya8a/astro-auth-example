import { prisma } from "../../../db/client";

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}
