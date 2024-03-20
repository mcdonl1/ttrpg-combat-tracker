"use client"

import { useState } from "react";
import { Card } from "~/@/components/ui/card";
import { Input } from "~/@/components/ui/input";

export function UserPrompt({
  promptText,
  onSubmit,
}: {
  promptText: string;
  onSubmit: (inputVal: string) => void;
}) {
  const inputId = "input-" + Math.random().toString(36).substring(7);
  const [inputVal, setInputVal] = useState("");
  return (
    <Card className="min-w-0 w-56 p-4 rounded-md">
      <form
        onSubmit={e => {
          e.preventDefault();
          onSubmit(inputVal);
        }}
        className="flex gap-2 w-full justify-between items-center"
      >
        <label htmlFor={inputId}>{promptText}</label>
        <Input id={inputId}
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          type="text"
          className="w-12"
          autoFocus={true}
        />
      </form>
    </Card>
  )
}
