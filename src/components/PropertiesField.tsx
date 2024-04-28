import * as React from "react"
import { CaretSortIcon, CheckIcon, Cross1Icon, PlusIcon} from "@radix-ui/react-icons"

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

import { Input } from "~/@/components/ui/input"

type Option = { label: string, value: string };
type Property = { key: string, value: string | number};

function RowField({
    row,
    validKeys,
    keyClassName,
    valueClassName,
    handleChange,
    handleDelete,
    type
  }: {
    row: Property,
    validKeys: Option[],
    keyClassName?: string,
    valueClassName?: string,
    handleChange: (key: string, value: string | number) => void
    handleDelete?: () => void
    type?: "number" | "text"
  }) {
  const [open, setOpen] = React.useState(false);
  const [key, setKey] = React.useState(row.key);
  const [value, setValue] = React.useState(row.value);

  return <div className="flex gap-2 items-center">
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-24 justify-between",
            "text-muted-foreground",
            keyClassName ? keyClassName : ""
          )}
        >
          {key
            ? validKeys!.find(
              (option) => option.value === key
            )?.label
            : "..."}
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
                    if (option.value !== key && option.value !== "" && value !== "") {
                      handleChange(option.value, value);
                    }
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
      value={value}
      type={type ? type : "text"}
      onChange={e => {
        const val = type === "number" ? parseInt(e.target.value) : e.target.value;
        setValue(type === "number" && !isNaN(val as number) ? val : "");
        if (key !== "" && value !== "") {
          handleChange(key, val);
        }
      }}
    />
    {handleDelete &&
      <Button
        onClick={handleDelete}
        variant="ghost"
        size="icon"
        className="flex-shrink-0"
      >
        <Cross1Icon />
      </Button>
    }
  </div>
}

export function PropertiesField({
    object,
    setObject,
    validKeys,
    type,
    keyClassName,
    valueClassName,
  }: {
    object: {[key: string]: any},
    setObject: (object: {[key: string]: any}) => void,
    validKeys?: Option[],
    type?: "number" | "text",
    keyClassName?: string,
    valueClassName?: string
  }) {
  const [rows, setRows] = React.useState<Property[]>(
    Object.entries(object).map(([key, value]) => {
      return { key, value };
    })
  );

  React.useEffect(() => {
    setRows(Object.entries(object).map(([key, value]) => {
      return { key, value };
    }));
  }, [JSON.stringify(object)]);
  
  return <div className="flex gap-2 flex-col">
    {rows.map((row, index) => {
      return (
        <RowField
          row={row}
          validKeys={validKeys!.filter(option => !Object.keys(object).includes(option.value) || option.value === row.key)}
          key={row.key}
          keyClassName={cn(keyClassName || "w-24 min-w-24")}
          valueClassName={cn(valueClassName || "w-16 min-w-16")}
          handleChange={(key, value) => {
            setRows(current => {
              const newRows = [...current];
              newRows[index] = { key, value };
              return newRows;
            });
            setObject({
              ...object,
              [key]: type === "number" && isNaN(value as number) ? 0 : value
            });
          }}
          handleDelete={() => {
            setRows(current => {
              const newRows = [...current];
              newRows.splice(index, 1);
              return newRows;
            });
            const newObject = {...object};
            delete newObject[row.key];
            setObject(newObject);
          }}
          type={type ? type : "text"}
        />
      );
    })}
    {validKeys && rows.length < validKeys.length && <Button
      onClick={() => {
        const availableKeys = validKeys.filter(option => rows.every(row => row.key !== option.value));
        setRows([...rows, {
          key: availableKeys[0]!.value || "",
          value: ""
        }]);
      }}
      variant="ghost"
      size="icon"
      className="justify-center"
    >
      <PlusIcon className="h-4 w-4 shrink-0 opacity-50" />
    </Button>}
  </div>

}
