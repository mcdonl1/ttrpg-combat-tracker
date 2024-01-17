import { Button } from "~/@/components/ui/button";

const SideButton = ({
  children,
  ...props
}: {
  children: any;
  [x: string]: any;
}) => (
  <Button
    className="m-0 min-w-0 rounded-none bg-inherit"
    variant="outline"
    {...props}
  >
    <span className="flex items-center">{children}</span>
  </Button>
);

export const SideActionBar = ({
  actions,
}: {
  actions: {
    handler: () => void;
    icon: React.ReactNode;
    tooltip: string;
  }[];
}) => {
  return (
    <div className="flex h-full flex-col bg-slate-900">
      {actions.map((action) => {
        return (
          <SideButton
            key={action.tooltip}
            onClick={action.handler}
            title={action.tooltip}
          >
            {action.icon}
          </SideButton>
        );
      })}
    </div>
  );
};
