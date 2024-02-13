"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  DoubleArrowUpIcon,
  DoubleArrowDownIcon,
  StopIcon,
  CursorTextIcon,
  GearIcon,
  Pencil2Icon,
  FileTextIcon,
  Link1Icon,
  LinkBreak1Icon,
  TrashIcon,
  PinLeftIcon,
  PinRightIcon,
  PlayIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

import { EncounterTable } from "~/components/EncounterTable";
import { SideActionBar } from "~/components/SideActionBar";
import { SideButton } from "./SideButton";
import { CreatureSearch } from "./CreatureSearch";

import { type EncounterCreature } from "~/types/encounterTypes";

import { rollDice, modifierFromScore } from "~/utils/utils";
import { api } from "~/trpc/react";

export function HomeView() {
  const [currentTurnIdx, setCurrentTurnIdx] = useState(0);
  const [creaturesList, setCreaturesList] = useState<EncounterCreature[]>([]);
  const [expandSidebar, setExpandSidebar] = useState(false);
  const [encounterStarted, setEncounterStarted] = useState(false);
  const results = api.creatures.getDummyCreautures.useQuery({
    count: 10,
  });

  useEffect(() => {
    if (!results.isLoading && results.data) {
      setCreaturesList(results.data.map((creature) => ({
        ...creature,
        initiative: 0,
        current_hp: creature.hit_points ?? 0,
        tags: [],
        isPlayer: false,
        current_conditions: [],
      })));
    }
  }, [results.isLoading, results.data])
  const sidebarActions = [
    {
      handler: () => {
        setCurrentTurnIdx((prev) =>
          prev - 1 < 0 ? creaturesList.length - 1 : prev - 1,
        );
      },
      icon: <DoubleArrowUpIcon />,
      tooltip: "Previous Turn",
    },
    {
      handler: () => {
        setCurrentTurnIdx((prev) => (prev + 1) % creaturesList.length);
      },
      icon: <DoubleArrowDownIcon />,
      tooltip: "Next Turn",
    },
    {
      handler: () => {
        if (!encounterStarted) {
          setCurrentTurnIdx(0);
          setCreaturesList((prev) =>
            prev.map((creature) => ({
              ...creature,
              initiative:
                (rollDice(1, 20)[0] ?? 10) +
                (creature.initiative_modifier ??
                  modifierFromScore(creature.dexterity ?? 10)),
            })),
          );
        }
        setEncounterStarted((prev) => !prev);
      },
      icon: encounterStarted ? <StopIcon /> : <PlayIcon />,
      tooltip: encounterStarted ? "End Encounter" : "Start Encounter",
    },
    {
      handler: () => {
        console.log("edit name");
      },
      icon: <CursorTextIcon />,
      tooltip: "Edit Name",
    },
    {
      handler: () => {
        console.log("edit creature");
      },
      icon: <Pencil2Icon />,
      tooltip: "Edit Creature",
    },
    {
      handler: () => {
        console.log("edit statblock");
      },
      icon: <FileTextIcon />,
      tooltip: "Edit Statblock",
    },
    {
      handler: () => {
        console.log("link initiative");
      },
      icon: <Link1Icon />,
      tooltip: "Link Initiative",
    },
    {
      handler: () => {
        console.log("unlink initiative");
      },
      icon: <LinkBreak1Icon />,
      tooltip: "Unlink Initiative",
    },
    {
      handler: () => {
        console.log("remove creature");
      },
      icon: <TrashIcon />,
      tooltip: "Remove",
    },
    {
      handler: () => {
        console.log("edit settings");
      },
      icon: <GearIcon />,
      tooltip: "Edit Settings",
    },
  ];
  console.log("creaturesList", creaturesList);
  return (
    <div className="flex h-full">
      <div className={`${expandSidebar ? "" : "w-[36px]"}`}>
        <SideActionBar actions={sidebarActions} expanded={expandSidebar} />
        <SideButton onClick={() => setExpandSidebar((prev) => !prev)}>
          {expandSidebar ? <PinLeftIcon /> : <PinRightIcon />}
        </SideButton>
      </div>
      <ResizablePanelGroup className="h-full" direction="horizontal">
        <ResizablePanel defaultSize={95}>
          <ResizablePanelGroup className="h-full" direction="horizontal">
            <ResizablePanel defaultSize={20}>
              <div className="flex h-full flex-col border-r p-2">
                <h4 className="border-b px-6 py-4">Library</h4>
                <div className="flex-1 overflow-auto">
                  <div className="space-y-2 py-4">
                    <CreatureSearch />
                  </div>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={60}>
              <EncounterTable
                creaturesList={creaturesList}
                setCreaturesList={setCreaturesList}
                currentTurnIdx={currentTurnIdx}
              />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={20}>
              <div className="flex h-full flex-col border-l">
                <h4 className="border-b px-6 py-4">Right Panel</h4>
                <div className="flex-1 overflow-auto">
                  <div className="space-y-2 px-6 py-4">Some content</div>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
