"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { EncounterList } from "~/types/encounterTypes";
import { CreatureContextMenu } from "./CreatureContextMenu";
import { ScrollArea } from "~/@/components/ui/scroll-area";

export function EncounterTable({
  creaturesList,
  currentTurnIdx,
}: {
  creaturesList: EncounterList;
  currentTurnIdx: number;
}) {
  const [tableList, setTableList] = useState(
    creaturesList.map((creature) => ({
      ...creature,
      isDraggedOver: false,
      isDragging: false,
    })),
  );

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

  const handleTagChange = (e: React.FormEvent, creatureId: number) => {
    console.log("tag change", e, creatureId);
  };

  const array_move = (arr: any[], old_index: number, new_index: number) => {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  };

  const handleDrag = (e: React.DragEvent, index: number) => {
    setTableList((prevList) => {
      const newList = [...prevList];
      newList[index]!.isDragging = true;
      return newList;
    });
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setTableList((prevList) => {
      const newList = [...prevList];
      newList[index]!.isDraggedOver = true;
      return newList;
    });
  };

  const handleDragOff = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setTableList((prevList) => {
      const newList = [...prevList];
      newList[index]!.isDraggedOver = false;
      return newList;
    });
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setTableList((prevList) => {
      const draggedCreatureIdx = prevList.findIndex(
        (creature) => creature.isDragging,
      );
      const draggedCreature = prevList.find((creature) => creature.isDragging);
      if (!draggedCreature) {
        return prevList;
      }
      const onCreatureIdx = index;
      draggedCreature!.isDragging = false;
      draggedCreature!.initiative = prevList[onCreatureIdx]!.initiative;
      let newList = [...prevList];
      newList[index]!.isDraggedOver = false;
      newList = array_move(
        newList,
        draggedCreatureIdx,
        onCreatureIdx,
      ) as typeof tableList;
      return newList;
    });
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
        <TableBody className="box-border border-separate">
          {tableList
            .sort((a, b) => a.initiative - b.initiative)
            .map((creature, index) => (
              <CreatureContextMenu
                key={creature.id + index.toString()}
                creature={creature}
                handleApplyDamage={handleApplyDamage}
                handleModifyStatblock={handleModifyStatblock}
                handleModifyInitiative={handleModifyInitiative}
                handleAddTag={handleAddTag}
                handleTagChange={handleTagChange}
              >
                <TableRow
                  draggable
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={(e) => handleDragOff(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragStart={(e) => handleDrag(e, index)}
                  className={`box-border border-2 border-transparent ${
                    currentTurnIdx === index
                      ? "  border-slate-500 bg-slate-900"
                      : ""
                  } ${currentTurnIdx - 1 === index ? "border-b-slate-500" : ""} ${creature.isDraggedOver ? " border-t-4" : ""}`}
                >
                  <TableCell
                    className="font-medium"
                    onClick={handleModifyInitiative(creature.id)}
                  >
                    {creature.initiative}
                  </TableCell>
                  <TableCell className="font-medium">{creature.name}</TableCell>
                  <TableCell onClick={handleApplyDamage(index)}>
                    {creature.current_hp}/{creature.hit_points}
                  </TableCell>
                  <TableCell>{creature.armor_class}</TableCell>
                  <TableCell>{creature.tags.join(", ")}</TableCell>
                </TableRow>
              </CreatureContextMenu>
            ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
