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

export type Creature = {
  id: number;
  initiative: number;
  current_hp: number;
  notes: string;
  current_conditions: string[];
  tags: string[];
  isPlayer: boolean;
  slug?: string | null;
  desc?: string | null;
  name?: string | null;
  size?: string | null;
  type?: string | null;
  subtype?: string | null;
  group?: string | null;
  alignment?: string | null;
  armor_class?: number | null;
  armor_desc?: string | null;
  hit_points?: number | null;
  hit_dice?: string | null;
  speed?: Speed | null;
  strength?: number | null;
  dexterity?: number | null;
  constitution?: number | null;
  intelligence?: number | null;
  wisdom?: number | null;
  charisma?: number | null;
  strength_save?: number | null;
  dexterity_save?: number | null;
  constitution_save?: number | null;
  intelligence_save?: number | null;
  wisdom_save?: number | null;
  charisma_save?: number | null;
  perception?: number | null;
  skills?: Skills | null;
  damage_vulnerabilities?: string | null;
  damage_resistances?: string | null;
  damage_immunities?: string | null;
  condition_immunities?: string | null;
  senses?: string | null;
  languages?: string | null;
  challenge_rating?: string | null;
  cr?: number | null;
  actions?: Action[] | null;
  bonus_actions?: Action | null; // Replace 'any' with a more specific type if needed
  reactions?: Action | null; // Replace 'any' with a more specific type if needed
  legendary_desc?: string | null;
  legendary_actions?: Action | null; // Replace 'any' with a more specific type if needed
  special_abilities?: SpecialAbility[] | null;
  spell_list?: string[] | null;
  page_no?: number | null;
  environments?: string[] | null;
  img_main?: string | null;
  document__slug?: string | null;
  document__title?: string | null;
  document__license_url?: string | null;
  document__url?: string | null;
};

export type EncounterList = Creature[];
