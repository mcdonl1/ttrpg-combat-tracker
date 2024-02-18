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
import clsx from "clsx";

export function EncounterTable({
  creaturesList,
  setCreaturesList,
  currentTurnIdx,
  editNameId,
  setEditNameId,
  selectedCreaturesIds,
  setSelectedCreaturesIds,
  isCmdOrCtrlPressed,
  isShiftPressed,
}: {
  creaturesList: EncounterList;
  setCreaturesList: React.Dispatch<React.SetStateAction<EncounterList>>;
  currentTurnIdx: number;
  editNameId: string;
  setEditNameId: React.Dispatch<React.SetStateAction<string>>;
  selectedCreaturesIds: string[];
  setSelectedCreaturesIds: React.Dispatch<React.SetStateAction<string[]>>;
  isCmdOrCtrlPressed: boolean;
  isShiftPressed: boolean;
}) {
  const [draggedOver, setDraggedOver] = useState({
    idx: -1,
    direction: "none",
  });
  const [isDraggingIdx, setIsDraggingIdx] = useState(-1);
  const [nameBuffer, setNameBuffer] = useState("");

  const eventListener = useCallback(
    (e: KeyboardEvent) => {
      if (editNameId.length > 0) {
        if (e.key === "Escape") {
          setEditNameId("");
        }
        if (e.key === "Enter") {
          setCreaturesList((prevList) => {
            const newList = [...prevList];
            newList.find((creature) => creature.id === editNameId)!.name =
              nameBuffer;
            return newList;
          });
          setEditNameId("");
        }
      }
    },
    [editNameId, setCreaturesList, setEditNameId, nameBuffer],
  );

  useEffect(() => {
    if (editNameId.length > 0) {
      setNameBuffer(
        creaturesList.find((creature) => creature.id === editNameId)!.name,
      );
      const el = document.getElementById(`name-edit-input-${editNameId}`);
      el?.focus();
      window.addEventListener("keydown", eventListener, true);
      return () => {
        window.removeEventListener("keydown", eventListener, true);
      };
    }
  }, [
    editNameId,
    creaturesList,
    setCreaturesList,
    setEditNameId,
    eventListener,
  ]);

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

    setEditNameId("");
  };

  const handleSelect = (id: string) => {
    setSelectedCreaturesIds((prev) => {
      if (isCmdOrCtrlPressed) {
        return [...prev, id].sort(
          (a, b) =>
            creaturesList.findIndex((creature) => creature.id === a) -
            creaturesList.findIndex((creature) => creature.id === b),
        );
      } else if (isShiftPressed) {
        const firstSelectedIdx = creaturesList.findIndex(
          (creature) => creature.id === prev[0],
        );
        const currentIdx = creaturesList.findIndex(
          (creature) => creature.id === id,
        );
        const min = Math.min(firstSelectedIdx, currentIdx);
        const max = Math.max(firstSelectedIdx, currentIdx);
        return creaturesList
          .slice(min, max + 1)
          .map((creature) => creature.id);
      } else {
        return [id];
      }
    });
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
                  onClick={() => handleSelect(creature.id)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={(e) => handleDragOff(e)}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragStart={(e) => handleDrag(e, index)}
                  className={clsx([
                    "box-border border-2 border-transparent",
                    currentTurnIdx === index
                      ? "border-slate-500 bg-slate-900"
                      : "",
                    currentTurnIdx - 1 === index ? "border-b-slate-500" : "",
                    draggedOver.idx === index && draggedOver.direction === "up"
                      ? "border-t-4 border-t-slate-500"
                      : draggedOver.idx === index &&
                          draggedOver.direction === "down"
                        ? "border-b-4 border-b-slate-500"
                        : "",
                    selectedCreaturesIds.includes(creature.id)
                      ? "bg-slate-800 hover:bg-slate-800"
                      : "",
                  ])}
                >
                  <TableCell
                    className="font-medium"
                    onClick={handleModifyInitiative(creature.id)}
                  >
                    {creature.initiative}
                  </TableCell>
                  <TableCell className="font-medium">
                    {editNameId === creature.id ? (
                      <Input
                        id={`name-edit-input-${index}`}
                        value={nameBuffer}
                        onChange={handleNameEdit}
                        onBlur={() => setEditNameId("")}
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
