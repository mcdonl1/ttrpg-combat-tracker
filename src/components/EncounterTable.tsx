import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "~/@/components/ui/badge";

import type { EncounterCreature, EncounterList } from "~/types/encounterTypes";
import { CreatureContextMenu } from "./CreatureContextMenu";
import { EditableField } from "./EditableField";
import { HpCell } from "./hpCell";
import { ScrollArea } from "~/@/components/ui/scroll-area";
import { arrayMove } from "~/utils/utils";
import clsx from "clsx";

import { api } from "~/trpc/react";


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
  handleAddTag,
  setCreatureEdit,
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
  handleAddTag: () => void;
  setCreatureEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) {

  const tagQuery = api.tags.getTags.useQuery(undefined, {
      cacheTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      keepPreviousData: true,
  });
  const tagOptions = tagQuery.data ?? [];

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
            (creature) => !selectedCreaturesIds.includes(creature.localId),
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

  const handleModifyStatblock = (creatureId: string) => {
    setSelectedCreaturesIds([creatureId]);
    setCreatureEdit(true);
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
      newList = arrayMove(newList, isDraggingIdx, onCreatureIdx);
      return newList;
    });
  };

  const handleSelect = (id: string) => {
    setSelectedCreaturesIds((prev) => {
      if (isCmdOrCtrlPressed) {
        return [...prev, id].sort(
          (a, b) =>
            creaturesList.findIndex((creature) => creature.localId === a) -
            creaturesList.findIndex((creature) => creature.localId === b),
        );
      } else if (isShiftPressed) {
        const firstSelectedIdx = creaturesList.findIndex(
          (creature) => creature.localId === prev[0],
        );
        const currentIdx = creaturesList.findIndex(
          (creature) => creature.localId === id,
        );
        const min = Math.min(firstSelectedIdx, currentIdx);
        const max = Math.max(firstSelectedIdx, currentIdx);
        return creaturesList.slice(min, max + 1).map((creature) => creature.localId);
      } else {
        return [id];
      }
    });
  };

  const handleOpenApplyDamage = (creatureId: string) => () => {
    console.log("open apply damage for creature", creatureId);
  }
  return (
    <ScrollArea>
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
            .map((creature, index) => {
              const isSelected = selectedCreaturesIds.includes(creature.localId);
              const isCurrentTurn = currentTurnIdx === index;
              const isPrevTurn = currentTurnIdx - 1 === index;
              const isDraggedOverUp = draggedOver.idx === index && draggedOver.direction === "up";
              const isDraggedOverDown = draggedOver.idx === index && draggedOver.direction === "down";
              return <CreatureContextMenu
                key={creature.localId + index.toString()}
                creature={creature}
                handleOpenApplyDamage={handleOpenApplyDamage}
                handleModifyStatblock={handleModifyStatblock}
                handleModifyInitiative={handleModifyInitiative}
                handleAddTag={handleAddTag}
                handleTagChange={handleTagChange}
                handleEditName={() => setEditNameId(creature.localId)}
                tagOptions={tagOptions}
              >
                <TableRow
                  draggable
                  onClick={() => handleSelect(creature.localId)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragStart={(e) => handleDrag(e, index)}
                  className={clsx([
                    "box-border border-2 border-transparent",
                      isCurrentTurn
                      ? "border-slate-500 bg-slate-900"
                      : "",
                    isPrevTurn ? "border-b-slate-500" : "",
                    isDraggedOverUp
                      ? "border-t-4 border-t-slate-500"
                      : isDraggedOverDown
                        ? "border-b-4 border-b-slate-500"
                        : "",
                      isSelected
                      ? "bg-slate-800 hover:bg-slate-800"
                      : "",
                  ])}
                >
                  <TableCell
                    className="font-medium"
                    onDoubleClick={() => setEditInitiativeId(creature.localId)}
                  >
                    <EditableField
                      className="w-full"
                      initialValue={creature.initiative.toString()}
                      isEditing={editInitativeId === creature.localId}
                      cancelEdit={() => setEditInitiativeId("")}
                      onCommit={(value) => {
                        setCreaturesList((prevList) => {
                          const newCreature = { ...creature, initiative: parseInt(value) };
                          const idx = prevList.findIndex((c) => c.id === creature.localId);
                          prevList[idx] = newCreature;
                          return prevList;
                        });
                      }}
                      formId={creature.localId}
                    />
                  </TableCell>
                  <TableCell
                    className="font-medium"
                    onDoubleClick={() => setEditNameId(creature.localId)}
                  >
                    <EditableField
                      className="w-full"
                      initialValue={creature.name}
                      isEditing={editNameId === creature.localId}
                      cancelEdit={() => setEditNameId("")}
                      formId={creature.localId}
                    />
                  </TableCell>
                  <TableCell>
                    <HpCell
                      currentHp={creature.current_hp}
                      maxHp={creature.hit_points ?? 0}
                      applyDamage={(amount) => {
                        handleApplyDamage(creature.localId, amount);
                      }}
                    />
                  </TableCell>
                  <TableCell>{creature.armor_class}</TableCell>
                  <TableCell className="text-secondary flex justify-start gap-1">
                    {creature.tags.map(tag =>
                      <Badge
                        className={clsx([
                          isSelected
                            ? "bg-slate-700"
                            : isCurrentTurn
                              ? "bg-slate-700"
                              : "bg-slate-900",
                        ])}
                        variant={"secondary"}
                      >
                        {tag}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </CreatureContextMenu>
            })}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
