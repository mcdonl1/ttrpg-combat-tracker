import { SideButton } from "./SideButton";

export const SideActionBar = ({
  actions,
  expanded,
}: {
  actions: {
    handler: () => void;
    icon: React.ReactNode;
    tooltip: string;
  }[];
  expanded: boolean;
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
