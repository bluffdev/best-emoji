import { router } from "../trpc";
import { emojiRouter } from "./emoji";
import { exampleRouter } from "./example";

export const appRouter = router({
  example: exampleRouter,
  emoji: emojiRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
