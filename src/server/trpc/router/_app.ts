import { router } from "../trpc";
import { emojiRouter } from "./emoji";

export const appRouter = router({
  emoji: emojiRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
