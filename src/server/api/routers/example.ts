import { z } from "zod";
import { dndApiClient } from "~/server/dndapi/dndApiClient";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

const dndClient = new dndApiClient();

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(async ({ input }) => {
      const spells = await dndClient.spells.getApiSpells();
      return {
        greeting: `Hello ${input.text}`,
        spells: spells,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
