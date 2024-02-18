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

import type { EncounterCreature, Creature } from "~/types/encounterTypes";

import { rollDice, modifierFromScore } from "~/utils/utils";
import { api } from "~/trpc/react";
import clsx from "clsx";
import { set } from "zod";

export function HomeView() {
  const [currentTurnIdx, setCurrentTurnIdx] = useState(0);
  const [selectedCreaturesIds, setSelectedCreaturesIds] = useState<string[]>([]);
  const [creaturesList, setCreaturesList] = useState<EncounterCreature[]>([]);
  const [expandSidebar, setExpandSidebar] = useState(false);
  const [encounterStarted, setEncounterStarted] = useState(false);
  const [editNameId, setEditNameId] = useState("");
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [addedCreatureId, setAddedCreatureId] = useState("");

  const [isCmdOrCtrlPressed, setIsCmdOrCtrlPressed] = useState(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.metaKey || event.ctrlKey) {
      setIsCmdOrCtrlPressed(true);
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (!event.metaKey && !event.ctrlKey) {
      setIsCmdOrCtrlPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const dummyCreatures = api.creatures.getDummyCreatures.useQuery(
    {
      count: 10,
    },
    {
      cacheTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      keepPreviousData: true,
    },
  );

  const addedCreature = api.creatures.getCreaureById.useQuery(
    { id: addedCreatureId },
    {
      enabled: addedCreatureId.length > 0,
    },
  );

  useEffect(() => {
    if (!dummyCreatures.isLoading && dummyCreatures.data) {
      setCreaturesList(
        dummyCreatures.data.map((creature) => (buildEncounterCreature(creature))),
      );
    }
  }, [dummyCreatures.isLoading, dummyCreatures.data]);
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
        if (selectedCreaturesIds.length > 0) {
          setEditNameId(selectedCreaturesIds[selectedCreaturesIds.length - 1]!);
        }
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
        if (selectedCreaturesIds.length > 1) {
          const maxSharedInitiative = creaturesList.find(creature => creature.id === selectedCreaturesIds[0])!.initiative;
          setCreaturesList((prev) =>
            prev.map((creature) => {
              if (selectedCreaturesIds.includes(creature.id)) {
                return {
                  ...creature,
                  initiative: maxSharedInitiative,
                };
              }
              return creature;
            }),
          );
        }
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

  const buildEncounterCreature = (creature: Creature) => {
    return {
      ...creature,
      initiative: 0,
      current_hp: creature.hit_points ?? 0,
      tags: [],
      isPlayer: false,
      current_conditions: [],
    };
  };

  const handleClickSearchOption = (creatureId: string) => {
    setAddedCreatureId(creatureId);
  };

  useEffect(() => {
    if (
      !addedCreature.isError &&
      !addedCreature.isLoading &&
      addedCreature.data
    ) {
      setCreaturesList((prev) => [
        ...prev,
        buildEncounterCreature(addedCreature.data as Creature),
      ]);
    }
  }, [addedCreature.data, addedCreature.isLoading, addedCreature.isError]);

  return (
    <div className="flex h-full">
      <div
        className={clsx([
          "flex flex-col bg-slate-900",
          expandSidebar ? "w-[12rem]" : "w-[36px]",
        ])}
      >
        <SideActionBar actions={sidebarActions} expanded={expandSidebar} />
        <SideButton
          onClick={() => setExpandSidebar((prev) => !prev)}
          expanded={expandSidebar}
          displayText="Collapse"
          title={expandSidebar ? "Collapse" : "Expand"}
          className="hover:bg-slate-full flex justify-between rounded-none border-none bg-inherit hover:text-slate-600"
        >
          {expandSidebar ? <PinLeftIcon /> : <PinRightIcon />}
        </SideButton>
      </div>
      <ResizablePanelGroup className="h-full" direction="horizontal">
        <ResizablePanel defaultSize={95}>
          <ResizablePanelGroup className="h-full" direction="horizontal">
            {showLeftPanel && (
              <>
                <ResizablePanel defaultSize={20}>
                  <div className="flex h-full flex-col border-r">
                    <div className="flex justify-between border-b">
                      <h4 className="px-6 py-2">Library</h4>
                      <SideButton
                        onClick={() => setShowLeftPanel((prev) => !prev)}
                        className="hover:bg-slate-full h-full w-[36px] rounded-none border-none hover:text-slate-600"
                      >
                        <PinLeftIcon />
                      </SideButton>
                    </div>

                    <div className="flex-1 overflow-auto px-1">
                      <div className="space-y-2 py-4">
                        <CreatureSearch
                          optionClickHandler={handleClickSearchOption}
                        />
                      </div>
                    </div>
                  </div>
                </ResizablePanel>
                <ResizableHandle />
              </>
            )}
            <ResizablePanel defaultSize={60}>
              <EncounterTable
                creaturesList={creaturesList}
                setCreaturesList={setCreaturesList}
                currentTurnIdx={currentTurnIdx}
                editNameId={editNameId}
                setEditNameId={setEditNameId}
                selectedCreaturesIds={selectedCreaturesIds}
                setSelectedCreaturesIds={setSelectedCreaturesIds}
                isCmdOrCtrlPressed={isCmdOrCtrlPressed}                
              />
            </ResizablePanel>
            {showRightPanel && (
              <>
                <ResizableHandle />
                <ResizablePanel defaultSize={20}>
                  <div className="flex h-full flex-col border-l">
                    <div className="flex justify-between border-b">
                      <SideButton
                        onClick={() => setShowRightPanel((prev) => !prev)}
                        className="hover:bg-slate-full h-full w-[36px] rounded-none border-none hover:text-slate-600"
                      >
                        <PinRightIcon />
                      </SideButton>
                      <h4 className="px-6 py-2">Right Panel</h4>
                    </div>
                    <div className="flex-1 overflow-auto">
                      <div className="space-y-2 px-6 py-4">Some content</div>
                    </div>
                  </div>
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
