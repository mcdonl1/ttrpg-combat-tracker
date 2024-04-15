import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { encounters } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const encounterRouter = createTRPCRouter({
  getEncountersByUser: protectedProcedure.query(async ({ ctx }) => {
      const encountersList = ctx.db.query.encounters.findMany({
        where: (encounter, {eq}) => eq(encounter.userId, ctx.session.user.id),
        orderBy: (encounters, {asc}) => asc(encounters.name),
      });
      return encountersList;
    }),

  getEncounterById: protectedProcedure.input(z.object({id: z.string()})).query(async ({ input, ctx }) => {
    const encounter = await ctx.db.query.encounters.findFirst({
      where: (encounter, {eq}) => eq(encounter.id, input.id)
    });
    return encounter;
  }),

  addEncounter: protectedProcedure.input(z.object({
    name: z.string(),
    desc: z.string(),
    group: z.string(),
    encounter: z.any()
  })).mutation(async ({ input, ctx }) => {
    const response = await ctx.db.insert(encounters).values({
      name: input.name,
      desc: input.desc,
      group: input.group,
      encounter: input.encounter,
      userId: ctx.session.user.id,
    });
    return response;
  }),

  updateEncounterById: protectedProcedure.input(z.object({
    id: z.string(),
    name: z.string(),
    desc: z.string(),
    group: z.string(),
    encounter: z.any()
  })).mutation(async ({ input, ctx }) => {
    const response = await ctx.db.update(encounters).set({
      name: input.name,
      desc: input.desc,
      group: input.group,
      encounter: input.encounter,
    }).where(eq(encounters.id, input.id));
    return response;
  }),

  deleteEncounterById: protectedProcedure.input(z.object({id: z.string()})).mutation(async ({ input, ctx }) => {
    const response = await ctx.db.delete(encounters).where(eq(encounters.id, input.id));
    return response;
  }),
});
