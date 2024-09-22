import { Button } from "../ui/button";

type TButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  w?: boolean;
};

const SecButton = ({ children, onClick, disabled, w }: TButtonProps) => {
  return (
    <Button
      variant="outline"
      className={`text-priColor border-priColor hover:text-priColor hover:bg-opacity-90 h-8 md:h-9 border-[1.5px] disabled:opacity-60 ${
        w && "w-full"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default SecButton;
