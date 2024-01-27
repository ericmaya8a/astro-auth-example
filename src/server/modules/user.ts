import { prisma } from "../../../db/client";
import type { RegisterSchemaT } from "../../schemas";

export async function getUserByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}

export async function createUser(user: RegisterSchemaT) {
  return await prisma.user.create({
    data: user,
  });
}
