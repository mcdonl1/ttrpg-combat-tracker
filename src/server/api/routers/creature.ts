import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import {seedDbCreatures} from "~/scripts/db"
import { creatures } from "~/server/db/schema";

import { createInsertSchema } from "drizzle-zod";

const creatureInsertSchema = createInsertSchema(creatures);

export const creatureRouter = createTRPCRouter({
  getDummyCreatures: publicProcedure
    .input(z.object({ count: z.number().min(0) }))
    .query(async ({ input, ctx }) => {
      const creaturesList = ctx.db.query.creatures.findMany({
        orderBy: (creatures, {sql}) => sql`RAND()`,
        limit: input.count
      });
      return creaturesList;
    }),
  getCreatureSearch: publicProcedure
    .input(z.object({ searchTerm: z.string().min(1) }))
    .query(async ({ input, ctx }) => {
      const creaturesList = ctx.db.query.creatures.findMany({
        columns:{
          id:true,
          name:true,
          challenge_rating:true,
        },
        where: (creature, {like}) => like(creature.name, `%${input.searchTerm}%`),
        orderBy: (creatures, {asc}) => asc(creatures.name),
      });
      return creaturesList;
    }),

  getCreaureById: publicProcedure.input(z.object({id: z.string()})).query(async ({ input, ctx }) => {
    const creature = await ctx.db.query.creatures.findFirst({
      where: (creature, {eq}) => eq(creature.id, input.id)
    });
    return creature;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  seedData: publicProcedure.mutation(async () => {
    await seedDbCreatures();
  }),

  saveCreature: publicProcedure.input(creatureInsertSchema).mutation(async ({input, ctx}) => {
    const creature = await ctx.db.insert(creatures).values(input)
      .onDuplicateKeyUpdate({
        set: input,
      }).execute();
    return creature;
  }),
});
