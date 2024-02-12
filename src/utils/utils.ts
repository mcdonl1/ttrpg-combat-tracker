export function rollDice(count: number, sides: number): number[] {

  const rolls = [];
  for (let i = 0; i < (count > 0 ? count : 1); i++) {
    rolls.push(Math.floor(Math.random() * sides) + 1);
  }
  return rolls.length > 0 ? rolls : [0];
}

export function modifierFromScore(score: number): number {
    return Math.floor((score - 10) / 2);
}