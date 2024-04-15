import { Input } from "~/@/components/ui/input";
import { useState } from "react";

interface PromptProps {
  promptText: string;
  callback: (userInput: string) => void;
}

export function CommandBar({ promptText, callback }: PromptProps) {
  const [userInput, setUserInput] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        callback(userInput);
      }}
      className="flex items-center gap-2 p-2 border-t border-t-slate-900"
    >
      <label htmlFor="command-bar-input">{promptText}</label>
      <Input
        id="command-bar-input"
        className="border-none w-1/6 focus-visible:border-none focus-visible:border-b-slate-500"
        type="text"
        onChange={(e) => setUserInput(e.target.value)}
      />
    </form>
  );
}
