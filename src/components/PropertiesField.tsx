"use client"
 
import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
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

function RowField ({row, validKeys }: { row: Property, validKeys: Option[] }) {
  return <div className="flex gap-2 flex-wrap">
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-24 justify-between",
            !row.key && "text-muted-foreground"
          )}
        >
          {row.key
            ? validKeys!.find(
              (option) => option.value === row.key
            )?.label
            : "Select option"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            className="h-9"
          />
          <CommandEmpty>Not a valid option.</CommandEmpty>
          <CommandGroup>
            {validKeys!.map((option) => (
              <CommandItem
                value={option.label}
                key={option.value}
                onSelect={() => {
                  console.log(option.value);
                }}
              >
                {option.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    option.value === row.key
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
    <Input
      className="w-24"
      value={row.value}
      onChange={e => console.log(e.target.value)}
    />
  </div>
}

export function PropertiesField ({ object, form, validKeys, name }: { object: any, form: any, validKeys?: Option[], name: string}) {
  const [rows, setRows] = React.useState<Property[]>(
    Object.entries(object).map(([key, value]) => {
      return { key, value };
    }
  ));
  console.log(object);
  console.log(rows);
  
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return <div className="flex gap-2 flex-col">
    {rows.map((row) => {
      return (
        <RowField
          row={row}
          validKeys={validKeys!}
          key={row.key}
        />
      );
    })}

  </div>

}
