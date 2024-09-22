import { LegacyRef } from "react";
import { Button } from "../ui/button";

type TButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  ref?: LegacyRef<HTMLButtonElement>;
  disabled?: boolean;
};

const GhostButton = ({ children, onClick, disabled, ref }: TButtonProps) => {
  return (
    <Button
      className="h-8 md:h-9"
      variant="ghost"
      onClick={onClick}
      disabled={disabled}
      ref={ref}
    >
      {children}
    </Button>
  );
};

export default GhostButton;
