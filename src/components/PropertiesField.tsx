"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "~/@/components/ui/input"

type Option = { label: string, value: string };
type Property = { key: string, value: any };

function RowField({ row, validKeys, keyClassName, valueClassName }: { row: Property, validKeys: Option[], keyClassName?: string, valueClassName?: string }) {
  const [open, setOpen] = React.useState(false);
  const [key, setKey] = React.useState(row.key);
  return <div className="flex gap-2 flex-wrap">
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-24 justify-between",
            key && "text-muted-foreground",
            keyClassName ? keyClassName : ""
          )}
        >
          {key
            ? validKeys!.find(
              (option) => option.value === key
            )?.label
            : "Select option"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search for an option"
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>Not a valid option.</CommandEmpty>
            <CommandGroup>
              {validKeys!.map((option, index) => (
                <CommandItem
                  value={option.value}
                  key={option.value + "key" + index}
                  onSelect={() => {
                    setKey(option.value === key ? "" : option.value)
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      option.value === key
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    <Input
      className={cn(valueClassName ? valueClassName : "")}
      value={row.value}
      onChange={e => console.log(e.target.value)}
    />
  </div>
}

export function PropertiesField({ object, form, validKeys, name }: { object: any, form: any, validKeys?: Option[], name: string }) {
  const [rows, setRows] = React.useState<Property[]>(
    Object.entries(object).map(([key, value]) => {
      return { key, value };
    }
    ));
  console.log(...validKeys!.filter(option => !Object.keys(object).includes(option.value)))

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return <div className="flex gap-2 flex-col">
    {rows.map((row) => {
      return (
        <RowField
          row={row}
          validKeys={validKeys!.filter(option => !Object.keys(object).includes(option.value) || option.value === row.key)}
          key={row.key}
          keyClassName="w-24"
          valueClassName="w-24"
        />
      );
    })}
    <Button
      onClick={() => {
        setRows([...rows, { key: "", value: "" }]);
      }}
    >
      Add new {name}
    </Button>
  </div>

}
