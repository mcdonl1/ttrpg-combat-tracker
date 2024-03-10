"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuCheckboxItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import type { EncounterCreature } from "~/types/encounterTypes";

export function CreatureContextMenu({
  children,
  creature,
  handleOpenApplyDamage,
  handleModifyStatblock,
  handleModifyInitiative,
  handleAddTag,
  handleTagChange,
  handleEditName,
  className,
  tagOptions,
}: {
  children?: React.ReactNode;
  creature: EncounterCreature;
  handleOpenApplyDamage: (creatureId: string) =>  void;
  handleModifyStatblock: (creatureId: string) =>  void;
  handleModifyInitiative: (creatureId: string) =>  void;
  handleAddTag: () => void;
  handleTagChange: (creatureId: string, tag: string) => void;
  handleEditName: () => void;
  className?: string;
  tagOptions: string[];
}) {
  const { id: creatureId, name, tags } = creature;
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild className={className}>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuLabel>{name}</ContextMenuLabel>
        <ContextMenuItem onClick={() => handleOpenApplyDamage(creatureId)}>
          Apply Damage
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onClick={() => handleModifyStatblock(creatureId)}>
          Modify Statblock
          <ContextMenuShortcut>⌘M</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onClick={() => handleModifyInitiative(creatureId)}>
          Modify Initiative
          <ContextMenuShortcut>⌘I</ContextMenuShortcut>
        </ContextMenuItem>
        {/* <ContextMenuSub>
          <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>
              Do something
              <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>Rename</ContextMenuItem>
            <ContextMenuItem>Name Window...</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>Developer Tools</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub> */}
        <ContextMenuSeparator />
        <ContextMenuItem onClick={() => handleEditName()}>
          Rename
          <ContextMenuShortcut>⌘O</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onClick={handleAddTag}>
          Add Tag
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuLabel>Tags</ContextMenuLabel>
        <ContextMenuSeparator />
        {tagOptions.map((tag) => (
          <ContextMenuCheckboxItem
            key={tag}
            checked={tags.includes(tag)}
            onClick={() => handleTagChange(creatureId, tag)}
          >
            {tag}
          </ContextMenuCheckboxItem>
        ))}
        <ContextMenuCheckboxItem checked={tags.includes("Frightened")}>
          Frightened
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem checked={tags.includes("Prone")}>Prone</ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
