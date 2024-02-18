"use client";

import { useState } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";

import { useDebounce } from "@uidotdev/usehooks";
import { api } from "~/trpc/react";

export function CreatureSearch() {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const results = api.creatures.getCreatureSearch.useQuery(
    {
      searchTerm: debouncedSearchValue,
    },
    {
      enabled: debouncedSearchValue.length > 2,
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
        {!results.isLoading && (results.data?.length ?? 0) > 0 ? (
          <div className="flex w-full justify-between pl-[1.2rem] pr-8 pt-2 text-slate-600">
            <span>Creature Name</span>
            <span>CR</span>
          </div>
        ) : null}
      </div>
      <div className="max-h-[calc(90vh-6rem)] overflow-y-auto">
        <ul>
          {results.isLoading
            ? null
            : results.data?.map((result, index) => (
                <li
                  key={result.name + index}
                  className="flex justify-between px-6 py-2"
                >
                  <span className=" text-slate-300">{result.name}</span>
                  <span className="text-sm font-light text-slate-400">
                    {result.challenge_rating}
                  </span>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
}
