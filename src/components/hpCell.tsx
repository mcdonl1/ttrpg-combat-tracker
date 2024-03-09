import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";

function HpPopoverContent({
  onEnter,
}: {
  onEnter: (amount: number) => void;
}) {
  const [inputVal, setInputVal] = useState<string>("");
  return (
    <PopoverContent>
      <div>Apply Damage</div>
      <Input
        type="number"
        value={inputVal ?? ""}
        onChange={(e) => setInputVal(e.target.value)}
        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (isNaN(parseInt(inputVal ?? ""))) return;
            onEnter(parseInt(inputVal ?? 0));
          }
        }}
      />
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
        onEnter={(amount) => {
          isOpen && applyDamage(amount);
          setIsOpen(false);
          window.focus();
        }}
      />
    </Popover>
  );
}
