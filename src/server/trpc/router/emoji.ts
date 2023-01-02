import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const emojiRouter = router({
  getRandom: publicProcedure.query(async ({ ctx }) => {
    const emojiCount = await ctx.prisma.emoji.count();
    const skip = Math.floor(Math.random() * emojiCount);
    const emojis = await ctx.prisma.emoji.findMany({
      take: 1,
      skip: skip,
    });
    return emojis[0];
  }),
});
