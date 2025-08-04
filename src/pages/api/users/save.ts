import type { NextApiRequest, NextApiResponse } from "next";
import connect from "../db/connect";
import User from "../db/models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect();

  const user = req.body;

  try {
    const filter = { "login.uuid": user.login.uuid };

    await User.findOneAndUpdate(filter, user, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Save user error:", error);
    return res.status(500).json({ error: "Failed to save user" });
  }
}
