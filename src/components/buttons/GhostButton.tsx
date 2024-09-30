/* eslint-disable @typescript-eslint/no-explicit-any */
import { LegacyRef } from "react";
import { Button } from "../ui/button";

type TButtonProps = {
  children: React.ReactNode;
  onClick?: (e?: any) => void;
  ref?: LegacyRef<HTMLButtonElement>;
  disabled?: boolean;
  sm?: boolean;
  className?: string;
};

const GhostButton = ({
  children,
  onClick,
  disabled,
  ref,
  sm,
  className,
}: TButtonProps) => {
  return (
    <Button
      className={`h-8 md:h-9 disabled:opacity-50 ${
        className && `${className}`
      }`}
      variant="ghost"
      size={sm ? "sm" : "default"}
      onClick={onClick}
      disabled={disabled}
      ref={ref}
    >
      {children}
    </Button>
  );
};

export default GhostButton;
