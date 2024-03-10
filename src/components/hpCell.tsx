import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";

function HpPopoverContent({
  applyDamage,
}: {
  applyDamage: (amount: number) => void;
}) {
  const [inputVal, setInputVal] = useState<string>("");
  return (
    <PopoverContent className="min-w-0 w-full">
      <span className="flex gap-2 font-light items-center">
        Apply Damage
        <form id="apply-damage-form" onSubmit={(e) => {
          e.preventDefault();
          if (isNaN(parseInt(inputVal ?? ""))) return;
            applyDamage(parseInt(inputVal ?? 0));
        }}>
          <Input
            type="number"
            form="apply-damage-form"
            value={inputVal ?? ""}
            onChange={(e) => setInputVal(e.target.value)}
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-12"
          />
        </form>
      </span>
    </PopoverContent>
  );
}

export function HpCell({
  currentHp,
  maxHp,
  applyDamage,
}: {
  currentHp: number;
  maxHp: number;
  applyDamage: (amount: number) => void;
  
}) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);
  return (
    <Popover open={isOpen} onOpenChange={open => setIsOpen(open)}>
      <PopoverTrigger ref={popoverRef}>
        {currentHp}/{maxHp}
      </PopoverTrigger>
      <HpPopoverContent
        applyDamage={(amount) => {
          applyDamage(amount);
          setIsOpen(false);
        }}
      />
    </Popover>
  );
}
