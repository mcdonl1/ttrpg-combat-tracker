import type { creatures } from "~/server/db/schema";
import { type InferSelectModel } from "drizzle-orm";

export type Speed = {
  walk?: number;
  fly?: number;
  swim?: number;
  climb?: number;
  burrow?: number;
  hover?: number;
};

export type Skills = {
  athletics?: number;
  acrobatics?: number;
  sleightOfHand?: number;
  stealth?: number;
  arcana?: number;
  history?: number;
  investigation?: number;
  nature?: number;
  religion?: number;
  animalHandling?: number;
  insight?: number;
  medicine?: number;
  perception?: number;
  survival?: number;
  deception?: number;
  intimidation?: number;
  performance?: number;
  persuasion?: number;
};

export type Ability = "strength" | "dexterity" | "constitution" | "intelligence" | "wisdom" | "charisma";

export type Action = {
  name?: string;
  desc?: string;
};

export type AttackAction = Action & {
  attack_bonus?: number | null;
  damage_dice?: string;
  damage_bonus?: number | null;
};

export type SpecialAbility = {
  name?: string | null;
  desc?: string | null;
};

export type Creature = InferSelectModel<typeof creatures>;
export type EncounterCreature = Creature & {
  initiative: number;
  current_hp: number;
  current_conditions: string[];
  tags: string[];
  isPlayer: boolean;
  localId: string;
};

export type EncounterList = EncounterCreature[];
