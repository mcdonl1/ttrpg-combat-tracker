import { createTRPCRouter } from "~/server/api/trpc";
import { creatureRouter } from "~/server/api/routers/creature";
import { encounterRouter } from "~/server/api/routers/encounter";
import { tagsRouter } from "~/server/api/routers/tags";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  creatures: creatureRouter,
  encounters: encounterRouter,
  tags: tagsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
