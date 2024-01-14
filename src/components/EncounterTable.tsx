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

export function EncounterTable({
  creaturesList,
}: {
  creaturesList: EncounterList;
}) {
  return (
    <Table>
      <TableHeader className=" bg-gray-900">
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
            >
              <TableRow>
                <TableCell className="font-medium">
                  {creature.initiative}
                </TableCell>
                <TableCell className="font-medium">{creature.name}</TableCell>
                <TableCell>
                  {creature.hp}/{creature.hpMax}
                </TableCell>
                <TableCell>{creature.ac}</TableCell>
                <TableCell>{creature.tags.join(", ")}</TableCell>
              </TableRow>
            </CreatureContextMenu>
          ))}
      </TableBody>
    </Table>
  );
}
