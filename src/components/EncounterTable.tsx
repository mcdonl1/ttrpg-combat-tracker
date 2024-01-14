"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Creature, EncounterList } from "~/types/encounterTypes";
import { CreatureContextMenu } from "./CreatureContextMenu";
import { ScrollArea } from "~/@/components/ui/scroll-area";

export function EncounterTable({
  creaturesList,
}: {
  creaturesList: EncounterList;
}) {
  const handleApplyDamage = (creatureId: number) => () => {
    console.log("apply damage to creature", creatureId);
  };

  const handleModifyStatblock = (creatureId: number) => () => {
    console.log("modify statblock for creature", creatureId);
  };

  const handleModifyInitiative = (creatureId: number) => () => {
    console.log("modify initiative for creature", creatureId);
  };

  const handleAddTag = (creatureId: number) => () => {
    console.log("add tag to creature", creatureId);
  };

  const handleTagChange = (e: any, creatureId: number) => {
    console.log("tag change", e, creatureId);
  };

  return (
    <ScrollArea className="h-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Initiative</TableHead>
            <TableHead className="w-[150px]">Name</TableHead>
            <TableHead className="w-[50px]">HP</TableHead>
            <TableHead className="w-[50px]">AC</TableHead>
            <TableHead>Tags</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {creaturesList
            .sort((a, b) => a.initiative - b.initiative)
            .map((creature, index) => (
              <CreatureContextMenu
                key={creature.id + index.toString()}
                creatureId={index}
                handleApplyDamage={handleApplyDamage}
                handleModifyStatblock={handleModifyStatblock}
                handleModifyInitiative={handleModifyInitiative}
                handleAddTag={handleAddTag}
                handleTagChange={handleTagChange}
              >
                <TableRow>
                  <TableCell
                    className="font-medium"
                    onClick={handleModifyInitiative(index)}
                  >
                    {creature.initiative}
                  </TableCell>
                  <TableCell className="font-medium">{creature.name}</TableCell>
                  <TableCell onClick={handleApplyDamage(index)}>
                    {creature.hp}/{creature.hpMax}
                  </TableCell>
                  <TableCell>{creature.ac}</TableCell>
                  <TableCell>{creature.tags.join(", ")}</TableCell>
                </TableRow>
              </CreatureContextMenu>
            ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
