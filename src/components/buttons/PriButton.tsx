import { Button } from "../ui/button";

type TButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  makeLoading?: boolean;
  w?: boolean;
};

const PriButton = ({
  children,
  onClick,
  disabled,
  makeLoading,
  w,
}: TButtonProps) => {
  return (
    <Button
      className={`bg-priColor text-white hover:bg-priColor hover:bg-opacity-95 h-8 md:h-9 disabled:bg-opacity-90 ${
        w ? "w-full" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {disabled && makeLoading ? (
        <span className="animate-pulse">{children}</span>
      ) : (
        children
      )}
    </Button>
  );
};

export default PriButton;
