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
import { useCallback, useEffect, useState } from "react";

import { EncounterTable } from "~/components/EncounterTable";
import { SideActionBar } from "~/components/SideActionBar";
import { SideButton } from "./SideButton";
import { CreatureSearch } from "./CreatureSearch";

import type { EncounterCreature, Creature } from "~/types/encounterTypes";

import { rollDice, modifierFromScore } from "~/utils/utils";
import { api } from "~/trpc/react";
import clsx from "clsx";

export function HomeView() {
  const [currentTurnIdx, setCurrentTurnIdx] = useState(0);
  const [selectedCreaturesIds, setSelectedCreaturesIds] = useState<string[]>(
    [],
  );
  const [creaturesList, setCreaturesList] = useState<EncounterCreature[]>([]);
  const [expandSidebar, setExpandSidebar] = useState(false);
  const [encounterStarted, setEncounterStarted] = useState(false);

  const [editNameId, setEditNameId] = useState("");
  const [editInitativeId, setEditInitiativeId] = useState("");

  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [addedCreatureId, setAddedCreatureId] = useState("");

  const [creatureSearchValue, setCreatureSearchValue] = useState("");

  const [isCmdOrCtrlPressed, setIsCmdOrCtrlPressed] = useState(false);
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey) {
        setIsCmdOrCtrlPressed(true);
        if (selectedCreaturesIds.length > 0) {
          if (event.key == "i") {
            setEditInitiativeId(
              selectedCreaturesIds[selectedCreaturesIds.length - 1]!,
            );
            setSelectedCreaturesIds([
              selectedCreaturesIds[selectedCreaturesIds.length - 1]!,
            ]);
          } else if (event.key == "o") {
            setEditNameId(selectedCreaturesIds[selectedCreaturesIds.length - 1]!);
            setSelectedCreaturesIds([
              selectedCreaturesIds[selectedCreaturesIds.length - 1]!,
            ]);
          }
        }
      }
      if (event.shiftKey) {
        setIsShiftPressed(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!event.metaKey && !event.ctrlKey) {
        setIsCmdOrCtrlPressed(false);
      }
      if (!event.shiftKey) {
        setIsShiftPressed(false);
      }
    };

    const handleWindowBlur = () => {
      // Reset the modifier keys when the window loses focus
      setIsCmdOrCtrlPressed(false);
      setIsShiftPressed(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleWindowBlur);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleWindowBlur);
    };
  }, [selectedCreaturesIds]);

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
        dummyCreatures.data.map((creature) => buildEncounterCreature(creature)),
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
      handler: useCallback(() => {
        if (selectedCreaturesIds.length > 0) {
          setEditNameId(selectedCreaturesIds[selectedCreaturesIds.length - 1]!);
          setSelectedCreaturesIds([
            selectedCreaturesIds[selectedCreaturesIds.length - 1]!,
          ]);
        }
      }, [setEditNameId, selectedCreaturesIds, setSelectedCreaturesIds]),
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
        setShowLeftPanel(true);
      },
      icon: <FileTextIcon />,
      tooltip: "Open Libary",
    },
    {
      handler: () => {
        if (selectedCreaturesIds.length > 1) {
          const maxSharedInitiative = creaturesList.find(
            (creature) => creature.id === selectedCreaturesIds[0],
          )!.initiative;
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
        if (selectedCreaturesIds.length > 0) {
          const selectedCreaturesIdsCopy = [...selectedCreaturesIds];
          setSelectedCreaturesIds([]);
          setCreaturesList((prev) =>
            prev.filter(
              (creature) => !selectedCreaturesIdsCopy.includes(creature.id),
            ),
          );
        }
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

  useEffect(() => {
    if (selectedCreaturesIds.length > 0) {
      setShowRightPanel(true);
    }
  }, [selectedCreaturesIds, setShowRightPanel]);

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
          className={clsx([
            "hover:bg-slate-full flex rounded-none border-none bg-inherit hover:text-slate-600",
            expandSidebar ? "justify-between" : "justify-center",
          ])}
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
                          creatureSearchValue={creatureSearchValue}
                          setCreatureSearchValue={setCreatureSearchValue}
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
                editInitativeId={editInitativeId}
                setEditInitiativeId={setEditInitiativeId}
                selectedCreaturesIds={selectedCreaturesIds}
                setSelectedCreaturesIds={setSelectedCreaturesIds}
                isCmdOrCtrlPressed={isCmdOrCtrlPressed}
                isShiftPressed={isShiftPressed}
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
                      <h4 className="px-6 py-2">Details</h4>
                    </div>
                    <div className="flex-1 overflow-auto">
                      <div className="space-y-2 px-6 py-4">
                        {selectedCreaturesIds.length > 0 ? (
                          Object.entries(
                            creaturesList.find(
                              (creature) =>
                                creature.id ===
                                selectedCreaturesIds[
                                  selectedCreaturesIds.length - 1
                                ],
                            )!,
                          ).map(([key, value]) => (
                            <div key={key} className="border-b pb-3">
                              <p className="text-slate-500">
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                              </p>
                              <p>{JSON.stringify(value, null, 2)}</p>
                            </div>
                          ))
                        ) : (
                          <span className="font-light text-slate-600">
                            Select a creature to view its information here
                          </span>
                        )}
                      </div>
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
