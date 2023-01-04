import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const emojiRouter = router({
  random: publicProcedure.query(async ({ ctx }) => {
    const emojiCount = await ctx.prisma.emoji.count();
    const skip = Math.floor(Math.random() * emojiCount);
    const emojis = await ctx.prisma.emoji.findMany({
      take: 2,
      skip: skip,
    });
    return { first: emojis[0], second: emojis[1]};
  }),
  all: publicProcedure.query(async ({ ctx }) => {
    const emojis = await ctx.prisma.emoji.findMany();
    return emojis;
  }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        wins: z.number(),
        total: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const emoji = await ctx.prisma.emoji.update({
        where: { id: input.id },
        data: { wins: input.wins, total: input.wins},
      })
      return emoji;
    })
});
