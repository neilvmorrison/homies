import { UserProfile } from "@prisma/client";
import prisma from "../../../prisma/prisma";

export async function getProfileByUserSub(userSub: string): Promise<UserProfile | null> {
  return prisma.userProfile.findFirst({ where: { userSub } })
}