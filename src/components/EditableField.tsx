import { Input } from "~/@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";

export function EditableField({
  className,
  initialValue,
  isEditing,
  cancelEdit,
  onCommit,
  formId,
}: {
  className: string;
  initialValue: string;
  isEditing: boolean;
  cancelEdit?: () => void;
  onCommit?: (value: string) => void;
  formId: string;
}) {
  const [value, setValue] = useState(initialValue);
  const [commitedValue, setCommitedValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const keylistener = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setValue(commitedValue);
        cancelEdit && cancelEdit();
      }
    };
    if (isEditing) {
      window.addEventListener("keydown", keylistener);
      inputRef.current?.focus();
    } else {
      window.removeEventListener("keydown", keylistener);
    }
    return () => {
      window.removeEventListener("keydown", keylistener);
    };

  }, [isEditing, value, commitedValue, cancelEdit, onCommit]);

  return (
    <div>
      {isEditing ? (
        <form id={formId} onSubmit={(e) => {
          e.preventDefault();
          setCommitedValue(value);
          cancelEdit && cancelEdit();
          onCommit && onCommit(value);
        }}>
          <Input
            value={value}
            form={formId}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => {
              setValue(commitedValue);
              cancelEdit && cancelEdit();
            }}
            className={clsx(["bg-slate-900 px-2 py-0 h-5 rounded-[1.5px]", className])}
            ref={inputRef}
          />
        </form>
      ) : (
        <span>{commitedValue}</span>
      )}
    </div>
  );
}
