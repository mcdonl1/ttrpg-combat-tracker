"use client";

import { useState } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";

import type { Creature } from "~/types/encounterTypes";
import { api } from "~/trpc/react";

export function CreatureSearch() {
  const [searchValue, setSearchValue] = useState("");
  const results = api.creatures.getCreatureSearch.useQuery(
    {
      searchTerm: searchValue,
    },
    {
      enabled: searchValue.length > 2,
    },
  );
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const searchValue = e.target.value;
    if (searchValue.length < 3) {
      return;
    }
    setSearchValue(searchValue);
  };
  return (
    <div>
      <div className="relative px-1">
        <MagnifyingGlassIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search" className="pl-8" onChange={handleSearch} />
      </div>
      <div className="max-h-[calc(90vh-6rem)] overflow-y-auto">
        <ul>
          {results.isLoading
            ? null
            : results.data?.map((result: Creature) => (
                <li key={result.id} className="px-6 py-2">
                  {result.name}
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}
