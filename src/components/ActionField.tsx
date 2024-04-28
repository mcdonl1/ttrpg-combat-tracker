import * as React from "react"
import { Cross1Icon, PlusIcon} from "@radix-ui/react-icons"

import { Action } from "~/types/encounterTypes"

import { Button } from "@/components/ui/button"
import { Input } from "~/@/components/ui/input"

function ActionField({
    action,
    handleChange,
    handleDelete,
  }: {
    action: Action,
    handleChange: (name: string, desc: string) => void
    handleDelete?: () => void
  }) {
  const [name, setName] = React.useState(action.name);
  const [desc, setDesc] = React.useState(action.desc);

  return <div className="flex gap-2 items-center">
    <Input
      value={name}
      onChange={e => {
        console.log(e.target.value);
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

export function ActionsField({
    actions,
    setActions,
  }: {
    actions: Action[],
    setActions: (actions: Action[]) => void,
  }) {
  const [rows, setRows] = React.useState(actions);

  return <div className="flex gap-2 flex-col">
    {rows.map((row, index) => {
      return (
        <ActionField
          action={row}
          key={row.desc || "" + index}
          handleChange={(name, desc) => {
            console.log(name, desc);
            // setActions(rows);
          }}
          handleDelete={() => {
            setRows(current => {
              const newActions = [...current];
              newActions.splice(index, 1);
              return newActions;
            });
          }}
        />
      );
    })}
    <Button
      onClick={() => {
        setRows([...rows, {
          name: "",
          desc: "",
        }]);
      }}
      variant="ghost"
      size="icon"
      className="justify-center"
    >
      <PlusIcon className="h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </div>

}
