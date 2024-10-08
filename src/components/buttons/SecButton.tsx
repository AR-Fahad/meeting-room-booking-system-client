/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "../ui/button";

type TButtonProps = {
  children: React.ReactNode;
  onClick?: (e?: any) => void;
  disabled?: boolean;
  className?: string;
};

const SecButton = ({
  children,
  onClick,
  disabled,
  className,
}: TButtonProps) => {
  return (
    <Button
      variant="outline"
      className={`text-priColor border-priColor hover:text-priColor hover:bg-opacity-90 h-8 md:h-9 border-[1.5px] disabled:opacity-50 ${
        className && `${className}`
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default SecButton;
