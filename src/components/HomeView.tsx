"use client";

import Link from "next/link";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { EncounterTable } from "~/components/EncounterTable";
import { dummyCreatures } from "~/constants/dummyData";
import { useState } from "react";
import { Button } from "~/@/components/ui/button";
import { DoubleArrowUpIcon, DoubleArrowDownIcon } from "@radix-ui/react-icons";

export function HomeView() {
  const [currentTurnIdx, setCurrentTurnIdx] = useState(0);
  const [creaturesList, setCreaturesList] = useState(dummyCreatures);
  return (
    <ResizablePanelGroup className="h-full" direction="horizontal">
      <ResizablePanel defaultSize={20}>
        <div className="flex h-full flex-col border-r">
          <h4 className="border-b px-6 py-4">
            <div className="sparmor_classe-y-2 px-6 py-4">Left Panel</div>
          </h4>
          <div className="flex-1 overflow-auto">
            <div className="sparmor_classe-y-2 px-6 py-4">
              <Button
                onClick={() =>
                  setCurrentTurnIdx((currentTurnIdx + 1) % creaturesList.length)
                }
                variant="outline"
              >
                <DoubleArrowDownIcon className="bg-inherit" />
              </Button>
              <Button
                onClick={() =>
                  setCurrentTurnIdx(
                    currentTurnIdx - 1 < 0
                      ? creaturesList.length - 1
                      : currentTurnIdx - 1,
                  )
                }
                variant="outline"
              >
                <DoubleArrowUpIcon className="bg-inherit" />
              </Button>
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
            <div className="sparmor_classe-y-2 px-6 py-4">Some content</div>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
