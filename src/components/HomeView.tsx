"use client";

import Link from "next/link";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { EncounterTable } from "~/components/EncounterTable";
import { dummyCreatures } from "~/constants/dummyData";

export function HomeView() {
  return (
    <ResizablePanelGroup className="h-full" direction="horizontal">
      <ResizablePanel defaultSize={20}>
        <div className="flex h-full flex-col border-r">
          <h4 className="border-b px-6 py-4">
            <div className="sparmor_classe-y-2 px-6 py-4">Left Panel</div>
          </h4>
          <div className="flex-1 overflow-auto">
            <div className="sparmor_classe-y-2 px-6 py-4">Some content</div>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={60}>
        <EncounterTable creaturesList={dummyCreatures} />
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
