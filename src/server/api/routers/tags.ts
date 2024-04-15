import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { tags } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const tagsRouter = createTRPCRouter({
  getTagsByUser: protectedProcedure.query(async ({ ctx }) => {
    const tagsList = ctx.db.query.tags.findMany({
      where: (tag, {or, eq, isNull}) => or(eq(tag.userId, ctx.session.user.id), isNull(tag.userId)),
      orderBy: (tags, {asc}) => asc(tags.name),
    });
    return tagsList;
  }),

  addTag: protectedProcedure.input(z.object({tag: z.string(), color: z.string()})).mutation(async ({ input, ctx }) => {
    const response = await ctx.db.insert(tags).values({
      name: input.tag,
      color: input.color,
      userId: ctx.session.user.id,
    });
    return response;
  }),

  getTags: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id || null;
    const tagsList = ctx.db.query.tags.findMany({
      where: userId !== null ?
        (tag, {or, isNull, eq, }) => or(isNull(tag.userId), eq(tag.userId, userId))
        : (tag, {isNull}) => isNull(tag.userId),
      orderBy: (tags, {asc}) => asc(tags.name),
    });
    return tagsList;
  }),

  deleteTagById: protectedProcedure.input(z.object({id: z.string()})).mutation(async ({ input, ctx }) => {
    const response = await ctx.db.delete(tags).where(eq(tags.id, input.id));
    return response;
  }),
});
