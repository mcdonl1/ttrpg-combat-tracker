"use client";

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import type { Creature } from "~/types/encounterTypes";

export function CreatureContextMenu({
  children,
  creature,
  handleApplyDamage,
  handleModifyStatblock,
  handleModifyInitiative,
  handleAddTag,
  handleTagChange,
  className,
}: {
  children?: React.ReactNode;
  creature: Creature;
  handleApplyDamage: (creatureId: number) => () => void;
  handleModifyStatblock: (creatureId: number) => () => void;
  handleModifyInitiative: (creatureId: number) => () => void;
  handleAddTag: (creatureId: number) => () => void;
  handleTagChange: (e: React.FormEvent, creatureId: number) => void;
  className?: string;
}) {
  const { id: creatureId, name } = creature;
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild className={className}>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuLabel>{name}</ContextMenuLabel>
        <ContextMenuItem onClick={handleApplyDamage(creatureId)}>
          Apply Damage
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onClick={handleModifyStatblock(creatureId)}>
          Modify Statblock
          <ContextMenuShortcut>⌘M</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onClick={handleModifyInitiative(creatureId)}>
          Modify Initiative
          <ContextMenuShortcut>⌘I</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSub>
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
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem>
          Rename
          <ContextMenuShortcut>⌘O</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem onClick={handleAddTag(creatureId)}>
          Add Tag
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup
          value="tags"
          onChange={(e) => handleTagChange(e, creatureId)}
        >
          <ContextMenuLabel>Tags</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuRadioItem value="frightened">
            Frightened
          </ContextMenuRadioItem>
          <ContextMenuRadioItem value="prone">Prone</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
