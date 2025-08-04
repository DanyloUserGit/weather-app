import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../db/connect";
import User from "../db/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();

  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments();
    const users = await User.find({}).skip(skip).limit(limit);

    return res.status(200).json({ totalUsers, users });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch users" });
  }
}
