import { Button } from "../ui/button";

type TButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const PriButton = ({
  children,
  onClick,
  disabled,
  className,
}: TButtonProps) => {
  return (
    <Button
      className={`bg-priColor text-white hover:bg-priColor hover:bg-opacity-95 h-8 md:h-9 disabled:opacity-50 ${
        className && `${className}`
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default PriButton;
