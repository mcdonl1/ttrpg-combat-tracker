import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import type { creatures } from "~/server/db/schema";
import type { InferSelectModel } from "drizzle-orm";
import { env } from "~/env";

type Creature = InferSelectModel<typeof creatures>;

type CreatureResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Creature[];
};

export const creatureRouter = createTRPCRouter({
  // create: protectedProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     // simulate a slow db call
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //       await ctx.db.insert(creatures).values({
  //         name: input.name,
  //         createdById: ctx.session.user.id,
  //       });
  //   }),
  getDummyCreautures: publicProcedure
    .input(z.object({ count: z.number().min(0) }))
    .query(async ({ input }) => {
      const res = await fetch(
        `${env.DND_API_URL}monsters/?limit=${input.count}&format=json`,
      );
      const creaturesList: CreatureResponse =
        (await res.json()) as CreatureResponse;
      console.log(creaturesList.results);
      return creaturesList.results ?? [];
    }),
  getCreatureSearch: publicProcedure
    .input(z.object({ searchTerm: z.string().min(1) }))
    .query(async ({ input }) => {
      const res = await fetch(
        `${env.DND_API_URL}monsters/?search=${input.searchTerm}&format=json`,
      );
      const creaturesList: CreatureResponse =
        (await res.json()) as CreatureResponse;
      console.log(creaturesList.results);
      return creaturesList.results ?? [];
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
