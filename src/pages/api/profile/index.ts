import type { NextApiRequest, NextApiResponse } from "next";
import { UserProfile } from "@prisma/client";
import * as profileService from "@/services/profile";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserProfile>
) {
  if (req.method === "POST") {
    const payload: profileService.ICreateUserProfile = req.body;
    try {
      const result = await profileService.createUserProfile(payload);
      res.status(200).json(result);
    } catch (err) {
      res.status(500);
    }
  }
}
