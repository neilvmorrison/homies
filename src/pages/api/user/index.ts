import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import * as userService from "@/services/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  if (req.method === "POST") {
    const { email, userSub } = req.body;
    try {
      const result = await userService.createUser({ email, userSub });
      res.status(200).json(result);
    } catch (err) {
      res.status(500);
    }
  }
}
