import prisma from "@/config/prisma";
import { UserProfile } from ".prisma/client";

export interface ICreateUserProfile {
  givenName: string;
  middleName?: string;
  familyName: string;
  userSub: string;
}

export async function createUserProfile(
  payload: ICreateUserProfile
): Promise<UserProfile> {
  try {
    const newProfile = await prisma.userProfile.create({ data: payload });
    return newProfile;
  } catch (err) {
    console.log(err);
    throw new Error("fuck!");
  }
}
