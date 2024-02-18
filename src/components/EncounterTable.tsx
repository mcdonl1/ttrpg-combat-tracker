"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import type { EncounterList } from "~/types/encounterTypes";
import { CreatureContextMenu } from "./CreatureContextMenu";
import { ScrollArea } from "~/@/components/ui/scroll-area";

export function EncounterTable({
  creaturesList,
  setCreaturesList,
  currentTurnIdx,
  editNameIdx,
  setEditNameIdx,
  selectedCreatureIdx,
  setSelectedCreatureIdx,
}: {
  creaturesList: EncounterList;
  setCreaturesList: React.Dispatch<React.SetStateAction<EncounterList>>;
  currentTurnIdx: number;
  editNameIdx: number;
  setEditNameIdx: React.Dispatch<React.SetStateAction<number>>;
  selectedCreatureIdx: number;
  setSelectedCreatureIdx: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [draggedOver, setDraggedOver] = useState({
    idx: -1,
    direction: "none",
  });
  const [isDraggingIdx, setIsDraggingIdx] = useState(-1);
  const [nameBuffer, setNameBuffer] = useState("");


  const eventListener = useCallback(
    (e: KeyboardEvent) => {
      if (editNameIdx !== -1) {
        if (e.key === "Escape") {
          setEditNameIdx(-1);
        }
        if (e.key === "Enter") {
          setCreaturesList((prevList) => {
            const newList = [...prevList];
            newList[editNameIdx]!.name = nameBuffer;
            return newList;
          });
          setEditNameIdx(-1);
        }
      }
    },
    [editNameIdx, creaturesList, setCreaturesList, setEditNameIdx, nameBuffer],
  );

  useEffect(() => {
    if (editNameIdx !== -1) {
      setNameBuffer(creaturesList[editNameIdx]!.name);
      const el = document.getElementById(`name-edit-input-${editNameIdx}`);
      el?.focus();
      window.addEventListener("keydown", eventListener, true);
      return () => {
        window.removeEventListener("keydown", eventListener, true);
      };
    }
  }, [editNameIdx, creaturesList, setCreaturesList, setEditNameIdx]);

  const handleApplyDamage = (creatureId: string) => () => {
    console.log("apply damage to creature", creatureId);
  };

  const handleModifyStatblock = (creatureId: string) => () => {
    console.log("modify statblock for creature", creatureId);
  };

  const handleModifyInitiative = (creatureId: string) => () => {
    console.log("modify initiative for creature", creatureId);
  };

  const handleAddTag = (creatureId: string) => () => {
    console.log("add tag to creature", creatureId);
  };

  const handleTagChange = (e: React.FormEvent, creatureId: string) => {
    console.log("tag change", e, creatureId);
  };

  function array_move<T>(arr: T[], old_index: number, new_index: number) {
    if (new_index >= arr.length) {
      let k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined as T);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0] as T);
    return arr;
  }

  const handleDrag = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/json", "dummy");
    setIsDraggingIdx(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDraggedOver({
      idx: index,
      direction:
        isDraggingIdx > index ? "up" : isDraggingIdx < index ? "down" : "none",
    });
  };

  const handleDragOff = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedOver({ idx: -1, direction: "none" });
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setCreaturesList((prevList) => {
      const draggedCreature = prevList[isDraggingIdx];
      if (!draggedCreature) {
        return prevList;
      }
      const onCreatureIdx = index;
      setIsDraggingIdx(-1);
      draggedCreature.initiative = prevList[onCreatureIdx]!.initiative;
      let newList = [...prevList];
      setDraggedOver({ idx: -1, direction: "none" });
      newList = array_move(newList, isDraggingIdx, onCreatureIdx);
      return newList;
    });
  };

  const handleNameEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameBuffer(e.target.value);
  };

  const handleNameUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    setEditNameIdx(-1);
  };

  return (
    <ScrollArea className="h-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Initiative</TableHead>
            <TableHead className="w-[250px]">Name</TableHead>
            <TableHead className="w-[50px]">HP</TableHead>
            <TableHead className="w-[50px]">AC</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead className="w-[50px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="box-border border-separate [&_tr:last-child]:border-2">
          {creaturesList
            .sort((a, b) => b.initiative - a.initiative)
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
                  onClick={() => setSelectedCreatureIdx(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={(e) => handleDragOff(e)}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragStart={(e) => handleDrag(e, index)}
                  className={`box-border border-2 border-transparent ${
                    currentTurnIdx === index
                      ? "border-slate-500 bg-slate-900"
                      : ""
                  } ${
                    currentTurnIdx - 1 === index ? "border-b-slate-500" : ""
                  } ${
                    draggedOver.idx === index && draggedOver.direction === "up"
                      ? "border-t-4 border-t-slate-500"
                      : draggedOver.idx === index &&
                          draggedOver.direction === "down"
                        ? "border-b-4 border-b-slate-500"
                        : ""
                  } ${selectedCreatureIdx === index ? "bg-slate-800" : ""}`}
                >
                  <TableCell
                    className="font-medium"
                    onClick={handleModifyInitiative(creature.id)}
                  >
                    {creature.initiative}
                  </TableCell>
                  <TableCell className="font-medium">
                    {editNameIdx === index ? (
                      <Input
                        id={`name-edit-input-${index}`}
                        value={nameBuffer}
                        onChange={handleNameEdit}
                        onBlur={() => setEditNameIdx(-1)}
                      ></Input>
                    ) : (
                      creature.name
                    )}
                  </TableCell>
                  <TableCell onClick={handleApplyDamage(creature.id)}>
                    {creature.current_hp}/{creature.hit_points}
                  </TableCell>
                  <TableCell>{creature.armor_class}</TableCell>
                  <TableCell>{creature.tags.join(", ")}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </CreatureContextMenu>
            ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
