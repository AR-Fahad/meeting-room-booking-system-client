import { Button } from "../ui/button";

type TButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const GhostButton = ({ children, onClick, disabled }: TButtonProps) => {
  return (
    <Button
      className="h-8 md:h-9"
      variant="ghost"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default GhostButton;
