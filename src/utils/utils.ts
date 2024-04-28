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

export function arrayMove<T>(arr: T[], old_index: number, new_index: number) {
  if (new_index >= arr.length) {
    let k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined as T);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0] as T);
  return arr;
}

export function getSavingThrowText(ability: string, modifier: number | null): string {
  const abilityString = ability.charAt(0).toUpperCase() + ability.slice(1, 3);
  return modifier
    ? `${abilityString} ${modifier > 0 ? "+" : modifier > 0 ? "" : ""}${modifier}`
    : "";
}

export function getSkillText(ability: string, modifier: number | null): string {
  const skillString = ability.charAt(0).toUpperCase() + ability.slice(1);
  return modifier
    ? `${skillString} ${modifier > 0 ? "+" : modifier > 0 ? "" : ""}${modifier}`
    : "";
}

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
