import { Button } from "~/@/components/ui/button";
import type { PropsWithChildren } from "react";
import clsx from "clsx";

type SideButtonProps = {
  displayText?: string;
  expanded?: boolean;
} & React.ComponentPropsWithoutRef<typeof Button>;
export const SideButton = ({
  children,
  displayText,
  expanded,
  ...props
}: PropsWithChildren<SideButtonProps>) => (
  <Button
    className={clsx(["m-0 min-w-0 rounded-none bg-inherit", expanded && "w-full flex justify-between"])}
    variant="outline"
    {...props}
  >
    {displayText && expanded && <span className="text-slate-400 font-light">{displayText}</span>}
    <span className="flex items-center">{children}</span>
  </Button>
);
