import type { NextApiRequest, NextApiResponse } from "next";
import { Listing } from "@prisma/client";
import * as listingService from "@/services/listing";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Listing>
) {
  if (req.method === "POST") {
    const payload = req.body;
    try {
      const result = await listingService.createListing(payload);
      res.status(200).json(result);
    } catch (err) {
      res.status(500);
    }
  }
}
