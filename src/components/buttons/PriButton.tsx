import { Button } from "../ui/button";

type TButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  w?: boolean;
};

const PriButton = ({ children, onClick, disabled, w }: TButtonProps) => {
  return (
    <Button
      className={`bg-[#5059d6] text-white hover:bg-[#5059d6] hover:bg-opacity-95 h-8 md:h-9 disabled:bg-opacity-90 ${
        w ? "w-full" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? <span className="animate-pulse">{children}</span> : children}
    </Button>
  );
};

export default PriButton;
