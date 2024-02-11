import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { creatures } from "~/server/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { env } from "~/env";

type Creature = InferSelectModel<typeof creatures>;

type CreatureResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Creature[];
};

export const creatureRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      //   await ctx.db.insert(creatures).values({
      //     name: input.name,
      //     createdById: ctx.session.user.id,
      //   });
    }),

  getCreatureSearch: publicProcedure
    .input(z.object({ searchTerm: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const res = await fetch(
        `${env.DND_API_URL}monsters/?search=${input.searchTerm}&format=json`,
      );
      const creaturesList: CreatureResponse = await res.json();
      console.log(creaturesList.results.map((c: Creature) => c.name));
      return creaturesList.results ?? [];
      // return ctx.db.query.creatures.findFirst({
      //   orderBy: (creatures, { desc }) => [desc(creatures.slug)],
      // });
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
