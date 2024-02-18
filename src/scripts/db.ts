// Seed db with data from dnd api

import { type InferSelectModel } from "drizzle-orm";
import { db } from "~/server/db";
import { creatures } from "~/server/db/schema";

type Creature = InferSelectModel<typeof creatures>;

export async function seedDbCreatures() {
  const promises = [];
  let next = `${process.env.DND_API_URL}/monsters/?limit=100&format=json`;

  while (true) {
    const res = await fetch(next);
    const creaturesList = (await res.json()) as {
      count: number;
      next: string | null;
      previous: string | null;
      results: Creature[];
    };
    promises.push(db.insert(creatures).values(creaturesList.results));

    if (!creaturesList.next) {
      break;
    } else {
      next = creaturesList.next;
    }
  }
  await Promise.all(promises);
  
}