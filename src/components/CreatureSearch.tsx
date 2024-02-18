"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";

import { useDebounce } from "@uidotdev/usehooks";
import { api } from "~/trpc/react";

export function CreatureSearch({
  optionClickHandler,
  creatureSearchValue,
  setCreatureSearchValue,
}: {
  optionClickHandler: (creatureId: string) => void;
  creatureSearchValue: string;
  setCreatureSearchValue: (value: string) => void;
}) {
  const debouncedSearchValue = useDebounce(creatureSearchValue, 500);
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
    const creatureSearchValue = e.target.value;
    if (creatureSearchValue.length < 3) {
      return;
    }
    setCreatureSearchValue(creatureSearchValue);
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
            : results.data?.map(result => (
                <li
                  key={result.id}
                  className="flex justify-between px-6 py-2 hover:bg-slate-900 cursor-pointer transition-colors align-text-bottom"
                  onClick={() => optionClickHandler(result.id)}
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
