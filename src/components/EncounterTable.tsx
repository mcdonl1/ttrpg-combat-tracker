"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { EncounterCreature, EncounterList } from "~/types/encounterTypes";
import { CreatureContextMenu } from "./CreatureContextMenu";
import { EditableField } from "./EditableField";
import { HpCell } from "./hpCell";
import { ScrollArea } from "~/@/components/ui/scroll-area";
import clsx from "clsx";
import { UserPrompt } from "./UserPrompt";

const defaultTagOptions = ["Frightened", "Poisoned", "Stunned", "Prone", "Invisible", "Concentrating"];

export function EncounterTable({
  creaturesList,
  setCreaturesList,
  currentTurnIdx,
  editNameId,
  setEditNameId,
  editInitativeId,
  setEditInitiativeId,
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
  editInitativeId: string;
  setEditInitiativeId: React.Dispatch<React.SetStateAction<string>>;
  selectedCreaturesIds: string[];
  setSelectedCreaturesIds: React.Dispatch<React.SetStateAction<string[]>>;
  isCmdOrCtrlPressed: boolean;
  isShiftPressed: boolean;
}) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDone(true);
    }, 3000);
    return () => clearTimeout(timer);
  });
  const [draggedOver, setDraggedOver] = useState({
    idx: -1,
    direction: "none",
  });
  const [isDraggingIdx, setIsDraggingIdx] = useState(-1);

  const handleApplyDamage = (creatureId: string, amount: number) => {
    setCreaturesList((prevList) => {
      const idx = prevList.findIndex((c) => c.id === creatureId);
      if (idx === -1 || prevList[idx] === undefined) {
        return prevList;
      }

      // Create a new copy of the creature object
      const updatedCreature = { ...prevList[idx] };
      updatedCreature.current_hp = Math.max(updatedCreature.current_hp! - amount, 0);

      // Create a new copy of the creatures list
      const updatedList = [...prevList];
      updatedList[idx] = updatedCreature as EncounterCreature;

      return updatedList;
    });
  };

  useEffect(() => {
    const keyListener = (e: KeyboardEvent) => {
      if (e.key === "Escape" && editNameId === "" && editInitativeId === "") {
        setSelectedCreaturesIds([]);
      }

      if ((e.key === "Delete") && editNameId === "" && editInitativeId === "") {
        setCreaturesList((prevList) =>
          prevList.filter(
            (creature) => !selectedCreaturesIds.includes(creature.id),
          ),
        );
        setSelectedCreaturesIds([]);
      }
    }
    if (selectedCreaturesIds.length > 0) {
      window.addEventListener("keydown", keyListener);
    } else {
      window.removeEventListener("keydown", keyListener);
    }
    return () => {
      window.removeEventListener("keydown", keyListener);
    };
  }, [selectedCreaturesIds, setCreaturesList, setSelectedCreaturesIds, editNameId, editInitativeId])

  const handleModifyStatblock = (creatureId: string) => () => {
    console.log("modify statblock for creature", creatureId);
  };

  const handleModifyInitiative = (creatureId: string) => () => {
    setEditInitiativeId(creatureId);
  };

  const handleTagChange = (creatureId: string, tag: string) => {
    setCreaturesList((prevList) => {
      const idx = prevList.findIndex((c) => c.id === creatureId);
      if (idx === -1 || prevList[idx] === undefined) {
        return prevList;
      }

      const updatedCreature = { ...prevList[idx] };
      if (updatedCreature.tags!.includes(tag)) {
        updatedCreature.tags = updatedCreature.tags!.filter((t) => t !== tag);
      } else {
        updatedCreature.tags = [...updatedCreature.tags!, tag];
      }

      const updatedList = [...prevList];
      updatedList[idx] = updatedCreature as EncounterCreature;

      return updatedList;
    })
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
        return creaturesList.slice(min, max + 1).map((creature) => creature.id);
      } else {
        return [id];
      }
    });
  };

  const handleOpenApplyDamage = (creatureId: string) => () => {
    console.log("open apply damage for creature", creatureId);
  }
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
                handleOpenApplyDamage={handleOpenApplyDamage}
                handleModifyStatblock={handleModifyStatblock}
                handleModifyInitiative={handleModifyInitiative}
                handleAddTag={() => console.log("add tag")}
                handleTagChange={handleTagChange}
                handleEditName={() => setEditNameId(creature.id)}
                tagOptions={defaultTagOptions}
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
                    onDoubleClick={() => setEditInitiativeId(creature.id)}
                  >
                    <EditableField
                      className="w-full"
                      initialValue={creature.initiative.toString()}
                      isEditing={editInitativeId === creature.id}
                      cancelEdit={() => setEditInitiativeId("")}
                      onCommit={(value) => {
                        setCreaturesList((prevList) => {
                          const newCreature = { ...creature, initiative: parseInt(value) };
                          const idx = prevList.findIndex((c) => c.id === creature.id);
                          prevList[idx] = newCreature;
                          return prevList;
                        });
                      }}
                      formId={creature.id}
                    />
                  </TableCell>
                  <TableCell
                    className="font-medium"
                    onDoubleClick={() => setEditNameId(creature.id)}
                  >
                    <EditableField
                      className="w-full"
                      initialValue={creature.name}
                      isEditing={editNameId === creature.id}
                      cancelEdit={() => setEditNameId("")}
                      formId={creature.id}
                    />
                  </TableCell>
                  <TableCell>
                    <HpCell
                      currentHp={creature.current_hp}
                      maxHp={creature.hit_points ?? 0}
                      applyDamage={(amount) => {
                        handleApplyDamage(creature.id, amount);
                      }}
                    />
                  </TableCell>
                  <TableCell>{creature.armor_class}</TableCell>
                  <TableCell className="text-secondary">{creature.tags.join(", ")}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </CreatureContextMenu>
            ))}
        </TableBody>
      </Table>
      <div className="h-full flex flex-col gap-6 pt-5 items-center">
        {
          done && <UserPrompt promptText="Apply healing for Dragon" onSubmit={val => console.log(val)} />
        }
      </div>
    </ScrollArea>
  );
}
