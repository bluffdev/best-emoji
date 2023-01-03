import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

const all = async (req: NextApiRequest, res: NextApiResponse) => {
  const emojis = await prisma.emoji.findMany();
  res.status(200).json(emojis);
};

export default all;
