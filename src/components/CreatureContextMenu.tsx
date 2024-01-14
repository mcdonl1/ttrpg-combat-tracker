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

export function CreatureContextMenu({
  children,
  creatureId,
  handleApplyDamage,
  handleModifyStatblock,
  handleModifyInitiative,
  handleAddTag,
  handleTagChange,
}: {
  children?: React.ReactNode;
  creatureId: number;
  handleApplyDamage: (creatureId: number) => () => void;
  handleModifyStatblock: (creatureId: number) => () => void;
  handleModifyInitiative: (creatureId: number) => () => void;
  handleAddTag: (creatureId: number) => () => void;
  handleTagChange: (e: React.FormEvent, creatureId: number) => void;
}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem onClick={handleApplyDamage(creatureId)}>
          Apply Damage to {creatureId}
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
