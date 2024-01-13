export type Creature = {
  name: string;
  initiative: number;
  hp: number;
  hpMax: number;
  ac: number;
  notes: string;
  id: number;
  conditions: string[];
  tags: string[];
  isPlayer: boolean;
};

export type EncounterList = Creature[];
