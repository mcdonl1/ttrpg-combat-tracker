import { Button } from "~/@/components/ui/button";
import { PropsWithChildren } from "react";

type SideButtonProps = React.ComponentPropsWithoutRef<typeof Button>;
export const SideButton = ({
  children,
  ...props
}: PropsWithChildren<SideButtonProps>) => (
  <Button
    className="m-0 min-w-0 rounded-none bg-inherit"
    variant="outline"
    {...props}
  >
    <span className="flex items-center">{children}</span>
  </Button>
);
