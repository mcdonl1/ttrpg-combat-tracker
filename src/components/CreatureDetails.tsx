import { EncounterCreature, Skills, SpecialAbility, Speed } from "~/types/encounterTypes";

import { Separator } from "~/@/components/ui/separator";
import { getSkillText, getSavingThrowText } from "~/utils/utils";

function LabelledValue({ label, value }: { label: string, value: string }) {
  return <div className="text-slate-300">
    <span className="font-bold">{label}:</span>
    &nbsp;{value}
  </div>
}

function SpecialAbilities ({ specialAbilities }: { specialAbilities: SpecialAbility[] }) {
  return <div className="flex flex-col gap-2 text-slate-300">
    {specialAbilities.map(ability => {
      return <p><span className="font-bold italic">{ability.name}.</span> {ability.desc}</p>
    })}
  </div>
}

export function CreatureDetails({ creature }: { creature: EncounterCreature }) {
  const speedText = Object.entries(creature.speed as Speed).map(([key, value]) => {
    if (value) {
      return `${key} ${value} ft.`
    }
  }).join(", ");

  const skillsText = Object.entries(creature.skills as Skills).map(([key, value]) => {
    return getSkillText(key, value);
  }).join(", ");

  const savingThrows = [
    getSavingThrowText("Strength", creature.strength_save),
    getSavingThrowText("Dexterity", creature.dexterity_save),
    getSavingThrowText("Constitution", creature.constitution_save),
    getSavingThrowText("Intelligence", creature.intelligence_save),
    getSavingThrowText("Wisdom", creature.wisdom_save),
    getSavingThrowText("Charisma", creature.charisma_save)
  ].filter(element => element.length > 0).join(", ");


  return <div className="flex flex-col gap-1.5">
    <h3 className="text-xl">{creature.name}</h3>
    <div className="flex flex-row text-slate-300">
      {`${creature.size} ${creature.type}${creature.alignment ? `, ${creature.alignment}` : ""}`}
    </div>
    <Separator />
    <LabelledValue label="Armor Class" value={creature.armor_class?.toString() ?? ""} />
    <LabelledValue label="Hit Points" value={creature.hit_points?.toString() ?? ""} />
    <LabelledValue label="Speed" value={speedText} />
    <Separator />
    { savingThrows.length > 0 && <LabelledValue label="Saving Throws" value={savingThrows} /> }
    { skillsText.length > 0 && <LabelledValue label="Skills" value={skillsText} /> }
    { creature.damage_resistances && <LabelledValue label="Damage Resistances" value={creature.damage_resistances} /> }
    { creature.damage_immunities && <LabelledValue label="Damage Immunities" value={creature.damage_immunities} /> }
    { creature.condition_immunities && <LabelledValue label="Condition Immunities" value={creature.condition_immunities} /> }
    { creature.senses && <LabelledValue label="Senses" value={creature.senses} /> }
    { creature.languages && <LabelledValue label="Languages" value={creature.languages} /> }
    { creature.challenge_rating && <LabelledValue label="Challenge" value={creature.challenge_rating} /> }
    <Separator />
    { creature.special_abilities && <SpecialAbilities specialAbilities={creature.special_abilities as SpecialAbility[]}/> }
  </div>
}
