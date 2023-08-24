import prisma from "@/config/prisma";
import { User } from ".prisma/client";

interface ICreateUser {
  userSub: string;
  email: string;
}

export async function createUser(payload: ICreateUser): Promise<User> {
  const newUser = await prisma.user.create({ data: payload });
  return newUser;
}
