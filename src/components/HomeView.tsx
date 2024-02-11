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
} from "@radix-ui/react-icons";
import { useState } from "react";

import { EncounterTable } from "~/components/EncounterTable";
import { dummyCreatures } from "~/constants/dummyData";
import { SideActionBar } from "~/components/SideActionBar";
import { SideButton } from "./SideButton";
import { CreatureSearch } from "./CreatureSearch";

export function HomeView() {
  const [currentTurnIdx, setCurrentTurnIdx] = useState(0);
  const [creaturesList, setCreaturesList] = useState(dummyCreatures);
  const [expandSidebar, setExpandSidebar] = useState(false);
  const [encounterStarted, setEncounterStarted] = useState(false);

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
        console.log("end encounter");
      },
      icon: <StopIcon />,
      tooltip: "End Encounter",
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
                <h4 className="border-b px-6 py-4">Left Panel</h4>
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
