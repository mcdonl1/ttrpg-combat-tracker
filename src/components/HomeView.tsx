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
} from "@radix-ui/react-icons";
import { EncounterTable } from "~/components/EncounterTable";
import { dummyCreatures } from "~/constants/dummyData";
import { SideActionBar } from "~/components/SideActionBar";
import { useState } from "react";

export function HomeView() {
  const [currentTurnIdx, setCurrentTurnIdx] = useState(0);
  const [creaturesList, setCreaturesList] = useState(dummyCreatures);

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
  ];
  return (
    <ResizablePanelGroup className="h-full" direction="horizontal">
      <ResizablePanel defaultSize={2.5} minSize={2.5}>
        <SideActionBar actions={sidebarActions} />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={95}>
        <ResizablePanelGroup className="h-full" direction="horizontal">
          <ResizablePanel defaultSize={20}>
            <div className="flex h-full flex-col border-r">
              <h4 className="border-b px-6 py-4">Left Panel</h4>
              <div className="flex-1 overflow-auto">
                <div className="space-y-2 px-6 py-4"></div>
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
  );
}
