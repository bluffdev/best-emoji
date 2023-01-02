import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

const emojis = async (req: NextApiRequest, res: NextApiResponse) => {
  const emojiCount = await prisma.emoji.count();
  const skip = Math.floor(Math.random() * emojiCount);
  const emojis = await prisma.emoji.findMany({
    take: 1,
    skip: skip,
  });
  res.status(200).json(emojis);
};

export default emojis;
